import {Component, OnDestroy, OnInit} from '@angular/core';
import {CategoriesService} from '../shared/services/categories.service';
import {EventService} from '../shared/services/event.service';
import {Category} from '../shared/models/category.model';
import {MyEvent} from '../shared/models/event.model';
import {combineLatest, Subscription} from 'rxjs';
import * as moment from 'moment';

@Component({
  selector: 'my-history-page',
  templateUrl: './history-page.component.html',
  styleUrls: ['./history-page.component.scss']
})
export class HistoryPageComponent implements OnInit, OnDestroy {
  private subscriptions: Subscription[] = [];

  constructor(
    private categoryService: CategoriesService,
    private eventService: EventService) {
  }

  categories: Category[] = [];
  events: MyEvent[] = [];
  filteredEvents: MyEvent[] = [];

  isLoaded = false;
  isFilterVisible = false;

  ngOnInit() {
    this.subscriptions.push(combineLatest(
      this.categoryService.getCategory(),
      this.eventService.getEvent()).subscribe(
      (data: [Category[], MyEvent[]]) => {
        this.categories = data[0];
        this.events = data[1];
        this.setOriginEvents();
        this.isLoaded = true;
      }
      )
    );
  }

  private setOriginEvents() {
    this.filteredEvents = this.events.slice();
  }

  openFilter(): void {
    this.toggleFilterVisibility(true);
  }

  private toggleFilterVisibility(dir: boolean) {
    this.isFilterVisible = dir;

  }

  onFilterApply(filterData) {
    this.toggleFilterVisibility(false);
    this.setOriginEvents();
    const startPeriod = moment().startOf(filterData.period).startOf('d');
    const endPeriod = moment().endOf(filterData.period).endOf('d');

    this.filteredEvents = this.filteredEvents.filter((e) => {
      return filterData.type.indexOf(e.type) !== -1;
    }).filter((e) => {
      return filterData.categories.indexOf(e.category.toString()) !== -1;
    }).filter((e) => {
      const momentDate = moment(e.date, 'DD.MM.YYYY HH:mm:ss');
      return momentDate.isBetween(startPeriod, endPeriod);
    });
  }

  onFilterCancel() {
    this.toggleFilterVisibility(false);
    this.setOriginEvents();
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((item: Subscription) => item.unsubscribe())
  }
}
