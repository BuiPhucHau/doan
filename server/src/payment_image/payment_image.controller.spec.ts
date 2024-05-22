import { Test, TestingModule } from '@nestjs/testing';
import { PaymentImageController } from './payment_image.controller';
import { PaymentImageService } from './payment_image.service';

describe('PaymentImageController', () => {
  let controller: PaymentImageController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PaymentImageController],
      providers: [PaymentImageService],
    }).compile();

    controller = module.get<PaymentImageController>(PaymentImageController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
