import { DataSource, Repository } from 'typeorm';
import { Inject, Injectable } from '@nestjs/common';

import { DEFAULT_DATASOURCE } from '../../../shared/constant/default-datasource.constant';
import { EventEntity } from '../entity/event.entity';

@Injectable()
export class EventRepository extends Repository<EventEntity> {
  constructor(@Inject(DEFAULT_DATASOURCE) dataSource: DataSource) {
    super(EventEntity, dataSource.createEntityManager());
  }

  // repo custom methods go here
}
