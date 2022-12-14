import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { UsuarioService } from '../services/usuario.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  
  constructor(private usuarioServices :UsuarioService){}


  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot){
      this.usuarioServices.validarToken().subscribe({
        next: (resp) => console.log(resp)
      })
    return true;
  }
  
}
