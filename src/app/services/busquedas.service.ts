import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map, debounceTime } from 'rxjs/operators';
import { Usuario } from '../models/usuario.model';

const base_url = environment.base_url

@Injectable({
  providedIn: 'root'
})
export class BusquedasService {

  constructor( private http : HttpClient) { }

  get token(){
    return localStorage.getItem('token') || "";
  }

  get headers(){
    return {
      headers:{
        'x-token': this.token
      }
    }
  }

  buscar(tipo : 'usuarios'|'medicos' | 'hospitales',valor:string = ''){
  

    const url:string = `${base_url}/todo/coleccion/${tipo}/${valor}`

    return this.http.get<Usuario[]>(url , this.headers)
        .pipe(
          
          map( (resp:any) => {
            const usuarios :Usuario[] = resp.resultado
            .map( (user:Usuario) => new Usuario(user.nombre , user.email
                , '', user.img, user.google , user.role, user.uid))
              return usuarios
          })
        )
  }
}
