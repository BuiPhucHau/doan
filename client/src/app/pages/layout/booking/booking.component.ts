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
  @Component({
    selector: 'app-booking',
    standalone: true,
    imports: [TaigaModule, ShareModule],
    templateUrl: './booking.component.html',
    styleUrl: './booking.component.scss',
  })
  export class BookingComponent implements OnInit, OnDestroy {
    /// Location
    location$ = this.store.select('location', 'locationList');
    locationList: readonly string[] = [];
    tables: readonly string[] = [];

    /// Table
    table$ = this.store.select('table', 'tableList');
    tableList: Table[] = [];
    filteredTables: Table[] = [];


    tablesTakenByLocationId$ = this.store.select(
      'table',
      'tablesTakenByGetByLocationId'
    );
    tableToRender: Table[] = [];

    /// Reservation
    isCreateReservation$ = this.store.select('reservation', 'reservation');

    subscriptions: Subscription[] = [];

    readonly control = new FormControl('', Validators.minLength(12));

    readonly havenotbook =
      'https://mir-s3-cdn-cf.behance.net/project_modules/hd/49b9fb71435435.5bc589814d44f.gif';
    readonly havebooked =
      'https://cdn3.iconfinder.com/data/icons/popular-badges/48/ryan-27-512.png';

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

    exampleForm = new FormGroup({
      exampleControl: new FormControl(''),
    });

    open1 = false;
    open2 = false;
    open3 = false;

    constructor(
      private router: Router,
      private route: ActivatedRoute,
      private locationService: LocationService,
      private store: Store<{
        table: TableState;
        location: LocationState;
        reservation: ReservationState;
      }>,
      @Inject(TuiAlertService)
      private readonly alerts: TuiAlertService
    ) {
      /// Table
      this.store.dispatch(TableActions.get());
      this.store.dispatch(LocationActions.get());

      this.subscriptions.push(
        /// Table
        this.table$.subscribe((tableList) => {
          if (tableList.length > 0) {
            console.log(tableList);
            this.tableList = tableList;
            // this.onLocationChange();
            // this.filterTable('All');
          }
        }),

        /// Location
        this.location$.subscribe((locations) => {
          if (locations.length > 0) {
            this.locationList = locations.map((location) => location.name);
          }
        }),

        /// get Table by Location
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
    ngOnInit(): void {
      const savedLocation = sessionStorage.getItem('selectedLocation');
      if (savedLocation) {
        this.locationValue = savedLocation;
        this.onLocationChange();
      }

      setTimeout(() => {
        this.activateDropdown = true;
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

    // setDishes_showDialog(): void {
    //   this.open1 = true;
    // }
    createBookingTable_showDialog(): void {
      this.open2 = true;
    }

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

        // Lưu vị trí hiện tại vào session storage trước khi tải lại
        sessionStorage.setItem('selectedLocation', this.locationValue);

        // Tải lại trang
        window.location.reload();
    }

    /// Location
    locationValue: any;
    onLocationChange() {
      console.log('Branch is selected: ', this.locationValue);
     if (this.locationValue != null && this.locationValue !== '') {
          console.log('Location selected: ', this.locationValue);
        this.store.dispatch(
          TableActions.getByLocationId({ locationId: this.locationValue })
        );
      } 
      else {
        console.log('No location selected');
      }
    }
    onItemNameChange() {
      console.log('Branch is selected: ', this.item.name);
      if (this.item.name != null && this.item.name !== '') {
           console.log('Location selected: ', this.item.name);
         this.store.dispatch(
           TableActions.getByLocationId({ locationId: this.item.name })
         );
       } 
       else {
         console.log('No location selected');
       }
    }
    /// Filter Table
    filterTable(seats: string): void {
      this.persons.forEach((p) => (p.isActive = p.seats === seats));
      if (seats === 'All') {
        this.filteredTables = [...this.tableToRender];
      } else {
        const seatsNumber = parseInt(seats.split(' ')[0], 10);
        this.filteredTables = this.tableToRender.filter(
          (table) => table.seats === seatsNumber
        );
      }
      console.log('Filtered Tables:', this.filteredTables);
    }

    /// Lấy id table khi selected
    selectTable(tableId: string): void {
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
          .open('This table is already booked, please select another table.', {
            status: 'warning',
          })
          .subscribe();
        return;
      }

      console.log('Selected Table:', selectedTable);
      this.bookingTable.patchValue({
        tableId: selectedTable.tableId,
      });
    }
  }
