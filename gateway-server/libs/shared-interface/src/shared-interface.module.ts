import { Module } from '@nestjs/common';
import { SharedInterfaceService } from './shared-interface.service';

@Module({
  providers: [SharedInterfaceService],
  exports: [SharedInterfaceService],
})
export class SharedInterfaceModule {}
