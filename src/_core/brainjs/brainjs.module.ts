import { Module } from '@nestjs/common';
import { BrainJsLib } from './brainjs.lib';

@Module({
  imports: [BrainJsLib],
  exports: []
})
export class BrainJsModule {}