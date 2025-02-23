import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';

const AUTH_API = environment.apiURL + '/auth';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}
  
  login(username: string, password: string): Observable<any> {
    return this.http.post(AUTH_API + '/login', {
      username: username,
      password: password,
    });
  }

  logout() {
    sessionStorage.removeItem('auth-user');
    window.location.reload();
  }
}
