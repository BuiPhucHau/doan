import { Component, OnDestroy, OnInit } from '@angular/core';
import { TaigaModule } from '../../../shared/taiga.module';
import { ShareModule } from '../../../shared/shared.module';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TuiDay } from '@taiga-ui/cdk';
import { tuiCreateTimePeriods } from '@taiga-ui/kit';
import { Table } from '../../../models/table.model';
import { Location } from '../../../models/location.model';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { TableState } from '../../../ngrx/state/table.state';
import * as TableActions from '../../../ngrx/actions/table.actions';
import { LocationState } from '../../../ngrx/state/location.state';
import * as LocationActions from '../../../ngrx/actions/location.actions';
import * as ReservationActions from '../../../ngrx/actions/reservation.actions';
import { generateReservationId } from '../../../../environments/environments';
import { User } from '@angular/fire/auth';
import { AuthState } from '../../../ngrx/state/auth.state';
import { UserState } from '../../../ngrx/state/user.state';
import { ReservationState } from '../../../ngrx/state/reservation.state';
import { Reservation } from '../../../models/reservation.model';

@Component({
  selector: 'app-booking',
  standalone: true,
  imports: [TaigaModule, ShareModule],
  templateUrl: './booking.component.html',
  styleUrl: './booking.component.scss',
})
export class BookingComponent implements OnInit, OnDestroy {


  ////////////// Location
  location$ = this.store.select('location', 'locationList');
  locationList: readonly string[] = [];
  

  ////////////// Table
  table$ = this.store.select('table', 'tableList');
  tableList: Table[] = [];
  filteredTables: Table[] = [];

  tableTakenByLocationId$ = this.store.select('table', 'getTableByLocationId');
  tableToRender: Table[] = [];

  ////////////// Reservation
  isCreateReservation$ = this.store.select('reservation', 'reservation');


  subscriptions: Subscription[] = [];

  readonly control = new FormControl('', Validators.minLength(12));
  readonly wrongUrl =
    'https://i.pinimg.com/originals/6c/02/af/6c02af8fd72ff6f43cb0234e5e6e3c90.gif';
  // 'https:cdn-icons-png.flaticon.com/512/4726/4726492.png';
  readonly currentDate = new Date();

  // Tắt tự động dropdown của input Time
  activateDropdown = false;

  // Lấy timestamp hiện tại
  timestamp = Date.now();
  // Khởi tạo Date object từ timestamp
  date = new Date(this.timestamp);

  // Lấy ngày, tháng, năm từ Date object
  day = this.date.getDate();
  month = this.date.getMonth();
  year = this.date.getFullYear();


  time = tuiCreateTimePeriods(18, 23, [0, 30]);

  bookingTable = new FormGroup({
    tableId: new FormControl('', Validators.required),
    numberofPeople: new FormControl('', Validators.required),
    date: new FormControl(new TuiDay(this.year, this.month, this.day)),
    time: new FormControl({value: this.time, disabled: true}, Validators.required),
    name: new FormControl('', Validators.required),
    phone: new FormControl('', Validators.required),
  });
  

  persons = [
    { seats: 'All', isActive: true },
    { seats: '2 Person', isActive: false },
    { seats: '4 Person', isActive: false },
    { seats: '6 Person', isActive: false },
    { seats: '8 Person', isActive: false },
  ];

  toggleActive(person: any) {
    person.isActive = !person.isActive;
  }


  tableNumberOptions = ['1', '2', '3', '4', '5', '6', '7', '8'];

  taxNumberOptions = ['1', '2', '3', '4', '5', '6', '7', '8'];

  constructor(
    private router: Router,
    private store: Store<{
      table: TableState;
      location: LocationState;
      reservation: ReservationState;
    }>
  ) {

    /////////////////////////// Table
    this.store.dispatch(TableActions.get());
    this.store.dispatch(LocationActions.get());

    this.subscriptions.push(


      this.table$.subscribe((tableList) => {
        if (tableList.length > 0) {
          console.log(tableList);
          this.tableList = tableList;
          this.onLocationChange();
          this.filterTable('All');
        }
      }),

      //////////////////////////// Location
      this.location$.subscribe((locations) => {
        if (locations.length > 0) {
          this.locationList = locations.map((location) => location.name);
        }
      }),

      //////////////////////////// get Table by Location
      this.tableTakenByLocationId$.subscribe((tables) =>{
        if(tables.length>0){
          console.log('Tables:', tables);
          this.tableToRender = tables;
        }else {
          console.log('No tables received for the location');
          this.tableToRender = [];
        }
      }),
    );

  }
  ngOnInit(): void {
    setTimeout(() => {
      this.activateDropdown = true;
      // Kiểm tra xem FormControl có tồn tại trước khi gọi phương thức enable trên nó
      const timeControl = this.bookingTable.get('time');
      if (timeControl) {
        timeControl.enable();
      }
    }, 100);
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => {
      subscription.unsubscribe();
    });
  }
  locationValue: any;
  onLocationChange() {
    console.log('Branch is selected: ', this.locationValue);
    if (this.locationValue != null) {
      console.log('Get table by location:', this.locationValue);
      console.log(this.tableToRender);
      this.store.dispatch(TableActions.getByLocation({ locationId: this.locationValue }));
    } else {
      console.log('No location selected');
    }
  }

  filterTable(seats: string): void {
    this.persons.forEach((p) => (p.isActive = p.seats === seats));
    if (seats === 'All') {
      this.filteredTables = [...this.tableList];
    } else {
      const seatsNumber = parseInt(seats.split(' ')[0], 10); // extract the number
      this.filteredTables = this.tableList.filter(
        (table) => table.seats === seatsNumber
      );
    }
    console.log('Filtered Tables:', this.filteredTables);
  }

  createBookingTable() {
    const addbookingTabke: any = {
        reservationId: generateReservationId(),
        numberofPeople: this.bookingTable.value.numberofPeople??"",
        tableId: this.bookingTable.value.tableId??"",
        date: this.bookingTable.value.date??new Date(),
        time: this.bookingTable.value.time?.toString() ?? "",
        name: this.bookingTable.value.name??"",
        phone: this.bookingTable.value.phone??"",
        status: true,
      };
      console.log('Đặt bàn thành công',addbookingTabke);

      this.store.dispatch(ReservationActions.createReservation({reservation: addbookingTabke}));
  }

  selectTable(tableId: string): void {
    const selectedTable = this.tableList.find((table) => table.tableId === tableId);
    if (selectedTable) {
      // Lấy được bàn từ tableList dựa trên tableId
      console.log('Selected Table:', selectedTable);
      // Điều gì đó khác ở đây nếu bạn muốn thực hiện sau khi lấy được bàn
      this.bookingTable.patchValue({
        tableId: selectedTable.tableId
      });
    } else {
      console.error('Table not found:', tableId);
    }
  }

}
