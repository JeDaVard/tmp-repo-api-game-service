import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Patch, Post } from '@nestjs/common';
import { ApiNoContentResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';

import { GameService } from '../service/game.service';
import { CreateGameBodyDto } from '../dto/create-game.dto';
import { GameListResponseDto, GameResponseDto } from '../dto/game-response.dto';
import { PublisherResponseDto } from '../dto/publisher-response.dto';
import { GameIdParamDto } from '../dto/game-id-param.dto';
import { gameAdminRoutesV1 } from './game.route';
import { UpdateGameBodyDto } from '../dto/update-game.dto';

@ApiTags(...gameAdminRoutesV1.tags)
@Controller({
  version: gameAdminRoutesV1.version,
  path: gameAdminRoutesV1.root,
})
export class GameController {
  constructor(private readonly gameService: GameService) {}

  @ApiNoContentResponse()
  @HttpCode(HttpStatus.NO_CONTENT)
  @Post()
  public async create(@Body() body: CreateGameBodyDto): Promise<void> {
    await this.gameService.create(body);
    return;
  }

  @ApiOkResponse({ type: GameResponseDto })
  @Get(':id')
  public async get(@Param() params: GameIdParamDto): Promise<GameResponseDto> {
    const data = await this.gameService.get(params.id);
    return new GameResponseDto(data);
  }

  @ApiOkResponse({ type: PublisherResponseDto })
  @Get(':id/publisher')
  public async getPublisher(@Param() params: GameIdParamDto): Promise<PublisherResponseDto> {
    const data = await this.gameService.getPublisher(params.id);
    return new PublisherResponseDto(data);
  }
  @ApiOkResponse({ type: GameListResponseDto })
  @Get()
  public async list(): Promise<GameListResponseDto> {
    const dataAndCount = await this.gameService.list();
    return new GameListResponseDto(dataAndCount);
  }

  @ApiNoContentResponse()
  @HttpCode(HttpStatus.NO_CONTENT)
  @Patch(':id')
  public async update(@Param() params: GameIdParamDto, @Body() body: UpdateGameBodyDto): Promise<void> {
    await this.gameService.update(params.id, body);
    return;
  }

  @ApiNoContentResponse()
  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  public async delete(@Param() params: GameIdParamDto): Promise<void> {
    await this.gameService.delete(params.id);
    return;
  }
}
