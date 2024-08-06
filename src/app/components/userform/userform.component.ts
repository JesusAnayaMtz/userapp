import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { UserAppComponent } from '../user-app/user-app.component';
import { FormsModule, NgForm } from '@angular/forms';
import { User } from '../../models/user';
import { CommonModule } from '@angular/common';
import { SharingDataService } from '../../services/sharing-data.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-userform',
  standalone: true,
  imports: [FormsModule, CommonModule,RouterModule],
  templateUrl: './userform.component.html',
  styleUrl: './userform.component.css'
})
export class UserformComponent implements OnInit{



  //declaramos una variable del tipo user
  //tambien se usa para recibir el user que viene del editar
  user: User;

  errors: any = {};


  
  //inicializamos en el constructor el user e inyectamos los sharindata correpondientes al evnet emiter a ocupar
  constructor(private sharinData: SharingDataService, private route: ActivatedRoute, private service: UserService){
    this.user = new User();
  }
  ngOnInit(): void {
    //escuchamos el evente emiiter error que viene del app component
    this.sharinData.errorsUserFormEmmiter.subscribe(errors => this.errors = errors)
    //ecuchamos o recibimos el event que viene del user app seria el retorno de cuando emitimos el id
    //nota importarte la suscripcion deve siempore esta al inicio 
    //this.sharinData.selectUserEventEmmiter.subscribe(user => this.user = user);
    //capturamos el parametro id del request con router y param map nos suscribimos y 
    //con la funcion flecha creamos una constante la cual le asiganmos el parametro id que viene del request y le agreamos el mas para que no marque el error al ser string y el id es numero
    this.route.paramMap.subscribe(params => {
      const id: number = + (params.get('id') || '0');
      if(id > 0){
        //vamos a consultar el id al back
        this.service.findById(id).subscribe(user => this.user = user);
      }
    })
  }

  //con este metodo al darle guardar enviara el evento con el user creado al padre(user-app)
  onSubmit(userForm: NgForm): void {
    //if(userForm.valid){
      this.sharinData.newUserEventeEmmiter.emit(this.user);
    console.log(this.user);
   // }
    // userForm.reset();
    // userForm.resetForm();
  }


  limpiarFormulario(userForm: NgForm): void{
    this.user = new User();
    userForm.reset();
    userForm.resetForm();
  }

}
