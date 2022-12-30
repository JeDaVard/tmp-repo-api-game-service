import { join } from 'path';
import { DataSource, DataSourceOptions } from 'typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import { ConfigService } from '@nestjs/config';
import { Global, Module, Provider } from '@nestjs/common';

import { DEFAULT_DATASOURCE } from '../../constant/default-datasource.constant';

const getDataSourceOptions = (
  configService: ConfigService,
  moreConfigs?: Pick<DataSourceOptions, 'migrations'>,
): DataSourceOptions => ({
  migrationsTableName: 'migrations-platform-api-localization',
  type: 'postgres',
  url: configService.get('POSTGRES_URL'),
  logging: 'all',
  synchronize: true,
  entities: [join(__dirname, '..', '..', '..', '**', '*.entity.{ts,js}')],
  subscribers: [],
  namingStrategy: new SnakeNamingStrategy(),
  ...moreConfigs,
});

export const databaseProvider: Provider = {
  provide: DEFAULT_DATASOURCE,
  useFactory: (configService: ConfigService) => {
    const dataSource = new DataSource(getDataSourceOptions(configService));
    return dataSource.initialize();
  },
  inject: [ConfigService],
};

@Global()
@Module({
  providers: [ConfigService, databaseProvider],
  exports: [databaseProvider],
})
export class DatabaseModule {}
