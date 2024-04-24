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
    @InjectModel(Table.name)
    private readonly tableModel: Model<Table>,
    @Inject(TableService) private readonly tableService: TableService,
  ) {}

  async create(
    createReservationDto: CreateReservationDto,
  ): Promise<Reservation> {
    try {
      // Kiểm tra trạng thái bàn
      const table = await this.tableModel.findOne({
        tableId: createReservationDto.tableId,
      });
      if (table.status === true) {
        // Tạo và lưu reservation
        const createReservation = new this.reservationModel(createReservationDto,);
        // Lưu reservation
        const savedReservation = await createReservation.save();
        // Cập nhật trạng thái bàn
        table.status = false;
        table.reservationId = createReservation._id.toString();
        await table.save();

        return savedReservation;
      }
      throw new Error('Table is not available for reservation');
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  async findAll() {
    try {
      const reservations = await this.reservationModel.find();
      return reservations;
    } catch (err) {
      throw new HttpException(err.message, err.status);
    }
  }

  async update(id: string, updateReservationDto: UpdateReservationDto) {
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

  async updateStatus(id: string) {
    try{
      const updatedReservation = await this.reservationModel.findByIdAndUpdate(
        id,
        {status: true},
        {new: true}
        );
        return updatedReservation;
    }
    catch(err){
      throw new HttpException(err.message, err.status);
    }
  }


  async remove(id: string) {
    try{
      const deletedReservation = await this.reservationModel.findOneAndDelete({reservationId: id});
      return deletedReservation;
    }
    catch(err){
      throw new HttpException(err.message, err.status);
    }
  }
}
