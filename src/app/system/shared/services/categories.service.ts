import {HttpClient} from '@angular/common/http';
import {Category} from '../models/category.model';
import {Observable} from 'rxjs';
import {BaseApi} from '../../../shared/core/base-api';

export class CategoriesService {
  constructor(public httpClient: HttpClient) {}

  addCategory(category: Category): Observable<any> {
    return this.httpClient.post(BaseApi.getUrl('categories'), category);
  }

  getCategory(): Observable<any> {
    return this.httpClient.get(BaseApi.getUrl('categories'));
  }

  updateCategory(category: Category): Observable<any> {
    return this.httpClient.put(BaseApi.getUrl(`categories/${category.id}`), category);
  }
}
