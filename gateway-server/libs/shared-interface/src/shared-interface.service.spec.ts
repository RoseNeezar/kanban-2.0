import { Test, TestingModule } from '@nestjs/testing';
import { SharedInterfaceService } from './shared-interface.service';

describe('SharedInterfaceService', () => {
  let service: SharedInterfaceService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SharedInterfaceService],
    }).compile();

    service = module.get<SharedInterfaceService>(SharedInterfaceService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
