import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LoginForm, registerForm } from '../interfaces/register-formn.interfaces';
import { environment } from 'src/environments/environment';

import { tap } from "rxjs/operators";

const base_url = environment.base_url

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(private http : HttpClient) {}

  validarToken(){

    const token = localStorage.getItem('token') || "";

    return this.http.get(`${base_url}/login/renew`, 
    { headers:{
        'x-token' : token
      }
    })
  }


  crearUsuario( formulario:registerForm){
    
    return this.http.post(`${base_url}/usuarios`, formulario)


  }

  login(formulario:LoginForm){

    return this.http.post(`${base_url}/login`, formulario)
                    .pipe(
                      tap((resp:any) => {
                        localStorage.setItem('token', resp.token)
                      })
                    )
  }

  loginGoogle(token:string){
    // Se pone {token} para mandar el paylod osea lo mas importante
    return this.http.post(`${base_url}/login/google`, {token})
                    .pipe(
                      tap((resp:any) => {
                        localStorage.setItem('token', resp.token)
                      })
                    )
  }
}
