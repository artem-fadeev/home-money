import {Component, EventEmitter, OnDestroy, OnInit, Output} from '@angular/core';
import {NgForm} from '@angular/forms';
import {CategoriesService} from '../../shared/services/categories.service';
import {Category} from '../../shared/models/category.model';
import {Subscription} from 'rxjs';

@Component({
  selector: 'my-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.scss']
})
export class AddCategoryComponent implements OnDestroy {
  subscription: Subscription[] = [];
  @Output() onCategoryAdd = new EventEmitter<Category>();

  constructor(private categoriesService: CategoriesService) { }

  onSubmit(form: NgForm) {
    let { name, capacity } = form.value;
    if (capacity < 0 ) { capacity *= -1; }
    const category = new Category(name, capacity);
    this.subscription.push(this.categoriesService.addCategory(category)
      .subscribe((categoryItem: Category) => {
        form.reset();
        form.form.patchValue({capacity: 1});
        this.onCategoryAdd.emit(categoryItem);
      }));
  }

  ngOnDestroy(): void {
    this.subscription.forEach((item: Subscription) => item.unsubscribe());
  }

}
