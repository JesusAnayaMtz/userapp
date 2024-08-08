import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-paginator',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './paginator.component.html',
  styleUrl: './paginator.component.css'
})
export class PaginatorComponent {

  //le pasamos al padre la url y el paginator
  @Input() url: string = '';
  @Input() paginator: any = {};

}
