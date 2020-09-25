import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Params} from '@angular/router';
import {EventService} from '../../shared/services/event.service';
import {CategoriesService} from '../../shared/services/categories.service';
import {MyEvent} from '../../shared/models/event.model';
import {Category} from '../../shared/models/category.model';
import {Subscription} from 'rxjs';

@Component({
  selector: 'my-history-detail',
  templateUrl: './history-detail.component.html',
  styleUrls: ['./history-detail.component.scss']
})
export class HistoryDetailComponent implements OnInit, OnDestroy {
  subscription: Subscription[] = [];
  myEvent: MyEvent;
  category: Category;
  isLoaded = false;

  constructor(
    private route: ActivatedRoute,
    private eventService: EventService,
    private categoryService: CategoriesService
  ) { }

  ngOnInit() {
    this.subscription.push(
      this.route.params
        .subscribe((params: Params) => {
          this.eventService.getEventById(params['id'])
            .subscribe((event: MyEvent) => {
              this.myEvent = event;
              this.categoryService.getCategoryById(event.category)
                .subscribe((category: Category) => {
                  this.category = category;
                  this.isLoaded = true;
                });
            });
        })
    );
  }

  ngOnDestroy(): void {
    this.subscription.forEach((item: Subscription) => item.unsubscribe());
  }

}
