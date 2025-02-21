import { Test, TestingModule } from '@nestjs/testing';
import { SiService } from './si.service';

describe('SiService', () => {
  let service: SiService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SiService],
    }).compile();

    service = module.get<SiService>(SiService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
