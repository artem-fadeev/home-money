import {Component, Input, OnInit} from '@angular/core';
import {Bill} from '../../shared/models/bill.model';

@Component({
  selector: 'my-bill-card',
  templateUrl: './bill-card.component.html',
  styleUrls: ['./bill-card.component.scss']
})
export class BillCardComponent implements OnInit {

  @Input() bill: Bill;
  @Input() currency: any;

  dollar: number;
  euro: number;

  constructor() { }

  ngOnInit() {
    const { Valute } = this.currency;
    this.euro = this.bill.value / Valute['EUR'].Value;
    this.dollar = this.bill.value / Valute['USD'].Value;
  }

}
