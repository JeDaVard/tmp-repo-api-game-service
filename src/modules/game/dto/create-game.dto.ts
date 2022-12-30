import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsDefined,
  IsISO8601,
  IsNotEmpty,
  IsNumber,
  IsString,
  Max,
  MaxLength,
  Min,
  MinLength,
} from 'class-validator';
import { gameCreation } from '../../../shared/constant/field-valdiation.constant';

export class GameRequestBodyBaseDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @MinLength(gameCreation.title.min)
  @MaxLength(gameCreation.title.max)
  title: string;

  @ApiProperty()
  @Min(gameCreation.price.min)
  @Max(gameCreation.price.max)
  @IsNumber()
  price: number;

  @ApiProperty()
  @IsString({ each: true })
  @IsArray()
  tags: string[];

  @ApiProperty()
  @IsDefined()
  @IsISO8601()
  releaseDate: string;
}

export class CreateGameBodyDto extends GameRequestBodyBaseDto {
  @ApiProperty()
  @IsNumber()
  @IsDefined()
  publisherId: number;
}
