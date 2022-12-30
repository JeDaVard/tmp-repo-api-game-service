import { IsNumber } from 'class-validator';
import { Transform } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class GameIdParamDto {
  @ApiProperty()
  @IsNumber()
  @Transform((v) => +v)
  id: number;
}
