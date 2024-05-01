import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
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
import { ReservationState } from '../../../ngrx/state/reservation.state';
import { TuiAlertService } from '@taiga-ui/core';


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
  tables: readonly string [] = []

  ////////////// Table
  table$ = this.store.select('table', 'tableList');
  tableList: Table[] = [];
  filteredTables: Table[] = [];

  tablesTakenByLocationId$ = this.store.select('table', 'tablesTakenByGetByLocationId');
  tableToRender: Table[] = [];

  ////////////// Reservation
  isCreateReservation$ = this.store.select('reservation', 'reservation');

  subscriptions: Subscription[] = [];

  readonly control = new FormControl('', Validators.minLength(12));
  
  readonly wrongUrl =
    'https://i.pinimg.com/originals/6c/02/af/6c02af8fd72ff6f43cb0234e5e6e3c90.gif';

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
    }>,
    @Inject(TuiAlertService)
    private readonly alerts: TuiAlertService
  ) {

    /////////////////////////// Table
    this.store.dispatch(TableActions.get());
    this.store.dispatch(LocationActions.get());

    this.subscriptions.push(
      //////////////////////////// Table
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
      this.tablesTakenByLocationId$.subscribe((tables) =>{
        if(tables.length>0){
          console.log('Tables:', tables);
          this.tableToRender = tables;
        }else {
          console.log('No tables received for the location');
          this.alerts.open('Please select a branch  !!!', { status: 'info' }).subscribe();
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

  
  createBookingTable() {
    const selectedTable = this.tableList.find(table => table.tableId === this.bookingTable.value.tableId);
    // Check if the table has been selected and if it is available
    if (!selectedTable) {
      this.alerts.open('Table not found, please select a valid table.', {status: 'error'}).subscribe();
      return; // Stop further execution if no table is found
    }
  
    if (selectedTable.status === true) {
      this.alerts.open('This table is already booked, please select another table.', {status: 'warning'}).subscribe();
      return; // Stop further execution if the table is unavailable
    }

    const addbookingTable: any = {
      reservationId: generateReservationId(),
      numberofPeople: this.bookingTable.value.numberofPeople??"",
      tableId: this.bookingTable.value.tableId??"",
      date: this.bookingTable.value.date??new Date(),
      time: this.bookingTable.value.time?.toString() ?? "",
      name: this.bookingTable.value.name??"",
      phone: this.bookingTable.value.phone??"",
      status: false,
    };
    console.log('Đặt bàn thành công',addbookingTable);
   
    this.store.dispatch(ReservationActions.createReservation({reservation: addbookingTable}));

    this.alerts.open('Booking table success.').subscribe();
    }

  ///////////////////////////// Location
  locationValue: any;
  onLocationChange() {
    console.log('Branch is selected: ', this.locationValue);
    if (this.locationValue != null) {
      console.log('Get table by location:', this.locationValue);
      this.store.dispatch(TableActions.getByLocationId({ locationId: this.locationValue }));
    } else {
      console.log('No location selected');
    }
  }


  ///////////////////////////// Filter Table
  filterTable(seats: string): void {
    this.persons.forEach((p) => (p.isActive = p.seats === seats));
    if (seats === 'All') {
      this.filteredTables = [...this.tableToRender];
    } else {
      const seatsNumber = parseInt(seats.split(' ')[0], 10); // extract the number
      this.filteredTables = this.tableToRender.filter(
        (table) => table.seats === seatsNumber
      );
    }
    console.log('Filtered Tables:', this.filteredTables);
  }


  ///////////////////////////// Lấy id table khi selected
  selectTable(tableId: string): void {
    const selectedTable = this.tableList.find((table) => table.tableId === tableId);
    if (selectedTable) {
      console.log('Selected Table:', selectedTable);
      this.bookingTable.patchValue({
        tableId: selectedTable.tableId
      });
    } else {
      console.error('Table not found:', tableId);
    }
  }


}
