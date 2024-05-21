import { Test, TestingModule } from '@nestjs/testing';
import { PaymentImageService } from './payment_image.service';

describe('PaymentImageService', () => {
  let service: PaymentImageService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PaymentImageService],
    }).compile();

    service = module.get<PaymentImageService>(PaymentImageService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
