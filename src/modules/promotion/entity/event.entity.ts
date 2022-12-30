import { Column, Entity, OneToMany } from 'typeorm';

import { BaseEntity } from '../../../shared/base/base.entity';
import { EventType } from '../../../shared/enum/promotion.enum';
import { PromotionEntity } from './promotion.entity';

@Entity('events')
export class EventEntity extends BaseEntity {
  @Column()
  name: string;

  @Column({ enum: EventType, type: 'enum' })
  type: EventType;

  @OneToMany(() => PromotionEntity, (promotion) => promotion.event, { onDelete: 'CASCADE', cascade: true })
  promotions?: PromotionEntity[];
}
