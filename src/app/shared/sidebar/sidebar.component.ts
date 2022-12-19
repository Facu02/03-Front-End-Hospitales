import { Component } from '@angular/core';
import { SidebarService } from 'src/app/services/sidebar.service';
import { UsuarioService } from '../../services/usuario.service';
import { Usuario } from '../../models/usuario.model';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: [
  ]
})
export class SidebarComponent {

  menuItem:any[] = [];

  usuario : Usuario;

  constructor(  private sideBarService : SidebarService,
                private userService : UsuarioService  ){
                  this.menuItem = sideBarService.menu      
                  this.usuario = userService.usuario
  }

}
