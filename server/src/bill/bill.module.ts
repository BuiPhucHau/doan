import { Module } from '@nestjs/common';
import { BillService } from './bill.service';
import { BillController } from './bill.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { BillSchema } from './entities/bill.entity';
import { TableModule } from 'src/table/table.module';

@Module({
  imports: [
    MongooseModule.forFeature([{name: 'Bill', schema: BillSchema},
    ]),
    TableModule,
  ],
  controllers: [BillController],
  providers: [BillService],
})
export class BillModule {}
