import { Column, Entity, OneToMany } from 'typeorm';

import { BaseEntity } from '../../../shared/base/base.entity';
import { GameEntity } from './game.entity';
import { PublisherInterface } from '../../../shared/module/provider/publisher/publisher.interface';

@Entity('publishers')
export class PublisherEntity extends BaseEntity {
  @Column()
  externalId: number;

  @Column()
  name: string;

  @Column({ type: 'integer', unsigned: true })
  siret: number;

  @Column()
  phone: string;

  @OneToMany(() => GameEntity, (game) => game.publisher)
  games: GameEntity[];

  static createFromProvider(publisher: PublisherInterface) {
    const p = new PublisherEntity();
    p.externalId = publisher.id;
    p.name = publisher.name;
    p.siret = publisher.siret;
    p.phone = publisher.phone;
    return p;
  }
}
