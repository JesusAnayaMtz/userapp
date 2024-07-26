import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-user-app',
  standalone: true,
  imports: [],
  templateUrl: './user-app.component.html',
  styleUrl: './user-app.component.css'
})
export class UserAppComponent implements OnInit{

  //creamos nuetsro arreglo de usuarios
  users: User[] = [];

  constructor(private service: UserService){

  }
  ngOnInit(): void {
    //implementamos el metodo findall y nos suscrbimos ya que es un observable y con funcion flecha pasamos los usuarios
    this.service.findAll().subscribe(users => this.users = users)
  }

}
