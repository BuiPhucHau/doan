import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
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
}
