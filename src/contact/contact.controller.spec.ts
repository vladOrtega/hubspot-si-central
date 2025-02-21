import { Test, TestingModule } from '@nestjs/testing';
import { SiController } from './si.controller';

describe('SiController', () => {
  let controller: SiController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SiController],
    }).compile();

    controller = module.get<SiController>(SiController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
