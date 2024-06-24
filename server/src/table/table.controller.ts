import { Controller, Get, Post, Body, Patch, Param, Delete, Query, Put } from '@nestjs/common';
import { TableService } from './table.service';
import { CreateTableDto } from './dto/create-table.dto';
import { UpdateTableDto } from './dto/update-table.dto';
import { log } from 'console';
import { LocationService } from 'src/location/location.service';
import { Table } from './entities/table.entity';

@Controller('table')
export class TableController {
  constructor(private readonly tableService: TableService,
    private readonly locationService: LocationService,
  ) {}
// post create a new table
  @Post('create')
  async create(@Body() createTableDto: CreateTableDto) {
    try {
      const newTable = await this.tableService.create(createTableDto);
      return newTable;
    } catch (error) {
      throw error;
    }
  }
// get all tables
  @Get('get-all')
  async findAll() {
    try {
      const tables = await this.tableService.findAll();
      return tables;
    } catch (error) {
      throw error;
    }
  }
// get table by name
  @Get('getByName')
    async getByName(@Query('name') name: string) {
      try {
        log('name', name)
        const tables = await this.tableService.getByName(name);
        return tables;
      } catch (error) {
        return [error];
      }
    }
// get table by locationId
  @Get('getByLocation')
  async getByLocationId(@Query('id') name: string) {
    try {
      const location = await this.locationService.getByName(name);
      log('location', location)
      if(location._id != '500'){
        const tables = await this.tableService.getByLocation(location._id.toString());
        return tables;
      }
    } catch (error) {
      return []
    }
  }
// update table
  @Put('update')
  async update(@Query('id') id: string, @Body() updateTableDto: UpdateTableDto) {
    try {
      const updatedTable = await this.tableService.update(id, updateTableDto);
      return updatedTable;
    } catch (error) {
      throw error;
    }
  }
// put checkout table by tableId
  @Put('checkout/:tableId')
  async checkoutTable(
    @Param('tableId') tableId: string,
    @Body('status') status: boolean,
  ): Promise<Table> {
    try {
      const updatedTable = await this.tableService.updateStatus(tableId, status);
      return updatedTable;
    } catch (error) {
      throw error;
    }
  }

// remove table
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
