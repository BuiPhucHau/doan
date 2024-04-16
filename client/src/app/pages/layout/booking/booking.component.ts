import { Component, OnDestroy } from '@angular/core';
import { TaigaModule } from '../../../shared/taiga.module';
import { ShareModule } from '../../../shared/shared.module';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TuiDay } from '@taiga-ui/cdk';
import { tuiCreateTimePeriods } from '@taiga-ui/kit';
import { Table } from '../../../models/table.model';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { TableState } from '../../../ngrx/state/table.state';
import * as TableActions from '../../../ngrx/actions/table.actions';

@Component({
  selector: 'app-booking',
  standalone: true,
  imports: [TaigaModule, ShareModule],
  templateUrl: './booking.component.html',
  styleUrl: './booking.component.scss',
})
export class BookingComponent implements OnDestroy {
  table$ = this.store.select('table', 'tableList');
  tableList: Table[] = [];

  subscriptions: Subscription[] = [];

  readonly control = new FormControl('', Validators.minLength(12));
  readonly wrongUrl =
    'https://i.pinimg.com/originals/6c/02/af/6c02af8fd72ff6f43cb0234e5e6e3c90.gif';
  // 'https:cdn-icons-png.flaticon.com/512/4726/4726492.png';
  readonly currentDate = new Date();
  readonly reservationForm = new FormGroup({
    tableNumber: new FormControl(''),
    reservationDate: new FormControl(
      new TuiDay(
        this.currentDate.getFullYear(),
        this.currentDate.getMonth(),
        this.currentDate.getDate()
      )
    ),
    reservationTime: new FormControl(''),
    paxNumber: new FormControl(''),
  });
  testValue = new FormControl();
  branch = [
    'Luke Skywalker',
    'Leia Organa Solo',
    'Darth Vader',
    'Han Solo',
    'Obi-Wan Kenobi',
    'Yoda',
  ];

  persons = [
    { seats: '2 Person', isActive: false },
    { seats: '4 Person', isActive: false },
    { seats: '6 Person', isActive: false },
  ];
  
  toggleActive(person: any) {
    person.isActive = !person.isActive;
  }

  time = tuiCreateTimePeriods(18, 23, [0, 30]);

  tableNumberOptions = ['1', '2', '3', '4', '5', '6'];

  taxNumberOptions = ['1', '2', '3', '4', '5', '6'];

  tables = [
    { id: 1, name: '1', status: 'Trống' },
    { id: 2, name: '2', status: 'Trống' },
    { id: 3, name: '3', status: 'Trống' },
    { id: 4, name: '4', status: 'Trống' },
    { id: 5, name: '5', status: 'Trống' },
    { id: 6, name: '6', status: 'Trống' },
    { id: 7, name: '7', status: 'Trống' },
    { id: 8, name: '8', status: 'Trống' },
    { id: 9, name: '9', status: 'Trống' },
    { id: 10, name: '10', status: 'Trống' },
  ];

  constructor(
    private router: Router,
    private store: Store<{
      table: TableState;
    }>
  ) {
    this.store.dispatch(TableActions.get());

    this.subscriptions.push(
      this.table$.subscribe((tableList) => {
        if (tableList.length > 0) {
          console.log(tableList);
          this.tableList = tableList;
        }
      })
    );
  }

  ngOnInit() {
    this.store.dispatch(TableActions.get());

    this.subscriptions.push(
      this.table$.subscribe((tableList) => {
        if (tableList.length > 0) {
          console.log(tableList);
          this.tableList = tableList;
        }
      })
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => {
      subscription.unsubscribe();
    });
  }
}
