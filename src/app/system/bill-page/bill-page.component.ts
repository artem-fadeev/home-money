import {Component, OnDestroy, OnInit} from '@angular/core';
import {BillService} from '../shared/services/bill.service';
import {combineLatest, Subscription} from 'rxjs';
import {Bill} from '../shared/models/bill.model';

@Component({
  selector: 'my-bill-page',
  templateUrl: './bill-page.component.html',
  styleUrls: ['./bill-page.component.scss']
})
export class BillPageComponent implements OnInit, OnDestroy {
  private subscription: Subscription[] = [];

  currency: any;
  bill: Bill;
  isLoaded = false;

  constructor(
    private billService: BillService
  ) { }

  ngOnInit() {
    this.subscription.push( combineLatest(
      this.billService.getBill(),
      this.billService.getCurrency()
    ).subscribe((data: [Bill, any]) => {
      this.isLoaded = true;
      this.bill = data[0];
      this.currency = data[1];
    }));
  }

  onRefresh() {
    this.isLoaded = false;
    this.subscription.push(this.billService.getCurrency().subscribe((currency: any) => {
      this.currency = currency;
      this.isLoaded = true;
    }));
  }

  ngOnDestroy() {
    this.subscription.forEach(item => item.unsubscribe());
  }


}
