// import { Injectable } from '@nestjs/common';
// import { ConfigService } from '@nestjs/config';
// import Stripe from 'stripe';


// @Injectable()
// export class PaymentstripeService {
//   private readonly stripeClient: Stripe;

//   constructor(
//     private readonly configService: ConfigService,
//     private readonly stripe: Stripe) {
//     this.stripeClient = new Stripe(configService.get('STRIPE_SECRET_KEY'), {
//       // Cấu hình khác nếu cần thiết, ví dụ: version API, timeout, ...
//     });
//   }
//   async createCustomer(name: string, email: string) {
//     try {
//       const customer = await this.stripe.customers.create({
//         name,
//         email,
//       });
//       return customer;
//     } catch (error) {
//       throw new Error(error.message);
//     }
//   }

//   async addNewCard(
//     customerId: string,
//     cardName: string,
//     cardExpYear: number,
//     cardExpMonth: number,
//     cardNumber: string,
//     cardCVC: string,
//   ) {
//     try {
//       const cardToken = await this.stripe.tokens.create({
//         card : {
//           name: cardName,
//           number: cardNumber,
//           exp_year: cardExpYear,
//           exp_month: cardExpMonth,
//           cvc: cardCVC,
//         },
//       });

//       const card = await this.stripe.customers.createSource(customerId, {
//         source: cardToken.id,
//       });

//       return card;
//     } catch (error) {
//       throw new Error(error.message);
//     }
//   }

//   async createCharge(
//     receiptEmail: string,
//     amount: number,
//     currency: string,
//     cardId: string,
//     customerId: string,
//   ) {
//     try {
//       const createCharge = await this.stripe.charges.create({
//         receipt_email: receiptEmail,
//         amount: amount * 100, // amount in cents
//         currency,
//         card: cardId,
//         customer: customerId,
//       });

//       return createCharge;
//     } catch (error) {
//       throw new Error(error.message);
//     }
//   }
// }



