import { Provider } from '@nestjs/common';
import { GameRepository } from './game.repository';
import { PublisherRepository } from './publisher.repository';

export const gameRepositories: Provider[] = [GameRepository, PublisherRepository];
