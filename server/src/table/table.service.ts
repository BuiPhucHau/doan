import { HttpException, Injectable } from '@nestjs/common';
import { CreateTableDto } from './dto/create-table.dto';
import { UpdateTableDto } from './dto/update-table.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Table } from './entities/table.entity';
import { Model } from 'mongoose';

@Injectable()
export class TableService {


 constructor(
  @InjectModel(Table.name) private readonly tableModel: Model<Table>,
 ) {}

 async create(createTableDto: CreateTableDto) {
  try {
    const createdTable = new this.tableModel({
      ...createTableDto,
      reservationId: null,
    });
    return await createdTable.save();
  } catch (error) {
    throw new HttpException(error.message, error.status);
  }
}

 async findAll() {
  try {
    const tables = await this.tableModel.find().exec();
    return tables;
  } catch (error) {
    throw new HttpException(error.message, error.status);
  }
 }

 async findOne(id: string) {
  try {
    const table = await this.tableModel.findOne({ tableId: id }).exec();

    return table;
  } catch (error) {
    throw new HttpException(error.message, error.status);
  }
 }

 async update(id: string, updateTableDto: UpdateTableDto): Promise<Table> {
  try {
    const updatedTable = await this.tableModel.findOneAndUpdate(
      { tableId: id },
      { ...updateTableDto },
      {new: true}
    );
    return updatedTable;
  } catch (error) {
    throw new HttpException(error.message, error.status);
  }
}

  async remove(id: string) {
    try {
      const deletedTable = await this.tableModel.findOneAndDelete({ tableId: id });
      return deletedTable;
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }


}
