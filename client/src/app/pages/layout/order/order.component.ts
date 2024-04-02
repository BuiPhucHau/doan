import { Component } from '@angular/core';
import { TaigaModule } from '../../../shared/taiga.module';
import { ShareModule } from '../../../shared/shared.module';

@Component({
  selector: 'app-order',
  standalone: true,
  imports: [TaigaModule, ShareModule],
  templateUrl: './order.component.html',
  styleUrl: './order.component.scss'
})
export class OrderComponent {
  index = 0;
 
  readonly itemsCount = 3;

  readonly items = [
      {title: 'First', content: 'First content'},
      {title: 'Title #2', content: 'Much more content here so the height is bigger'},
      {title: 'Title III', content: 'Small item again'},
      {title: 'Title four', content: 'Relatively ling content here'},
      {title: 'Fifth item', content: 'Tiny text'},
      // eslint-disable-next-line @typescript-eslint/quotes
      {title: '6', content: "That one's short too"},
      {title: 'Lucky 7', content: 'This takes about two lines or so'},
      {title: 'Eighth card', content: 'Almost the last one'},
      {title: 'X', content: 'This is the longest item there is in this list'},
  ];

  get rounded(): number {
      return Math.floor(this.index / this.itemsCount);
  }

  onIndex(index: number): void {
      this.index = index * this.itemsCount;
  }
}
