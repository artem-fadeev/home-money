import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {NgForm} from '@angular/forms';
import {Category} from '../../shared/models/category.model';
import {CategoriesService} from '../../shared/services/categories.service';
import {Message} from '../../../shared/models/message.model';
import {Subscription} from 'rxjs';

@Component({
  selector: 'my-edit-category',
  templateUrl: './edit-category.component.html',
  styleUrls: ['./edit-category.component.scss']
})
export class EditCategoryComponent implements OnInit, OnDestroy {
  @Input() categories: Category[] = [];
  @Output() onCategoryEdit = new EventEmitter<Category>();

  subscription: Subscription[] = [];
  currentCategoryId = 1;
  currentCategory: Category;
  message: Message;

  constructor(private categoriesService: CategoriesService) { }

  ngOnInit() {
    this.message = new Message('success', '');
    this.onCategoryChange();
  }

  onCategoryChange() {
    this.currentCategory = this.categories.find(item => item.id === +this.currentCategoryId);
  }

  onSubmit(form: NgForm) {
    let {capacity, name} = form.value;
    if (capacity < 0) { capacity *= -1; }

    const category = new Category(name, capacity, +this.currentCategoryId);

    this.subscription.push(this.categoriesService.updateCategory(category)
      .subscribe((item: Category) => {
        this.onCategoryEdit.emit(category);
        this.message.text = 'Категория отредактирована';
        window.setTimeout(() => this.message.text = '', 5000);
      }));
  }

  ngOnDestroy(): void {
    this.subscription.forEach((item: Subscription) => item.unsubscribe());
  }

}
