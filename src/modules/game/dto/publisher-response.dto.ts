import { ApiProperty } from '@nestjs/swagger';

import { PublisherEntity } from '../entity/publisher.entity';

export class PublisherResponseDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  name: string;

  @ApiProperty()
  siret: number;

  @ApiProperty()
  phone: string;

  constructor(data: PublisherEntity) {
    this.id = data.id;
    this.name = data.name;
    this.siret = data.siret;
    this.phone = data.phone;
  }
}
