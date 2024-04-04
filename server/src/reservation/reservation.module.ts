import { Module, forwardRef } from '@nestjs/common';
import { ReservationService } from './reservation.service';
import { ReservationController } from './reservation.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ReservationSchema } from './entities/reservation.entity';
import { TableModule } from 'src/table/table.module';
import { TableSchema } from 'src/table/entities/table.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Reservation', schema: ReservationSchema },
      { name: 'Table', schema: TableSchema },
    ]),
    forwardRef(() => TableModule),
  ],

  controllers: [ReservationController],
  providers: [ReservationService],
  exports: [ReservationService],
})
export class ReservationModule {}
