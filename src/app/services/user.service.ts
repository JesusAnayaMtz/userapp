import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {


  private users: User[] = [{
    id: 1,
    name: 'jesus',
    lastName: 'Anaya',
    email: 'jesus@gmail.com',
    userName: 'jesus.anaya',
    password: '123456'
  },
  {
    id: 2,
    name: 'jose',
    lastName: 'Martinez',
    email: 'jose@gmail.com',
    userName: 'jose.martinez',
    password: '789456'
  },
]

  constructor() { }

  //metodo para obtener todos
  findAll(): Observable<User[]> {
    return of(this.users)
  }
}
