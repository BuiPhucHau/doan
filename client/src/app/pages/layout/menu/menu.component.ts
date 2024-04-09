import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TaigaModule } from '../../../shared/taiga.module';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [TaigaModule, CommonModule],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MenuComponent {
  items = [
    {
      id: '1',
      title: 'Bữa sáng',
      dishes: [
        { name: 'Món ăn 1', price: '200.000 VNĐ' },
        { name: 'Món ăn 2', price: '200.000 VNĐ' },
        { name: 'Món ăn 3', price: '200.000 VNĐ' },
        { name: 'Món ăn 4', price: '200.000 VNĐ' },
        { name: 'Món ăn 5', price: '200.000 VNĐ' },
      ],
    },
    {
      id: '2',
      title: 'Bữa trưa',
      dishes: [
        { name: 'Món ăn 1', price: '200.000 VNĐ' },
        { name: 'Món ăn 1', price: '200.000 VNĐ' },
        { name: 'Món ăn 2', price: '200.000 VNĐ' },
        { name: 'Món ăn 3', price: '200.000 VNĐ' },
        { name: 'Món ăn 4', price: '200.000 VNĐ' },
      ],
    },
    {
      id: '3',
      title: 'Bữa tối',
      dishes: [
        { name: 'Món ăn 1', price: '200.000 VNĐ' },
        { name: 'Món ăn 1', price: '200.000 VNĐ' },
        { name: 'Món ăn 2', price: '200.000 VNĐ' },
        { name: 'Món ăn 3', price: '200.000 VNĐ' },
        { name: 'Món ăn 4', price: '200.000 VNĐ' },
      ],
    },
  ];

}
