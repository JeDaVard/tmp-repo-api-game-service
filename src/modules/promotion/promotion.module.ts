import { Module } from '@nestjs/common';

import { PromotionMsController } from './controller/promotion-ms.controller';
import { PromotionService } from './service/promotion.service';
import { promotionRepositories } from './repository';

@Module({
  imports: [],
  controllers: [PromotionMsController],
  providers: [PromotionService, ...promotionRepositories],
  exports: [PromotionService],
})
export class PromotionModule {}
