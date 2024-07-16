// import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
// import { PaymentstripeService } from './paymentstripe.service';


// @Controller('paymentstripe')
// export class PaymentstripeController {
//   constructor(private readonly paymentstripeService: PaymentstripeService) {}
//   @Post('create-customer')
//   async createCustomer(@Body() body: any) {
//     const { name, email } = body;
//     return await this.paymentstripeService.createCustomer(name, email);
//   }

//   @Post('add-card')
//   async addNewCard(@Body() body: any) {
//     const {
//       customerId,
//       cardName,
//       cardExpYear,
//       cardExpMonth,
//       cardNumber,
//       cardCVC,
//     } = body;
//     return await this.paymentstripeService.addNewCard(
//       customerId,
//       cardName,
//       cardExpYear,
//       cardExpMonth,
//       cardNumber,
//       cardCVC,
//     );
//   }

//   @Post('create-charge')
//   async createCharge(@Body() body: any) {
//     const {
//       receiptEmail,
//       amount,
//       currency,
//       cardId,
//       customerId,
//     } = body;
//     return await this.paymentstripeService.createCharge(
//       receiptEmail,
//       amount,
//       currency,
//       cardId,
//       customerId,
//     );
//   }
// }
