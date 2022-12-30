import { ConflictException, Injectable } from '@nestjs/common';
import { NewEventPromotionInterface } from '../../../shared/interface/new-event-promotion.interface';
import { PromotionRepository } from '../repository/promotion.repository';
import { DiscountRepository } from '../repository/discount.repository';
import { EventRepository } from '../repository/event.repository';
import { PromotionScope, PromotionType } from '../../../shared/enum/promotion.enum';

@Injectable()
export class PromotionService {
  constructor(
    private readonly promotionRepository: PromotionRepository,
    private readonly discountRepository: DiscountRepository,
    private readonly eventRepository: EventRepository,
  ) {}

  public async createGlobalPromotionEvent(data: NewEventPromotionInterface) {
    const activeGlobalPromotion = this.promotionRepository.findOneBy({ isActive: true, scope: PromotionScope.global });
    if (activeGlobalPromotion) {
      throw new ConflictException('An active global promotion exists');
    }
    await this.eventRepository.save(
      this.eventRepository.create({
        name: data.name,
        type: data.eventType,
        promotions: [
          this.promotionRepository.create({
            type: data.promotionType,
            scope: data.promotionScope,
            isActive: true,
            discount: this.discountRepository.create({ percentage: data.percentage }),
          }),
        ],
      }),
    );
  }

  public async getActiveGlobalDiscount() {
    return this.promotionRepository.findOne({
      where: {
        isActive: true,
        scope: PromotionScope.global,
        type: PromotionType.discount,
      },
      relations: ['discount'],
    });
  }
}
