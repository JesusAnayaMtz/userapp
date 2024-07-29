import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user';
import { UserService } from '../../services/user.service';
import { UserComponent } from '../user/user.component';
import { UserformComponent } from '../userform/userform.component';
import { ModalModule } from 'ngx-bootstrap/modal';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user-app',
  standalone: true,
  imports: [UserComponent, UserformComponent],
  templateUrl: './user-app.component.html',
  styleUrl: './user-app.component.css'
})
export class UserAppComponent implements OnInit{

  btnAgregarUsuario: boolean = false;

  //creamos nuetsro arreglo de usuarios
  users: User[] = [];

  constructor(private service: UserService){

  }
  ngOnInit(): void {
    //implementamos el metodo findall y nos suscrbimos ya que es un observable y con funcion flecha pasamos los usuarios
    this.service.findAll().subscribe(users => this.users = users)
  }

  abrirAgregarUsuario(){
    this.btnAgregarUsuario = !this.btnAgregarUsuario;
  }


  //este evento se usara para recibir el usuario nuevo que viene del modal userform
  addUser(user: User){
    //creamos una nueva lista dispersando los datos y le agregamos el nuevo usuario
    this.users = [... this.users, {... user, id: new Date().getTime()}];
  }

}
