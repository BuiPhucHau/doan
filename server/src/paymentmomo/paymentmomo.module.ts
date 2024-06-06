import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PaymentMomoService } from './paymentmomo.service';
import { PaymentMomoController } from './paymentmomo.controller';
import { BillModule } from 'src/bill/bill.module';
import { BillService } from 'src/bill/bill.service';
import { Bill, BillSchema } from 'src/bill/entities/bill.entity';
import { TableModule } from 'src/table/table.module';
@Module({
  imports: [
    MongooseModule.forFeature([{ name: Bill.name, schema: BillSchema }]), // Nhập cấu hình Mongoose cho Bill
    BillModule, // Nhập BillModule
    TableModule,
  ],
  controllers: [PaymentMomoController],
  providers: [PaymentMomoService, BillService],
})
export class PaymentMomoModule {}
