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

  //atributo para editar user
  userSelected: User;
  constructor(private service: UserService){
    this.userSelected = new User();
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
    //validamos que el id sea mayor a 0
    if(user.id > 0){
      //obtenemos la lista de usuarios y con map nos permite modificar un arreglo y crear un nuevo arreglo ya con los datos modificados
      // y con una exprecion lamda y operador ternario  validamos que el usuario exista y sea igual a uno del arreglo y los modificamos
      this.users = this.users.map(u => (u.id == user.id) ? {... user} : u); 
    }else{
      //creamos una nueva lista dispersando los datos y le agregamos el nuevo usuario
    this.users = [... this.users, {... user, id: new Date().getTime()}];
    }
    this.userSelected = new User();
  }



  removeUser(id: number): void{
    //creamos otra lista la cual filtra y si encuentra un id con el que se pasa en el metodo remove este lo excluye 
    //y crea una lista nueva sin ese id pasa todos los distintos al id buscado
    this.users = this.users.filter(user => user.id != id);
  }

  setSeletedUser(userRow:User): void {
    //se asignamos al user selected el valor de user que viene del metodo y lo destruturamos para que cree un nuevo user
    //y regresamos el user selecte al hijo que seria el formulario para editarlo
    this.userSelected = {... userRow};
  }
}
