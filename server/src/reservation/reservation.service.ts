import { HttpException, Inject, Injectable } from '@nestjs/common';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { UpdateReservationDto } from './dto/update-reservation.dto';
import { Reservation } from './entities/reservation.entity';
import { Model, Mongoose } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Table } from 'src/table/entities/table.entity';
import { TableService } from 'src/table/table.service';

@Injectable()
export class ReservationService {
  constructor(
    @InjectModel(Reservation.name)
    private readonly reservationModel: Model<Reservation>,
    @Inject(TableService) private readonly tableService: TableService,
  ) {}

  async create(
    createReservationDto: CreateReservationDto,
  ): Promise<Reservation> {
    try {
      const createReservation = new this.reservationModel(createReservationDto);
      return await createReservation.save();
    } catch (error) {}
  }

  async findAll() {
    try {
      const reservations = await this.reservationModel.find();
      return reservations;
    } catch (err) {
      throw new HttpException(err.message, err.status);
    }
  }

  async update (id: string, updateReservationDto:  UpdateReservationDto) {
    try {
      const updatedReservation = await this.reservationModel.findOneAndUpdate(
        { reservationId: id },
        { ...updateReservationDto },
        { new: true },
      );
      return updatedReservation;
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }
}
