import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {User} from '../models/user.model';
import { map } from 'rxjs/operators';
import {BaseApi} from '../core/base-api';

@Injectable()
export class UsersService {
  constructor(private http: HttpClient) {}

  getUserByEmail(email: string): Observable<User> {
    return this.http.get(BaseApi.getUrl(`users?email=${email}`))
      .pipe(
        map((user: User[]) => user[0] ? user[0] : undefined)
      );
  }

  createNewUser(user: User): Observable<any> {
    return this.http.post(BaseApi.getUrl('users'), user);
  }
}
