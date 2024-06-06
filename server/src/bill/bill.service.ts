import { HttpException ,Injectable } from '@nestjs/common';
import { CreateBillDto } from './dto/create-bill.dto';
import { UpdateBillDto } from './dto/update-bill.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { log } from 'console';
import { Bill} from './entities/bill.entity';

@Injectable()
export class BillService {
  constructor(
    @InjectModel(Bill.name) private BillModel: Model<Bill>
  ){}

  async create(createBillDto: CreateBillDto) {
    try{
      const newBill = new this.BillModel(createBillDto);
      return newBill.save(); 
    }
    catch(error){
      throw new HttpException(error.message, error.status);
    }
  }


  async getByMonth(month: number, year: number){
    try{
      let realMonth = parseInt(month.toString()) - 1;
      return await this.BillModel.find({
        DatePayment: {
          $gte: new Date(year, realMonth , 1),
          $lt: new Date(year, month, 1)
        },
      })
      .populate('Bill').exec();
    }
    catch(error){
      return []
    }
  }

  async getByYear(year: number){
    try{
      let nextYear = parseInt(year.toString()) + 1;
      return await this.BillModel.find({
        DatePayment: {
          $gte: new Date(year, 0, 1),
          $lt: new Date(nextYear, 0, 1)
        },
      })
      .populate('Bill').exec();
    }
    catch(error){
      return []
    }
  }

  async getByDate(date: Date){
    try{
      log(date)
      return await this.BillModel.find({
        DatePayment: date,
      })
      .populate('Bill').exec();
    }
    catch(error){
      return []
    }
  }

}
