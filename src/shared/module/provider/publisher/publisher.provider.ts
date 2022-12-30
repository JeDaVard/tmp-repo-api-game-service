import { publisherDatasource } from './publisher.datasource';
import { Injectable } from '@nestjs/common';

@Injectable()
export class PublisherProvider {
  getById(id: number) {
    return publisherDatasource.find((p) => p.id === id);
  }
}
