import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {MyEvent} from '../models/event.model';
import {BaseApi} from '../../../shared/core/base-api';

@Injectable()
export class EventService {
  constructor(public httpClient: HttpClient) {
  }

  addEvent(event: MyEvent): Observable<any> {
    return this.httpClient.post(BaseApi.getUrl('events'), event);
  }

  getEvent(): Observable<any> {
    return this.httpClient.get(BaseApi.getUrl('events'));
  }
}
