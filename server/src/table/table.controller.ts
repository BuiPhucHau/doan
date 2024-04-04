import { Controller, Get, Post, Body, Patch, Param, Delete, Query, Put } from '@nestjs/common';
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

  @Put('update')
  async update(@Query('id') id: string, @Body() updateTableDto: UpdateTableDto) {
    try {
      const updatedTable = await this.tableService.update(id, updateTableDto);
      return updatedTable;
    } catch (error) {
      throw error;
    }
  }

  @Delete('delete')
  async remove(@Query('id') id: string) {
    try {
      const deletedTable = await this.tableService.remove(id);
      return deletedTable;
    } catch (error) {
      throw error;
    }
  }
}
