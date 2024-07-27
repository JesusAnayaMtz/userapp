import { Component, Input, input } from '@angular/core';
import { User } from '../../models/user';

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

}
