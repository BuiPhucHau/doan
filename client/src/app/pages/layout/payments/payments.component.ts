import { Component, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { DishState } from '../../../ngrx/state/dish.state';
import { categoryState } from '../../../ngrx/state/category.state';
import { AuthState } from '../../../ngrx/state/auth.state';
import { UserState } from '../../../ngrx/state/user.state';
import { CartService } from '../../../service/cart/cart.service';
import { DishService } from '../../../service/dish/dish.service';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import {
  FormControl,
  FormGroup,
  FormsModule,
  Validators,
} from '@angular/forms';
import * as OrderActions from '../../../ngrx/actions/order.actions';
import { OrderState } from '../../../ngrx/state/order.state';
import { ReactiveFormsModule } from '@angular/forms';
import { TableService } from '../../../service/table/table.service';
import { Table } from '../../../models/table.model';
import { Order } from '../../../models/order.model';
import { TableState } from '../../../ngrx/state/table.state';
import { Subscription } from 'rxjs';
import { OrderService } from '../../../service/order/order.service';
import * as TableActions from '../../../ngrx/actions/table.actions';
import { ReservationService } from '../../../service/reservation/reservation.service';
import { Reservation } from '../../../models/reservation.model';
import { TaigaModule } from '../../../shared/taiga.module';
import { ShareModule } from '../../../shared/shared.module';
import { LocationState } from '../../../ngrx/state/location.state';
import * as LocationActions from '../../../ngrx/actions/location.actions';
import { TuiAlertService } from '@taiga-ui/core';
import * as ReservationActions from '../../../ngrx/actions/reservation.actions';
import { ReservationState } from '../../../ngrx/state/reservation.state';
import { TuiDay } from '@taiga-ui/cdk';
@Component({
  selector: 'app-payments',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, TaigaModule, ShareModule],
  templateUrl: './payments.component.html',
  styleUrl: './payments.component.scss',
})
export class PaymentsComponent {
  currentDate = new Date().toISOString().slice(0, 10);

  /// Location
  location$ = this.store.select('location', 'locationList');
  locationList: readonly string[] = [];
  tables: readonly string[] = [];

  /// Table
  table$ = this.store.select('table', 'tableList');
  reservation$ = this.store.select('reservation', 'reservationList');

  reservationList: Reservation[] = [];
  tableList: Table[] = [];
  filteredTables: Table[] = [];
  tableToRender: Table[] = [];
  tablesTakenByLocationId$ = this.store.select(
    'table',
    'tablesTakenByGetByLocationId'
  );

  order$ = this.store.select('order', 'orderList');
  orderList: Order[] = [];

  // tableItems: Table = <Table>{};
  // isTable: boolean = false;

  currentReservation: Reservation | null = null;

  subscriptions: Subscription[] = [];

  readonly havenotbook =
    'https://mir-s3-cdn-cf.behance.net/project_modules/hd/49b9fb71435435.5bc589814d44f.gif';
  readonly havebooked =
    'https://cdn3.iconfinder.com/data/icons/popular-badges/48/ryan-27-512.png';

    persons = [
      { seats: 'All', isActive: true },
      { seats: '2 Person', isActive: false },
      { seats: '4 Person', isActive: false },
      { seats: '6 Person', isActive: false },
      { seats: '8 Person', isActive: false },
    ];
// Lấy timestamp hiện tại
timestamp = Date.now();
// Khởi tạo Date object từ timestamp
date = new Date(this.timestamp);

// Lấy ngày, tháng, năm từ Date object
day = this.date.getDate();
month = this.date.getMonth();
year = this.date.getFullYear();

isReservationIdReadOnly = false;

  addOrderForm = new FormGroup({
    reservationId: new FormControl(''),
    tableId: new FormControl(''), 
    orderId: new FormControl('', Validators.required),
    orderName: new FormControl('', Validators.required),
    orderPhone: new FormControl('', Validators.required),
    orderAddress: new FormControl({ value: '', disabled: false }, Validators.required),
    orderEmail: new FormControl({ value: '', disabled: false }, Validators.required),
    orderDate: new FormControl(new TuiDay(this.year, this.month, this.day)),
  });
  constructor(
    private router: Router,
    private cartService: CartService,
    private dishService: DishService,
    private route: ActivatedRoute,
    private orderService: OrderService,
    private tableService: TableService,
    private reservationService: ReservationService,
    private store: Store<{
      order: OrderState;
      dish: DishState;
      auth: AuthState;
      user: UserState;
      category: categoryState;
      table: TableState;
      location: LocationState;
      reservation: ReservationState;
    }>,
    @Inject(TuiAlertService)
      private readonly alerts: TuiAlertService
  ) {
    this.store.dispatch(TableActions.get());
    this.store.dispatch(ReservationActions.get());
    this.store.dispatch(LocationActions.get());
    this.store.dispatch(OrderActions.get());
    this.subscriptions.push(
       /// Table
       this.table$.subscribe((tableList) => {
        if (tableList.length > 0) {
          console.log(tableList);
          this.tableList = tableList;
        }
      }),
      this.reservation$.subscribe((reservationList) => {
        if (reservationList.length > 0) {
          console.log('Get reservationList:', reservationList);
          this.reservationList = reservationList;
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
      }),
      this.order$.subscribe((orderList) => {
        if (orderList) {
          console.log(orderList);
          this.orderList = orderList;
        }
      })
    );
  }
  
  ngOnInit(): void {
    this.store.dispatch(OrderActions.get());
    this.subscriptions.push(
      this.order$.subscribe((orderList) => {
        if (orderList) {
          console.log(orderList);
          this.orderList = orderList;
        }
      })
    );
   
  }
  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => {
      subscription.unsubscribe();
    });
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

  // tableitems = this.reservationService.getItemTable();

  items = this.cartService.getSelectedDishes();
  totalAmount() {
    let total = 0;
    this.items.forEach((item) => {
      total += item.price * item.quantity;
    });
    return total;
  }
  totalQuantity() {
    let totalQuantity = 0;
    this.items.forEach((item) => {
      totalQuantity += item.quantity;
    });
    return totalQuantity;
  }

  generateRandomOrderId(): number {
    return Math.floor(Math.random() * 9999) + 1;
  }
  goBackOrder() {
    this.router.navigate(['base/order']);
  }
  createOrder(): void {
    const addOrderForm: any = {
      reservationId: this.addOrderForm.value.reservationId ?? '',
      tableId: this.addOrderForm.value.tableId ?? '',
      orderId: this.generateRandomOrderId(),
      orderName: this.addOrderForm.value.orderName ?? '',
      orderPhone: this.addOrderForm.value.orderPhone ?? '',
      orderAddress: this.addOrderForm.value.orderAddress ?? '',
      orderEmail: this.addOrderForm.value.orderEmail ?? '',
      orderDate: this.addOrderForm.value.orderDate ?? new Date(),
    };
    console.log('Create Order Bill success', addOrderForm);
    this.store.dispatch(OrderActions.createOrder({ order: addOrderForm }));
    this.orderService.addToOrderDetail(addOrderForm);
  }

  // selectTable(tableId: string): void {

  //   const selectedTable = this.tableList.find((table) => table.tableId === tableId);
      
  //    if (selectedTable?.status === true) {
  //     console.log('Selected Table:', selectedTable);
  //       this.addOrderForm.patchValue({
  //         tableId: selectedTable?.tableId,
  //       });
  //    }
  //    if (selectedTable?.status === false) { 
  //     this.alerts
  //     .open('Table not reservation, please select a valid table.', {
  //       status: 'error',
  //     }).subscribe();
  //    }
  // }

  selectTable(tableId: string): void {

     const selectedReservation = this.reservationList.find((reservation) => reservation.tableId === tableId);
      
     if (selectedReservation !== null) {
      console.log('Selected Table:', selectedReservation);
        this.addOrderForm.patchValue({
          reservationId: selectedReservation?.reservationId.toString(),
          tableId: selectedReservation?.tableId.toString(),
          orderName: selectedReservation?.name,
          orderPhone: selectedReservation?.phone,
          orderEmail: ' ',
          orderAddress: ' ',
        });
       
     }
     if (selectedReservation === null) { 
      this.alerts
      .open('Table not reservation, please select a valid table.', {
        status: 'error',
      }).subscribe();
     }
  }


  goToPaymentMomo() {
    this.createOrder();
    this.router.navigate(['base/payments/payment-momo']);
  }
  goToPaymentBanking() {
    this.createOrder();
    this.router.navigate(['base/payments/payment-banking']);
  }
  goToPaymentCOD() {
    this.createOrder();
    this.router.navigate(['base/payments/payment-cod']);
  }
}
