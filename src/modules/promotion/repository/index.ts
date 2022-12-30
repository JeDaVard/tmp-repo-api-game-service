import { Provider } from '@nestjs/common';

import { PromotionRepository } from './promotion.repository';
import { EventRepository } from './event.repository';
import { DiscountRepository } from './discount.repository';

export const promotionRepositories: Provider[] = [PromotionRepository, EventRepository, DiscountRepository];
