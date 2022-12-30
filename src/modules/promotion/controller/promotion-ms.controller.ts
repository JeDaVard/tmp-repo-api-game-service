import { Controller } from '@nestjs/common';
import { EventPattern } from '@nestjs/microservices';
import { PromotionService } from '../service/promotion.service';
import { NewEventPromotionInterface } from '../../../shared/interface/new-event-promotion.interface';

// assuming imported from other services
enum PromotionServiceEvents {
  globalDiscountCreated = 'promotion-service#global-discount-created',
}

@Controller()
export class PromotionMsController {
  constructor(private readonly promotionService: PromotionService) {}

  @EventPattern(PromotionServiceEvents.globalDiscountCreated)
  public async handleApplyDiscount(payload: NewEventPromotionInterface) {
    await this.promotionService.createGlobalPromotionEvent(payload);
    return true;
  }
}
