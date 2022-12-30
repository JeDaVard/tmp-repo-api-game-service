import { Column, Entity, OneToOne, JoinColumn } from 'typeorm';

import { BaseEntity } from '../../../shared/base/base.entity';
import { PromotionEntity } from './promotion.entity';

@Entity('discounts')
export class DiscountEntity extends BaseEntity {
  @Column({ type: 'int8', unsigned: true })
  percentage: number;

  @OneToOne(() => PromotionEntity, (promotion) => promotion.discount)
  @JoinColumn()
  promotion: PromotionEntity;
}
