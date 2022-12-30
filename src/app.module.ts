import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { GameModule } from './modules/game/game.module';
import { DatabaseModule } from './shared/module/database/database.module';
import { ProviderModule } from './shared/module/provider/provider.module';
import { PromotionModule } from './modules/promotion/promotion.module';

@Module({
  imports: [ConfigModule.forRoot(), DatabaseModule, GameModule, PromotionModule, ProviderModule],
})
export class AppModule {}
