import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Put,
  Query,
} from '@nestjs/common';
import { ReservationService } from './reservation.service';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { UpdateReservationDto } from './dto/update-reservation.dto';

@Controller('reservation')
export class ReservationController {
  constructor(private readonly reservationService: ReservationService) {}

  @Post('create')
  async create(@Body() createReservationDto: CreateReservationDto) {
    try {
      const newReservation =
        await this.reservationService.create(createReservationDto);
      return newReservation;
    } catch (error) {
      throw error;
    }
  }

  @Get('get-all')
  async findAll() {
    try {
      const reservations = await this.reservationService.findAll();
      return reservations;
    } catch (error) {
      throw error;
    }
  }

  @Put('update')
  async update(@Query('id') id: string, @Body() updateReservationDto: UpdateReservationDto) {
    try {
      const updatedReservation = await this.reservationService.update(id, updateReservationDto);
      return updatedReservation;
    } catch (error) {
      throw error;
    }
  }
}
