import { Test, TestingModule } from '@nestjs/testing';
import { PaymentstripeController } from './paymentstripe.controller';
import { PaymentstripeService } from './paymentstripe.service';

describe('PaymentstripeController', () => {
  let controller: PaymentstripeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PaymentstripeController],
      providers: [PaymentstripeService],
    }).compile();

    controller = module.get<PaymentstripeController>(PaymentstripeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
