import { Test, TestingModule } from '@nestjs/testing';
import { PaymentMomoService } from './paymentmomo.service';

describe('PaymentmomoService', () => {
  let service: PaymentMomoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PaymentMomoService],
    }).compile();

    service = module.get<PaymentMomoService>(PaymentMomoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
