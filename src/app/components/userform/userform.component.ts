import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { UserAppComponent } from '../user-app/user-app.component';
import { FormsModule } from '@angular/forms';
import { User } from '../../models/user';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-userform',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './userform.component.html',
  styleUrl: './userform.component.css'
})
export class UserformComponent{

  @Output() openEventEmmiter = new EventEmitter();

  abrirAgregarUsuario(): void{
    this.openEventEmmiter.emit();
  }

  //declaramos una variable del tipo user
  user: User;

  //se usara para pasar al padre el usuario creado quu seria user-app
  @Output() newUserEventeEmmiter: EventEmitter<User> = new EventEmitter();
  
  //inicializamos en el constructor el user
  constructor(){
    this.user = new User();
  }

  //con este metodo al darle guardar enviara el evento con el user creado al padre(user-app)
  onSubmit(): void {
    this.newUserEventeEmmiter.emit(this.user);
    console.log(this.user);
  }

}
