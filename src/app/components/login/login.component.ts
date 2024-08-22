import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { User } from '../../models/user';
import Swal from 'sweetalert2';
import { SharingDataService } from '../../services/sharing-data.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {


  //creamos una variable donde vamos a poblar los dtos del usuario al formulario el username y el password
  user: User;

  // inicializamos el objeto user con un nuevo usuario  inyectamos el sharing data para usar el event emmiter
  constructor(private sharingData: SharingDataService){
    this.user = new User();
  }

  //para enviar el formualario del usarname y password
  onSubmit(){
    //validamos que no venga vacio
    if(!this.user.username || !this.user.password){
      Swal.fire(
        'Error de validacion',
        'Username y Password Requeridos',
        'error'
      );
    } else {
      //usamos el event emmiter y emitimos el username y el password como objetos hacia el componente princpial que es userappcomponent
      this.sharingData.handlerLoginEventEmitter.emit({username: this.user.username, password: this.user.password})
    }
  }

}
