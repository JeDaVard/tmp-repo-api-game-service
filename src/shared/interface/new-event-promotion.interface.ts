import { EventType, PromotionScope, PromotionType } from '../enum/promotion.enum';

export interface NewEventPromotionInterface {
  name: string;
  eventType: EventType;
  promotionType: PromotionType;
  promotionScope: PromotionScope;
  percentage: number;
}
