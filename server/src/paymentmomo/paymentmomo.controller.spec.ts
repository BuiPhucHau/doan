import { Test, TestingModule } from '@nestjs/testing';
import { PaymentMomoController } from './paymentmomo.controller';
import { PaymentMomoService } from './paymentmomo.service';

describe('PaymentmomoController', () => {
  let controller: PaymentMomoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PaymentMomoController],
      providers: [PaymentMomoService],
    }).compile();

    controller = module.get<PaymentMomoController>(PaymentMomoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
