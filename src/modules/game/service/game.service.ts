import {
  BadRequestException,
  Injectable,
  Logger,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { And, DeleteResult, UpdateResult, MoreThanOrEqual, LessThan } from 'typeorm';

import { GameRepository } from '../repository/game.repository';
import { PublisherRepository } from '../repository/publisher.repository';
import { PublisherProvider } from '../../../shared/module/provider/publisher/publisher.provider';
import { CreateGameBodyDto } from '../dto/create-game.dto';
import { PublisherEntity } from '../entity/publisher.entity';
import { UpdateGameBodyDto } from '../dto/update-game.dto';
import { RemoveGamesCommandPayloadInterface } from '../../../shared/interface/remove-games-command-payload.interface';
import { PromotionService } from '../../promotion/service/promotion.service';
import { GameEntity } from '../entity/game.entity';
import { PromotionEntity } from '../../promotion/entity/promotion.entity';

@Injectable()
export class GameService {
  logger = new Logger(GameService.name, { timestamp: true });
  constructor(
    private readonly gameRepository: GameRepository,
    private readonly publisherRepository: PublisherRepository,
    private readonly publisherProvider: PublisherProvider,
    private readonly promotionService: PromotionService,
  ) {}

  private async getOneByIdOrFail(id: number) {
    const game = await this.gameRepository.findOne({ where: { id }, relations: ['publisher'] });
    if (!game) {
      throw new NotFoundException(`Game with id ${id} was not found`);
    }
    return game;
  }

  // todo this should be part of money helpers shared between services
  formatPrice(price: number) {
    return Math.round(price * 100) / 100;
  }

  // todo ideally this shouldn't be a simple method but a "rule based engine" which applies promotions to products
  private getGameDiscountedPrice(game: GameEntity, promotion: PromotionEntity) {
    if (!promotion || !promotion.discount?.percentage) return game.price;
    return game.price - (game.price * promotion.discount.percentage) / 100;
  }

  public async create(body: CreateGameBodyDto) {
    let publisher = await this.publisherRepository.findOneBy({ externalId: body.publisherId });
    if (publisher) {
      const publisherData = this.publisherProvider.getById(body.publisherId);
      if (!publisherData) {
        throw new NotFoundException(`Publisher with id ${body.publisherId} was not found`);
      }
      publisher = await this.publisherRepository.save(PublisherEntity.createFromProvider(publisherData));
    }
    return this.gameRepository.save(
      this.gameRepository.create({
        title: body.title,
        price: body.price,
        tags: body.tags,
        releaseDate: body.releaseDate,
        publisher,
      }),
    );
  }

  public async get(id: number) {
    return this.getOneByIdOrFail(id);
  }

  public async getPublisher(id: number) {
    const game = await this.getOneByIdOrFail(id);
    return game.publisher;
  }

  public async list() {
    const [data, count] = await Promise.all([this.gameRepository.find(), this.gameRepository.count()]);
    return {
      data,
      count,
    };
  }

  public async getForUser(id: number) {
    const promotion = await this.promotionService.getActiveGlobalDiscount();
    const game = await this.getOneByIdOrFail(id);
    return {
      ...game,
      discountedPrice: this.getGameDiscountedPrice(game, promotion),
    };
  }

  public async listForUser() {
    const [data, count] = await Promise.all([this.gameRepository.find(), this.gameRepository.count()]);
    const promotion = await this.promotionService.getActiveGlobalDiscount();
    return {
      data: data.map((d) => ({ ...d, discountedPrice: this.getGameDiscountedPrice(d, promotion) })),
      count,
    };
  }

  public async update(id: number, body: UpdateGameBodyDto) {
    const { title, price, tags, releaseDate } = body;
    let res: UpdateResult;
    try {
      res = await this.gameRepository.update({ id }, { title, price, tags, releaseDate });
    } catch (e) {
      this.logger.error(`Can not update game with id ${id}, error ${serializerError(e)}`);
      throw new UnprocessableEntityException(`Can not update game with id ${id}`);
    }
    if (res.affected < 1) {
      throw new NotFoundException(`Game with id ${id} was not found`);
    }
  }

  public async delete(id: number) {
    let res: DeleteResult;
    try {
      res = await this.gameRepository.delete({ id });
    } catch (e) {
      this.logger.error(`Can not delete game with id ${id}, error ${serializerError(e)}`);
      throw new UnprocessableEntityException(`Can not delete game with id ${id}`);
    }
    if (res.affected < 1) {
      throw new NotFoundException(`Game with id ${id} was not found`);
    }
  }

  public async deleteGames(filter: RemoveGamesCommandPayloadInterface) {
    const criteria = {
      ...(filter.releaseDate
        ? {
            releaseDate: And(
              MoreThanOrEqual(new Date(filter.releaseDate.from)),
              LessThan(new Date(filter.releaseDate.to)),
            ),
          }
        : {}),
    };
    if (!Object.keys(criteria).length) {
      throw new BadRequestException('Filter should not be empty');
    }
    const res = await this.gameRepository.delete(criteria);
    return res.affected > 0;
  }
}
