import { Column, Entity, ManyToOne } from 'typeorm';

import { BaseEntity } from '../../../shared/base/base.entity';
import { PublisherEntity } from './publisher.entity';

@Entity('games')
export class GameEntity extends BaseEntity {
  @Column()
  title: string;

  @Column('double precision')
  price: number;

  @Column('varchar', { array: true })
  tags: string[];

  @Column({ type: 'timestamp with time zone' })
  releaseDate: Date;

  @ManyToOne(() => PublisherEntity, (publisher) => publisher.games)
  publisher: PublisherEntity;
}
