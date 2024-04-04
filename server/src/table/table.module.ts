import { Module } from '@nestjs/common';
import { TableService } from './table.service';
import { TableController } from './table.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { TableSchema } from './entities/table.entity';
import { ReservationSchema } from 'src/reservation/entities/reservation.entity';
import { LocationSchema } from 'src/location/entities/location.entity';

@Module({
imports: [
    MongooseModule.forFeature([
      { name: 'Table', schema: TableSchema },
      { name: 'Reservation', schema: ReservationSchema },
      { name: 'Location', schema: LocationSchema },
    ]),
],

  controllers: [TableController],
  providers: [TableService],
  exports: [TableService],
})
export class TableModule {}
