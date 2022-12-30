import { DataSource, Repository } from 'typeorm';
import { Inject, Injectable } from '@nestjs/common';

import { DEFAULT_DATASOURCE } from '../../../shared/constant/default-datasource.constant';
import { PromotionEntity } from '../entity/promotion.entity';

@Injectable()
export class PromotionRepository extends Repository<PromotionEntity> {
  constructor(@Inject(DEFAULT_DATASOURCE) dataSource: DataSource) {
    super(PromotionEntity, dataSource.createEntityManager());
  }

  // repo custom methods go here
}
