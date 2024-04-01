import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TableService } from './table.service';
import { CreateTableDto } from './dto/create-table.dto';
import { UpdateTableDto } from './dto/update-table.dto';

@Controller('table')
export class TableController {
  constructor(private readonly tableService: TableService) {}

  @Post('create')
  async create(@Body() createTableDto: CreateTableDto) {
    try {
      const newTable = await this.tableService.create(createTableDto);
      return newTable;
    } catch (error) {
      throw error;
    }
  }

  @Get('get-all')
  async findAll() {
    try {
      const tables = await this.tableService.findAll();
      return tables;
    } catch (error) {
      throw error;
    }
  }

}
