import { Component } from '@angular/core';
import { TaigaModule } from '../../../../shared/taiga.module';
import { ShareModule } from '../../../../shared/shared.module';
import { TuiAxesModule, TuiBarChartModule,TuiLegendItemModule,TuiRingChartModule } from '@taiga-ui/addon-charts';
import {TuiMoneyModule} from '@taiga-ui/addon-commerce';
import {TuiContextWithImplicit, tuiSum} from '@taiga-ui/cdk';

import {TuiAlertService, tuiFormatNumber} from '@taiga-ui/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { BillState } from '../../../../ngrx/state/bill.state';
import { Router } from '@angular/router';
import { Bill } from '../../../../models/bill.model';
import * as BillActions from '../../../../ngrx/actions/bill.actions';
import { FormControl, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-statistical',
  standalone: true,
  imports: [TaigaModule,ShareModule, TuiBarChartModule, TuiAxesModule,TuiLegendItemModule,TuiRingChartModule,TuiMoneyModule],
  templateUrl: './statistical.component.html',
  styleUrl: './statistical.component.scss'
})
export class StatisticalComponent {

  subscriptions: Subscription[] =[]
  //variables
  activeItemIndexOfChoose = 2;
  token: string = '';
  billsCurrent: Bill[] = [];
  labelsY: string[]= [];

  totalOfQuantity: number[] = [];
  totalOfMoney: number[] = [];
  percentOfGrandTotals: number[] = [];
  isGetByMonthSuccess: boolean = false;
  isGetByYearSuccess: boolean = false;
  isGetByDateSuccess: boolean = false;
  statisticalDataOfDish: any[] = [];
  isGetByMonth: boolean = false;
  isGetByYear: boolean = true;
  isGetByDate: boolean = false;
  isGetByField: boolean = true;
  isGetByCareer: boolean = false;
  currentYear: number = new Date().getFullYear();
  currentMonth: number = new Date().getMonth() + 1;
  currentDay: number = new Date().getDate();
  isHover: boolean = false;
  //ngrx of bill
  isGetByMonthSuccess$ = this.store.select('bill', 'isGetByMonthAtStatisticalSuccess');
  isGetByYearSuccess$ = this.store.select('bill', 'isGetByYearAtStatisticalSuccess');
  isGetByDateSuccess$ = this.store.select('bill', 'isGetByDateAtStatisticalSuccess');
  billsTakenByMonth$ = this.store.select('bill', 'billsTakenByGetByMonthAtStatistical');
  billsTakenByYear$ = this.store.select('bill', 'billsTakenByGetByYearAtStatistical');
  billsTakenByDate$ = this.store.select('bill', 'billsTakenByGetByDateAtStatistical');

  constructor(
    private store: Store<{ bill: BillState }>,
    private router: Router,
    private readonly alerts: TuiAlertService,

  ){
    this.store.dispatch(BillActions.getByYearAtStatistical({year: new Date().getFullYear()}));
    this.data.get('date')?.valueChanges.subscribe(value => {
      if (value) {
        let {day,month,year} = this.data.get('date')?.value ?? {day:0,month:0,year:0};
      console.log('Date:', day,month,year);
      this.store.dispatch(BillActions.getByDateAtStatistical({date: `${year}-0${month+1}-${day}`}));
      }
    }),
    this.data.get('month')?.valueChanges.subscribe(value => {
      if (value) {
          let {month,year} = this.data.get('month')?.value ?? {month:0,year:0};
          console.log('Month:', month,year);
          this.store.dispatch(BillActions.getByMonthAtStatistical({month: month+1, year: year}));
      }
    }),
    this.data.get('year')?.valueChanges.subscribe(value => {
      if (value) {
        let year = this.data.get('year')?.value;
      console.log('Year:', year);
      this.store.dispatch(BillActions.getByYearAtStatistical({year: year??2024}));
      }
    }),
    this.subscriptions.push(
      this.isGetByMonthSuccess$.subscribe((isGetByMonthSuccess) => {
        this.isGetByMonthSuccess = isGetByMonthSuccess;
      }),
      this.isGetByYearSuccess$.subscribe((isGetByYearSuccess) => {
        this.isGetByYearSuccess = isGetByYearSuccess;
      }),
      this.isGetByDateSuccess$.subscribe((isGetByDateSuccess) => {
        this.isGetByDateSuccess = isGetByDateSuccess;
      }),

      this.billsTakenByYear$.subscribe((bills) => {
        if(bills.length) {
          // this.clearDataCareer();
          // this.clearDataOfField();
          bills.forEach((bill) => {
            this.billsCurrent = bills;
            let statisticalItemOfDish = this.statisticalDataOfDish.find((item) => item.dishId === bill.dishList);
            if(statisticalItemOfDish){
              statisticalItemOfDish.GrandTotal += bill.GrandTotal;
            }
          })
        }
      })
    );

  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }

  data = new FormGroup({
    date: new FormControl(null),
    month: new FormControl(null),
    year: new FormControl(this.currentYear)
  });
}
