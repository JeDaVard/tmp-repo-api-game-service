import { DataSource, Repository } from 'typeorm';
import { Inject, Injectable } from '@nestjs/common';

import { DEFAULT_DATASOURCE } from '../../../shared/constant/default-datasource.constant';
import { GameEntity } from '../entity/game.entity';

@Injectable()
export class GameRepository extends Repository<GameEntity> {
  constructor(@Inject(DEFAULT_DATASOURCE) dataSource: DataSource) {
    super(GameEntity, dataSource.createEntityManager());
  }

  // repo custom methods go here
}
