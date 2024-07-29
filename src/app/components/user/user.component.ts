import { Component, EventEmitter, Input, input, Output } from '@angular/core';
import { User } from '../../models/user';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})
export class UserComponent {


  //colocamos input ya que los usarios vienen del padre que es user-app se tiene que importar este componente en el padre
  @Input() users: User[] = [];

  //creamos el eventmitter para trasmitir al componente padre con output
  @Output() idUserEventEmmiter = new EventEmitter();

  //emitimos el valor al padre que es user-app
  @Output() selectedUserEventEmitter = new EventEmitter();

  //creamos el metodo que se usara para eliminar el cual se emitira con el event emiter
  onRemoveUSer(id: number): void{

    //usamos SweetAlert2 para la confirmacion de eliminar
    Swal.fire({
      title: "Desea Eliminar El Usuario?",
      text: "Es una accion irreversible",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, eliminar!"
    }).then((result) => {
      if (result.isConfirmed) {
        this.idUserEventEmmiter.emit(id);
        Swal.fire({
          title: "Eliminado!",
          text: "El usuario ah sido eliminado",
          icon: "success"
        });
      }
    });

    //con confirm creamos un evento en el cual nos mandar un msj si deseamos eliminar el usuario y validamos con un if que sea true
/*     const confirmRemove = confirm('Esta seguro que desea eliminar?')
    if(confirmRemove){
      this.idUserEventEmmiter.emit(id);
    } */
    
  }



  onSelectedUser(user: User): void {
    this.selectedUserEventEmitter.emit(user);
  }

  //se usa el mismo even emitter para abrir el modal y poder editar
  @Output() openEventEmmiter = new EventEmitter();

  abrirAgregarUsuario(): void{
    this.openEventEmmiter.emit();
  }

}
