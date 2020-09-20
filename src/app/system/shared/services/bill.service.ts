import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Bill} from '../models/bill.model';
import {BaseApi} from '../../../shared/core/base-api';

@Injectable()
export class BillService {
  constructor(private httpClient: HttpClient) {}

  getBill(): Observable<any> {
    return this.httpClient.get(BaseApi.getUrl('bill'));
  }

  getCurrency(): Observable<any> {
    return this.httpClient.get('https://www.cbr-xml-daily.ru/daily_json.js');
  }
}
