import { GameEntity } from '../entity/game.entity';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class GameResponseDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  title: string;

  @ApiProperty()
  price: number;

  @ApiPropertyOptional()
  discountedPrice?: number;

  @ApiPropertyOptional()
  isDiscounted?: boolean;

  @ApiProperty()
  tags: string[];

  @ApiProperty()
  releaseDate: Date;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;

  constructor(data: GameEntity) {
    this.id = data.id;
    this.price = data.price;
    this.title = data.title;
    this.tags = data.tags;
    this.releaseDate = data.releaseDate;
    this.createdAt = data.updatedAt;
    this.updatedAt = data.updatedAt;
  }

  static forUser(data: GameEntity & { discountedPrice: number | null }) {
    const dto = new GameResponseDto(data);
    dto.discountedPrice = data.discountedPrice;
    dto.isDiscounted = !(dto.discountedPrice === dto.price);
    return dto;
  }
}

export class GameListResponseDto {
  @ApiProperty({ type: GameResponseDto, isArray: this })
  data: GameResponseDto[];

  @ApiProperty()
  count: number;
  constructor(dataAndCount?: { data: GameEntity[]; count: number }) {
    if (dataAndCount) {
      this.data = dataAndCount.data.map((g) => new GameResponseDto(g));
      this.count = dataAndCount.count;
    }
  }

  static forUser(dataAndCount: { data: (GameEntity & { discountedPrice: number | null })[]; count: number }) {
    const dto = new GameListResponseDto();
    dto.data = dataAndCount.data.map((d) => GameResponseDto.forUser(d));
    dto.count = dataAndCount.count;
    return dto;
  }
}
