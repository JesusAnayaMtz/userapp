import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private url: string = 'http://localhost:8080/login'

  constructor(private http: HttpClient) { 

  }

  //implementamos en el service el login pasando la url y el username y password
  loginUser({username, password}: any): Observable<any> {
    return this.http.post<any>(this.url, {username,password})
  }
}
