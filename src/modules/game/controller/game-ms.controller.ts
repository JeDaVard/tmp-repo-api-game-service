import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';

import { GameService } from '../service/game.service';
import { RemoveGamesCommandPayloadInterface } from '../../../shared/interface/remove-games-command-payload.interface';
import { GameServiceCommands } from '../../../shared/constant/service-commands.constant';

@Controller()
export class GameMsController {
  constructor(private readonly gameService: GameService) {}

  @MessagePattern(GameServiceCommands.removeGames)
  public async deleteGames(payload: RemoveGamesCommandPayloadInterface) {
    await this.gameService.deleteGames(payload);
    return true;
  }
}
