  import { Component, OnDestroy } from '@angular/core';
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
  @Component({
    selector: 'app-booking',
    standalone: true,
    imports: [TaigaModule, ShareModule],
    templateUrl: './booking.component.html',
    styleUrl: './booking.component.scss',
  })
  export class BookingComponent implements OnDestroy {
    table$ = this.store.select('table', 'tableList');
    location$ = this.store.select('location', 'locationList');
    locationList: readonly string[] = [];
    tableList: Table[] = [];
    filteredTables: Table[] = [];
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

    bookingTable = new FormGroup({
      reservationId: new FormControl('', Validators.required),
      numberofPeople: new FormControl('', Validators.required),
      tableId: new FormControl('', Validators.required),
      date: new FormControl('', Validators.required),
      time: new FormControl('', Validators.required),
      phone: new FormControl('', Validators.required),
      name: new FormControl('', Validators.required),
    })

    addbookingTabke: any = {
      reservationId: '',
      numberofPeople: '',
      tableId: '',
      date: '',
      time: '',
      phone: '',
      name: ''
    };

    persons = [
      { seats: 'All', isActive: true },
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


    constructor(
      private router: Router,
      private store: Store<{
        table: TableState;
        location: LocationState;
      }>
    ) {
      this.store.dispatch(TableActions.get());

      this.subscriptions.push(
        this.table$.subscribe((tableList) => {
          if (tableList.length > 0) {
            console.log(tableList);
            this.tableList = tableList;
            this.filterTable('All');
          }
        })
      );

      this.store.dispatch(LocationActions.get());

      this.subscriptions.push(
        this.location$.subscribe((locations) => {
          if (locations.length > 0) {
            this.locationList = locations.map(location => location.name);
          }
        })
      );
    }

    ngOnDestroy(): void {
      this.subscriptions.forEach((subscription) => {
        subscription.unsubscribe();
      });
    }
    locationValue: any;
    onLocationChange() {
      console.log("Branch is selected: ", this.locationValue);
      if (this.locationValue != null) {
        // this.store.dispatch(TableActions.get({ locationId: this.locationValue }));
      }
      else {
        this.store.dispatch(TableActions.get());
      }
    }

    filterTable(seats: string): void {
      this.persons.forEach(p => p.isActive = p.seats === seats);
      if (seats === 'All') {
        this.filteredTables = [...this.tableList];
      } else {
        const seatsNumber = parseInt(seats.split(' ')[0], 10); // extract the number
        this.filteredTables = this.tableList.filter(table => table.seats === seatsNumber);
      }
      console.log('Filtered Tables:', this.filteredTables);
    }

    
    selectBranch(locationId: string): void {
      
    }
    
  }
