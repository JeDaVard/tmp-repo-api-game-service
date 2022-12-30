import { Controller, Get, Param } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';

import { GameService } from '../service/game.service';
import { GameListResponseDto, GameResponseDto } from '../dto/game-response.dto';
import { GameIdParamDto } from '../dto/game-id-param.dto';
import { gameUserRoutesV1 } from './game.route';

@ApiTags(...gameUserRoutesV1.tags)
@Controller({
  version: gameUserRoutesV1.version,
  path: gameUserRoutesV1.root,
})
export class GameUserController {
  constructor(private readonly gameService: GameService) {}

  @ApiOkResponse({ type: GameResponseDto })
  @Get(':id')
  public async get(@Param() params: GameIdParamDto): Promise<GameResponseDto> {
    const data = await this.gameService.getForUser(params.id);
    return GameResponseDto.forUser(data);
  }

  @ApiOkResponse({ type: GameListResponseDto })
  @Get()
  public async list(): Promise<GameListResponseDto> {
    const dataAndCount = await this.gameService.listForUser();
    return GameListResponseDto.forUser(dataAndCount);
  }
}
