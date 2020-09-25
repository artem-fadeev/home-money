import {Component, Input, OnInit} from '@angular/core';
import {Category} from '../../shared/models/category.model';
import {MyEvent} from '../../shared/models/event.model';

@Component({
  selector: 'my-history-events',
  templateUrl: './history-events.component.html',
  styleUrls: ['./history-events.component.scss']
})
export class HistoryEventsComponent implements OnInit {
  @Input() categories: Category[] = [];
  @Input() events: MyEvent[] = [];
  searchValue = '';
  searchPlaceholder = 'Сумма';
  searchField = 'amount';

  constructor() { }

  ngOnInit() {
    this.events.forEach((event: MyEvent) => {
      event.catName = this.categories.find((category: Category) =>
        category.id === event.category
      ).name;
    });
  }

  getEventClass(event: MyEvent): any {
    return {
      'label': true,
      'label-danger': event.type === 'outcome',
      'label-success': event.type === 'income',
    };
  }

  changeCriteria(field: string) {
    const namesMap = {
      amount: 'Сумма',
      date: 'Дата',
      category: 'Категория',
      type: 'Тип'
    };
    this.searchPlaceholder = namesMap[field];
    this.searchField = field;
  }

}
