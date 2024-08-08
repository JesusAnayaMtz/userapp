import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';
import { User } from '../../models/user';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {

  //le pasamos el arreglo de users que viene del componente padre que es user app y se lo mostramos al html poer medio de un state
  @Input() users: User[] = [];

  @Input() paginator = {};
}
