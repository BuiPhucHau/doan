import { Controller, Get, Post, Body,Query, Patch, Param, Delete } from '@nestjs/common';
import { BillService } from './bill.service';
import { CreateBillDto } from './dto/create-bill.dto';
import { UpdateBillDto } from './dto/update-bill.dto';
import { TableService } from 'src/table/table.service';
import { log, table } from 'console';



@Controller('bill')
export class BillController {
  constructor(private readonly billService: BillService,
    private readonly tableService: TableService
  ) {}
 // create bill
  @Post('create')
  async create(@Body() createBillDto: CreateBillDto) {
    try {
      log(createBillDto);
      const bill = await this.billService.create(createBillDto);
      return bill;
    }
    catch(err){
      throw err;
    }
    
  }
  //get bill by month
  @Get('getByMonth')
  async getByMonth(@Query('month') month: number, @Query('year') year: number){
    try{
      return await this.billService.getByMonth(month, year);
    }
    catch(err){
      return []
    }
  }
  //get bill by year
  @Get('getByYear')
  async getByYear(@Query('year') year: number){
    try{
      return await this.billService.getByYear(year);
    }
    catch(err){
      return []
    }
  }
  //get bill by date
  @Get('getByDate')
  async getByDate(@Query('date') date: Date){
    try{
      return await this.billService.getByDate(date);
    }
    catch(err){
      return []
    }
  }

}
