import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  rootURL = environment.apiUrl + 'identity';
  constructor(private http: HttpClient) { }
  
  login(user: User) {
    return this.http.post(this.rootURL + '/login', user);
  }
  register(user: User) {
    return this.http.post(this.rootURL + '/register', user);
  }
}
