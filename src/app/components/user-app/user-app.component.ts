import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user';
import { UserService } from '../../services/user.service';
import { UserComponent } from '../user/user.component';
import { UserformComponent } from '../userform/userform.component';
import Swal from 'sweetalert2';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';
import { NavbarComponent } from '../navbar/navbar.component';
import { SharingDataService } from '../../services/sharing-data.service';
import { routes } from '../../app.routes';
import { state } from '@angular/animations';

@Component({
  selector: 'app-user-app',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent],
  templateUrl: './user-app.component.html',
  styleUrl: './user-app.component.css'
})
export class UserAppComponent implements OnInit{

  btnAgregarUsuario: boolean = false;

  //creamos nuetsro arreglo de usuarios
  users: User[] = [];

  //atributo para editar user
 // userSelected: User;

  //inyectamos el sharin data service
  constructor(private service: UserService, private sharingDate: SharingDataService,private router: Router, private route: ActivatedRoute){
   // this.userSelected = new User();
  }
  ngOnInit(): void {
    //pasamos la pagina con route que se agrego en el constrictor y con una funciona flecha creamos una constante la cual sera la pagina
    // this.route.paramMap.subscribe(params => {
    //   const page = +(params.get('page') || '0')
    //   //llamamos al metodo find all pageable y convertimos a un arreglo de usuarios
    //   this.service.findAllPageable(page).subscribe(pageable => this.users = pageable.content as User[])
    // })
    //implementamos el metodo findall y nos suscrbimos ya que es un observable y con funcion flecha pasamos los usuarios y se los pasamos al areglo users
    //this.service.findAll().subscribe(users => this.users = users)
    
    this.addUser();
    this.removeUser();
   // this.setSeletedUser();
   this.findUserById();
    this.pageUserEvent();
  }

  //se ocupa para obtener el ultimo rango de paginacion y sus usuarios para ssi poder editar o agregar uno nuevo y estos bviene del user.component
  pageUserEvent(){
    this.sharingDate.pageUsersEventEmmiter.subscribe(users => this.users = users);
  }

  //creamos este metodo para poder buscar al usuarios y lo vamos a emitir el id con eventemiter
  findUserById(): void{
    //escuchamos el evente emitter que viene del form el cual recibe el id 
    this.sharingDate.findUSerByIDEventEmmiter.subscribe(id => {
      const user = this.users.find(user => user.id == id);

      //volvemos a mandar en el event emiter el usuario al user form
      this.sharingDate.selectUserEventEmmiter.emit(user);
    })
  }

  //este evento se usara para recibir el usuario nuevo que viene del modal userform
  addUser(){
    this.sharingDate.newUserEventeEmmiter.subscribe(user =>{
      //validamos que el id sea mayor a 0
      if(user.id > 0){
        //utilizamor el service para llamar al back y nos suscribimos
        this.service.update(user).subscribe({next: (userUpdate) => {
                  //obtenemos la lista de usuarios y con map nos permite modificar un arreglo y crear un nuevo arreglo ya con los datos modificados
        // y con una exprecion lamda y operador ternario  validamos que el usuario exista y sea igual a uno del arreglo y los modificamos
          this.users = this.users.map(u => (u.id == userUpdate.id) ? {... userUpdate} : u); 
          this.router.navigate(['/users'], {state: {users: this.users}})
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Usuario Actualizado",
          showConfirmButton: false,
          timer: 2000
        });
        },
        error: (err)=>{
          //console.log(err.error)
          if(err.status == 400){
            this.sharingDate.errorsUserFormEmmiter.emit(err.error);
          }
        }}
      )
      }else{
        //lamamos al service y al metodo create y nos suscribimos y creamos un nuevo usuario
        this.service.create(user).subscribe( {
          next: userNew =>{
          //creamos una nueva lista dispersando los datos y le agregamos el nuevo usuario
          this.users = [... this.users, {... userNew}];
          //aqui tambien al crear un usuario nos redirige a otro
      this.router.navigate(['/users'], {state: {users: this.users}})
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Usuario Guardado",
        showConfirmButton: false,
        timer: 2000
      });
        },
      error: (err) => {
        //console.log(err.error)
        if(err.status == 400){
          this.sharingDate.errorsUserFormEmmiter.emit(err.error);
        }
        
      }
      })
      }
    })
    
  }



  removeUser(): void{
    this.sharingDate.idUserEventEmmiter.subscribe(id => {
          //creamos otra lista la cual filtra y si encuentra un id con el que se pasa en el metodo remove este lo excluye 
    //y crea una lista nueva sin ese id pasa todos los distintos al id buscado
    this.service.remove(id).subscribe(() => {
      this.users = this.users.filter(user => user.id != id);
    })
    //usamos router para rediriir con navigate a usercreate ya que no se puede ir directo y ya con skiplocation retornamos a la pagina que si queremos ir
    this.router.navigate(['/users/create'], {skipLocationChange: true}).then(() => {
      //y aqui volvemos a redirigir a users
      this.router.navigate(['/users'], {state: {users: this.users}})
    })
    })
  }

  // setSeletedUser(): void {
  //   this.sharingDate.selectedUserEventEmitter.subscribe(userRow =>{
  //     //se asignamos al user selected el valor de user que viene del metodo y lo destruturamos para que cree un nuevo user
  //   //y regresamos el user selecte al hijo que seria el formulario para editarlo
  //   this.userSelected = {... userRow};
  //   })
    
  // }
}
