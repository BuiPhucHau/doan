import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { TaigaModule } from '../../../shared/taiga.module';
import { ShareModule } from '../../../shared/shared.module';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TuiDay } from '@taiga-ui/cdk';
import { tuiCreateTimePeriods } from '@taiga-ui/kit';
import { Table } from '../../../models/table.model';
import { Location } from '../../../models/location.model';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { TableState } from '../../../ngrx/state/table.state';
import * as TableActions from '../../../ngrx/actions/table.actions';
import { LocationState } from '../../../ngrx/state/location.state';
import * as LocationActions from '../../../ngrx/actions/location.actions';
import * as ReservationActions from '../../../ngrx/actions/reservation.actions';
import { generateReservationId } from '../../../../environments/environments';
import { ReservationState } from '../../../ngrx/state/reservation.state';
import { TuiAlertService } from '@taiga-ui/core';
import { set } from '@angular/fire/database';
import { LocationService } from '../../../service/location/location.service';
import { TableService } from '../../../service/table/table.service';
import { ReservationService } from '../../../service/reservation/reservation.service';
import { Reservation } from '../../../models/reservation.model';

@Component({
  selector: 'app-booking',
  standalone: true,
  imports: [TaigaModule, ShareModule],
  templateUrl: './booking.component.html',
  styleUrl: './booking.component.scss',
})
export class BookingComponent implements OnInit, OnDestroy {
  // Observables and state management
  location$ = this.store.select('location', 'locationList');
  locationList: readonly string[] = [];
  tables: readonly string[] = [];

  table$ = this.store.select('table', 'tableList');
  reservation$ = this.store.select('reservation', 'reservationList');
  reservationList: Reservation[] = [];

  tableList: Table[] = [];
  filteredTables: Table[] = [];

  isCurrentReservation: boolean = false;

  tablesTakenByLocationId$ = this.store.select(
    'table',
    'tablesTakenByGetByLocationId'
  );
  tableToRender: Table[] = [];

  isCreateReservation$ = this.store.select('reservation', 'reservation');

  subscriptions: Subscription[] = [];

  // Form controls and initial values
  readonly control = new FormControl('', Validators.minLength(12));
  readonly havenotbook =
    'https://mir-s3-cdn-cf.behance.net/project_modules/hd/49b9fb71435435.5bc589814d44f.gif';
  readonly havebooked =
    'https://cdn3.iconfinder.com/data/icons/popular-badges/48/ryan-27-512.png';

  readonly currentDate = new Date();

  // Disable automatic dropdown for input Time
  activateDropdown = false;

  // Get current timestamp and date
  timestamp = Date.now();
  date = new Date(this.timestamp);
  day = this.date.getDate();
  month = this.date.getMonth();
  year = this.date.getFullYear();

  time = tuiCreateTimePeriods(18, 23, [0, 30]);

  // Form group for booking table
  bookingTable = new FormGroup({
    tableId: new FormControl('', Validators.required),
    date: new FormControl(new TuiDay(this.year, this.month, this.day)),
    time: new FormControl(
      { value: this.time, disabled: true },
      Validators.required
    ),
    numberofPeople: new FormControl('', Validators.required),
    setdishes: new FormControl(false, Validators.required),
    name: new FormControl('', Validators.required),
    phone: new FormControl('', Validators.required),
  });

  // Person filter options
  persons = [
    { seats: 'All', isActive: true },
    { seats: '2 Person', isActive: false },
    { seats: '4 Person', isActive: false },
    { seats: '6 Person', isActive: false },
    { seats: '8 Person', isActive: false },
  ];

  // Method to toggle active state for person filter options
  toggleActive(person: any) {
    person.isActive = !person.isActive;
  }

  // Options for table and tax number
  tableNumberOptions = ['1', '2', '3', '4', '5', '6', '7', '8'];
  taxNumberOptions = ['1', '2', '3', '4', '5', '6', '7', '8'];

  exampleForm = new FormGroup({
    exampleControl: new FormControl(''),
  });

  // Dialog open state
  open1 = false;
  open2 = false;
  open3 = false;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private locationService: LocationService,
    private tableService: TableService,
    private reservationService: ReservationService,
    private store: Store<{
      table: TableState;
      location: LocationState;
      reservation: ReservationState;
    }>,
    @Inject(TuiAlertService)
    private readonly alerts: TuiAlertService
  ) {
    // Dispatch actions to get data
    this.store.dispatch(TableActions.get());
    this.store.dispatch(ReservationActions.get());
    this.store.dispatch(LocationActions.get());

    // Subscribe to observables
    this.subscriptions.push(
      this.table$.subscribe((tableList) => {
        if (tableList.length > 0) {
          console.log(tableList);
          this.tableList = tableList;
        }
      }),
      this.reservation$.subscribe((reservationList) => {
        if (reservationList.length > 0) {
          console.log('Get reservation:', reservationList);
          this.reservationList = reservationList;
        }
      }),
      this.location$.subscribe((locations) => {
        if (locations.length > 0) {
          this.locationList = locations.map((location) => location.name);
        }
      }),
      this.tablesTakenByLocationId$.subscribe((tables) => {
        if (tables.length > 0) {
          console.log('Get tables by location:', tables);
          this.tableToRender = tables;
          this.filteredTables = [...this.tableToRender];
        } else {
          console.log('No tables received for the location');
          this.alerts
            .open('Please select a branch  !!!', { status: 'info' })
            .subscribe();
        }
      })
    );
  }

  item = this.locationService.getLocationDetail();

  // Lifecycle hook to initialize component
  ngOnInit(): void {
    const savedLocation = sessionStorage.getItem('selectedLocation');
    if (savedLocation) {
      this.locationValue = savedLocation;
      this.onLocationChange();
    }

    // Enable time control after a delay
    setTimeout(() => {
      this.activateDropdown = true;
      const timeControl = this.bookingTable.get('time');
      if (timeControl) {
        timeControl.enable();
      }
    }, 100);
  }

  // Lifecycle hook to clean up subscriptions
  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => {
      subscription.unsubscribe();
    });
  }

  // Method to open create booking dialog
  createBookingTable_showDialog(): void {
    this.open2 = true;
  }

  // Method to create a booking
  createBookingTable(): void {
    this.open3 = true;

    const addbookingTable: any = {
      reservationId: generateReservationId(),
      tableId: this.bookingTable.value.tableId ?? '',
      date: this.bookingTable.value.date ?? new Date(),
      time: this.bookingTable.value.time?.toString() ?? '',
      numberofPeople: this.bookingTable.value.numberofPeople ?? '',
      setdishes: this.bookingTable.value.setdishes ?? false,
      name: this.bookingTable.value.name ?? '',
      phone: this.bookingTable.value.phone ?? '',
      status: true,
    };
    console.log('Đặt bàn thành công', addbookingTable);
    this.store.dispatch(
      ReservationActions.createReservation({ reservation: addbookingTable })
    );
    this.alerts.open('Booking table success.').subscribe();
    // Save the current location to session storage before reloading
    sessionStorage.setItem('selectedLocation', this.locationValue);
    // Reload the page
  }

  // Method to reload the page
  done() {
    window.location.reload();
  }

  locationValue: any;

  // Method to handle location change
  onLocationChange() {
    console.log('Branch is selected: ', this.locationValue);
    if (this.locationValue != null && this.locationValue !== '') {
      console.log('Location selected: ', this.locationValue);
      this.store.dispatch(
        TableActions.getByLocationId({ locationId: this.locationValue })
      );
    } else {
      console.log('No location selected');
    }
  }

  // Method to filter tables based on the number of seats
  filterTable(seats: string): void {
    this.persons.forEach((p) => (p.isActive = p.seats === seats));

    if (seats === 'All') {
      this.filteredTables = [...this.tableToRender];
      this.bookingTable.patchValue({
        numberofPeople: ''
      });
    } else {
      const seatsNumber = parseInt(seats.split(' ')[0], 10);
      this.filteredTables = this.tableToRender.filter(
        (table) => table.seats === seatsNumber
      );

      this.bookingTable.patchValue({
        numberofPeople: seatsNumber.toString()
      });
    }

    console.log('Filtered Tables:', this.filteredTables);
  }

  // Method to select a table for booking
  selectTable(tableId: string, tableCart: Reservation): void {
    const selectedTable = this.tableList.find(
      (table) => table.tableId === tableId
    );
    if (!selectedTable) {
      this.alerts
        .open('Table not found, please select a valid table.', {
          status: 'error',
        })
        .subscribe();
      return;
    }
    if (selectedTable.status === true) {
      // this.reservationService.addToTableToCart(tableCart)
      this.alerts
        .open('Table is reservationted, please select a valid table.', {
          status: 'error',
        })
        .subscribe();
      return;
    }
    console.log('Selected Table:', selectedTable);
    this.bookingTable.patchValue({
      tableId: selectedTable.tableId,
    });
  }

  // Method to select a table without reservation
  selectTableNoReservation(tableId: string): void {
    const selectedTable = this.tableList.find(
      (table) => table.tableId === tableId
    );
    if (!selectedTable) {
      this.alerts
        .open('Table not found, please select a valid table.', {
          status: 'error',
        })
        .subscribe();
      return;
    }
    if (selectedTable.status === true) {
      this.alerts
        .open('Table is reservationted, please select a valid table.', {
          status: 'error',
        })
        .subscribe();
      return;
    }

    console.log('selectTableNoReservation:', selectedTable);
    this.bookingTable.patchValue({
      tableId: selectedTable.tableId,
    });
  }
}
