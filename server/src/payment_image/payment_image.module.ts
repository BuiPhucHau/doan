import { Module } from '@nestjs/common';
import { PaymentImageService } from './payment_image.service';
import { PaymentImageController } from './payment_image.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { PaymentImageSChema } from './entities/payment_image.entity';
import { StorageSchema } from 'src/storage/entities/storage.entity';


@Module({
  imports: [MongooseModule.forFeature([
    {name: 'PaymentImage', schema: PaymentImageSChema},
    {name: 'Storage', schema: StorageSchema},
  ]),
  ],
  exports: [PaymentImageService],
  controllers: [PaymentImageController],
  providers: [PaymentImageService],
})
export class PaymentImageModule {}
