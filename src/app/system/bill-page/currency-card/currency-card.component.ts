import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'my-currency-card',
  templateUrl: './currency-card.component.html',
  styleUrls: ['./currency-card.component.scss']
})
export class CurrencyCardComponent {
  @Input() currency: any;
  currencies: string [] = ['EUR', 'USD'];


}
