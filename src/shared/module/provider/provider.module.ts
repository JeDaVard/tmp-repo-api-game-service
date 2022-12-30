import { Global, Module } from '@nestjs/common';
import { PublisherProvider } from './publisher/publisher.provider';

@Global()
@Module({
  providers: [PublisherProvider],
  exports: [PublisherProvider],
})
export class ProviderModule {}
