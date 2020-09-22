import {Component, OnDestroy, OnInit} from '@angular/core';
import {BillService} from '../shared/services/bill.service';
import {CategoriesService} from '../shared/services/categories.service';
import {EventService} from '../shared/services/event.service';
import {combineLatest, Subscription} from 'rxjs';
import {Bill} from '../shared/models/bill.model';
import {MyEvent} from '../shared/models/event.model';
import {Category} from '../shared/models/category.model';

@Component({
  selector: 'my-planning-page',
  templateUrl: './planning-page.component.html',
  styleUrls: ['./planning-page.component.scss']
})
export class PlanningPageComponent implements OnInit, OnDestroy {
  isLoaded = false;
  subscription: Subscription[] = [];

  bill: Bill;
  categories: Category[] = [];
  events: MyEvent[] = [];

  constructor(
    private billService: BillService,
    private categoryService: CategoriesService,
    private eventsService: EventService
  ) { }

  ngOnInit() {
    this.subscription.push( combineLatest(
      this.billService.getBill(),
      this.categoryService.getCategory(),
      this.eventsService.getEvent()
    ).subscribe((data: [Bill, Category[], MyEvent[]]) => {
      this.isLoaded = true;
      this.bill = data[0];
      this.categories = data[1];
      this.events = data[2];
      this.isLoaded = true;
    }));
  }

  getCategoryCost(category: Category): number {
    const categoryEvents = this.events.filter(e => e.category === category.id && e.type === 'outcome');
    return categoryEvents.reduce((total, event) => {
      total += event.amount;
      return total;
    }, 0);
  }

  private getPercent(category: Category): number {
    const percent = (100 * this.getCategoryCost(category)) / category.capacity;
    return percent > 100 ? 100 : percent;
  }

  getCategoryPercent(category: Category): string {
    return this.getPercent(category) + '%';
  }

  getCategoryColorClass(category: Category): string {
    const percent = this.getPercent(category);
    return percent < 60 ? 'success' : percent >= 100 ? 'danger' : 'warning';
  }

  ngOnDestroy(): void {
    this.subscription.forEach((item: Subscription) => item.unsubscribe());
  }

}
