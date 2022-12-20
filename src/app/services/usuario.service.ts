import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LoginForm, registerForm } from '../interfaces/register-formn.interfaces';
import { environment } from 'src/environments/environment';

import { catchError, delay, map, tap } from "rxjs/operators";
import { Observable, of } from 'rxjs';
import { Router } from '@angular/router';
import { Usuario } from '../models/usuario.model';

const base_url = environment.base_url

declare const google : any

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  public usuario! :Usuario;

  constructor(  private http : HttpClient,
                private router : Router) 
  {}

  get token(){
    return localStorage.getItem('token') || "";
  }

  get uid(){
    return this.usuario.uid
  }

  get headers(){
    return {
      headers:{
        'x-token': this.token
      }
    }
  }


  logout(){
    localStorage.removeItem('token')

    google.accounts.id.revoke('facundortega1234@gmail.com', ()=>{
      
      this.router.navigateByUrl('/login')
    })
  }

  validarToken():Observable<boolean>{

    return this.http.get(`${base_url}/login/renew`, 
    { headers:{
        'x-token' :this.token
      }
    }).pipe(
      map( (resp: any) => {
        const { nombre , email, role, google, img = '', uid} = resp.usuarioDB

        this.usuario = new Usuario(nombre,email,'',img,google,role,uid )
       
        localStorage.setItem('token',resp.token) 
        return true
      }),
      catchError( error => of(false))
    )
  }

  actualizarUsuario( data:{email:string, nombre:string, role :string, password:string }){


    return this.http.put(`${base_url}/usuarios/${this.uid}`, data,this.headers)
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

  cargarUsuarios( desde : number =0){

    const url = `${base_url}/usuarios?desde=${desde}`

    return this.http.get<{total:number, usuarios:Usuario[]}>(url, this.headers)
      .pipe(
        delay(1000),
        map( resp => {

          const usuarios :Usuario[] = resp.usuarios
                .map( user => new Usuario(user.nombre , user.email
                    , '', user.img, user.google , user.role, user.uid))
          
          return{
            total: resp.total,
            usuarios
          }
        })
      )
  }

  eliminarUsuario(usuario :Usuario){

    const url:string = `${base_url}/usuarios/${usuario.uid}`

    return this.http.delete<{ok:boolean,msg:string}>(url, this.headers)

  }

  guardarUsuario( data:Usuario){


    return this.http.put(`${base_url}/usuarios/${data.uid}`, data ,this.headers)
  }


}
