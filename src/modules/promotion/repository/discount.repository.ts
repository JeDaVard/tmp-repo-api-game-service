import { DataSource, Repository } from 'typeorm';
import { Inject, Injectable } from '@nestjs/common';

import { DEFAULT_DATASOURCE } from '../../../shared/constant/default-datasource.constant';
import { DiscountEntity } from '../entity/discount.entity';

@Injectable()
export class DiscountRepository extends Repository<DiscountEntity> {
  constructor(@Inject(DEFAULT_DATASOURCE) dataSource: DataSource) {
    super(DiscountEntity, dataSource.createEntityManager());
  }

  // repo custom methods go here
}
