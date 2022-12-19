import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { UsuarioService } from '../services/usuario.service';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  
  constructor(private usuarioServices :UsuarioService,
              private router : Router){}


  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot){
      return  this.usuarioServices.validarToken()
              .pipe(
                tap( isValid =>{
                  if(!isValid) {
                    this.router.navigateByUrl('/login')
                  }
                }
                )
              )
    
  }
  
}
