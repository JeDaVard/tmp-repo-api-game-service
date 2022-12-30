import { DataSource, Repository } from 'typeorm';
import { Inject, Injectable } from '@nestjs/common';

import { DEFAULT_DATASOURCE } from '../../../shared/constant/default-datasource.constant';
import { PublisherEntity } from '../entity/publisher.entity';

@Injectable()
export class PublisherRepository extends Repository<PublisherEntity> {
  constructor(@Inject(DEFAULT_DATASOURCE) dataSource: DataSource) {
    super(PublisherEntity, dataSource.createEntityManager());
  }

  // repo custom methods go here
}
