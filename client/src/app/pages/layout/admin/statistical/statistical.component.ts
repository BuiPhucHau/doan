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

  ){}
}
