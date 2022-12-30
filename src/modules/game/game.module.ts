import { Module } from '@nestjs/common';

import { GameController } from './controller/game.controller';
import { GameService } from './service/game.service';
import { gameRepositories } from './repository';
import { PromotionModule } from '../promotion/promotion.module';
import { GameMsController } from './controller/game-ms.controller';
import { GameUserController } from './controller/game-user.controller';

@Module({
  imports: [PromotionModule],
  controllers: [GameController, GameMsController, GameUserController],
  providers: [GameService, ...gameRepositories],
})
export class GameModule {}
