import { Test, TestingModule } from '@nestjs/testing';
import { ComposerController } from './composer.controller';
import { ComposerService } from './composer.service';

describe('ComposerController', () => {
  let controller: ComposerController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ComposerController],
      providers: [ComposerService],
    }).compile();

    controller = module.get<ComposerController>(ComposerController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
