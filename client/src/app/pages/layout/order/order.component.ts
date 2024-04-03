import { ChangeDetectionStrategy,Component } from '@angular/core';
import { TaigaModule } from '../../../shared/taiga.module';
import {FormControl, FormGroup} from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule} from '@angular/common';


@Component({
  selector: 'app-order',
  standalone: true,
  imports: [TaigaModule,ReactiveFormsModule,CommonModule],
  templateUrl: './order.component.html',
  styleUrl: './order.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OrderComponent {
  readonly testForm = new FormGroup({
    testValue: new FormControl(),
});
items = [
  { id :"1", title: "Bữa sáng", dishes: [{ name: "Món ăn 1", price: "200.000 VNĐ" },{ name: "Món ăn 2", price: "200.000 VNĐ" },{ name: "Món ăn 3", price: "200.000 VNĐ" },{ name: "Món ăn 4", price: "200.000 VNĐ" },{ name: "Món ăn 5", price: "200.000 VNĐ" },{ name: "Món ăn 5", price: "200.000 VNĐ" },{ name: "Món ăn 5", price: "200.000 VNĐ" },{ name: "Món ăn 5", price: "200.000 VNĐ" },{ name: "Món ăn 5", price: "200.000 VNĐ" },{ name: "Món ăn 5", price: "200.000 VNĐ" },{ name: "Món ăn 5", price: "200.000 VNĐ" },{ name: "Món ăn 5", price: "200.000 VNĐ" },{ name: "Món ăn 5", price: "200.000 VNĐ" },{ name: "Món ăn 5", price: "200.000 VNĐ" },{ name: "Món ăn 5", price: "200.000 VNĐ" },] },
  { id :"2",title: "Bữa trưa", dishes:[{ name: "Món ăn 1", price: "200.000 VNĐ" },{ name: "Món ăn 1", price: "200.000 VNĐ" },{ name: "Món ăn 2", price: "200.000 VNĐ" },{ name: "Món ăn 3", price: "200.000 VNĐ" },{ name: "Món ăn 4", price: "200.000 VNĐ" }] },
  { id :"3",title: "Bữa tối", dishes: [{ name: "Món ăn 1", price: "200.000 VNĐ" },{ name: "Món ăn 1", price: "200.000 VNĐ" },{ name: "Món ăn 2", price: "200.000 VNĐ" },{ name: "Món ăn 3", price: "200.000 VNĐ" },{ name: "Món ăn 4", price: "200.000 VNĐ" }] },
];
}
