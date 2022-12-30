import { Column, Entity, ManyToOne, OneToOne } from 'typeorm';

import { BaseEntity } from '../../../shared/base/base.entity';
import { PromotionScope, PromotionType } from '../../../shared/enum/promotion.enum';
import { EventEntity } from './event.entity';
import { DiscountEntity } from './discount.entity';

@Entity('promotions')
export class PromotionEntity extends BaseEntity {
  @Column({ enum: PromotionType, type: 'enum' })
  type: PromotionType;

  @Column({ enum: PromotionScope, type: 'enum' })
  scope: PromotionScope;

  @Column({ default: false })
  isActive: boolean;

  @ManyToOne(() => EventEntity, (event) => event.promotions)
  event: EventEntity;

  @OneToOne(() => DiscountEntity, (discount) => discount.promotion, { onDelete: 'CASCADE', cascade: true })
  discount?: DiscountEntity;
}
