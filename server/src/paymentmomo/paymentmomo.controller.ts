import { Body, Controller, Post, Query, Res } from '@nestjs/common';
import { Response } from 'express';
import { PaymentMomoService } from './paymentmomo.service';
import { CreateBillDto } from 'src/bill/dto/create-bill.dto';
import { log } from 'console';
import { BillService } from 'src/bill/bill.service';
import { TableService } from 'src/table/table.service';

@Controller('paymentmomo')
export class PaymentMomoController {
  constructor(
    private readonly paymentMomoService: PaymentMomoService,
    private readonly billService: BillService,
    private readonly tableService: TableService

  ) { }
  @Post('create')
  async createPaymentMomo(@Body() createBillDto: CreateBillDto) {
    return this.paymentMomoService.createPaymentMomo(createBillDto);
  }
  @Post('callback')
  async handleCallback(@Body() body: any, @Res() res: Response): Promise<void> {
    // console.log('callback: ');
    // console.log(body);
    // log(JSON.parse(decodeURIComponent(body.extraData)))
    const createBillDto = JSON.parse(decodeURIComponent(body.extraData));
    try {
      log(createBillDto);
      const bill = await this.billService.create(createBillDto);
      if (bill._id) {
        const table = await this.tableService.updateStatus(createBillDto.TableId, false);
        log(table)
      }
    }
    catch (err) {
      log(err.message)
    }
  }

}
