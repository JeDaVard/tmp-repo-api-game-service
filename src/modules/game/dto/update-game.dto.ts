import { ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsArray,
  IsDefined,
  IsISO8601,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Max,
  MaxLength,
  Min,
  MinLength,
} from 'class-validator';
import { gameCreation } from '../../../shared/constant/field-valdiation.constant';

export class UpdateGameBodyDto {
  @ApiPropertyOptional()
  @IsNotEmpty()
  @IsString()
  @MinLength(gameCreation.title.min)
  @MaxLength(gameCreation.title.max)
  @IsOptional()
  title?: string;

  @ApiPropertyOptional()
  @Min(gameCreation.price.min)
  @Max(gameCreation.price.max)
  @IsNumber()
  @IsOptional()
  price?: number;

  @ApiPropertyOptional()
  @IsString({ each: true })
  @IsArray()
  @IsOptional()
  tags?: string[];

  @ApiPropertyOptional()
  @IsDefined()
  @IsISO8601()
  @IsOptional()
  releaseDate?: string;
}
