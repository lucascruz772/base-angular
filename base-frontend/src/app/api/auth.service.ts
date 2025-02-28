import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { interval, map, Observable, tap } from 'rxjs';
import { RequestService } from './services/base/request.service';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
constructor(private request: RequestService) {}

  isLoggedIn() {
    return this.request.doRequest(`${environment.baseUrl}/login`, 
      'GET', 
      {}
    );

  }
  login () {
    return this.request.doRequest(`${environment.baseUrl}/auth/login`, 
      'POST', 
      { 
      body: {} }
    );
  }
  logout () {
    return this.request.doRequest(`${environment.baseUrl}/auth/login`, 
      'POST', 
      { 
        body: {}, 
      }
    );
  }
}