import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map, debounceTime } from 'rxjs/operators';
import { Usuario } from '../models/usuario.model';
import { HospitalModal } from '../models/hospitales.model';

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

    return this.http.get<any[]>(url , this.headers)
        .pipe(
          
          map( (resp:any) => {

            switch (tipo) {
              case 'usuarios':
                  return this.transformUser(resp.resultado)
                break;
                case 'hospitales':
                  return this.transformMedico(resp.resultado)
                break;
            


              default:
                return resp
                break;
            }
           
          })
        )
  }




  transformMedico(resultado: any[]) {
    const hospital :HospitalModal[] = resultado.map( (user:HospitalModal) => new HospitalModal(user.nombre,user._id,user.usuario,user.img))
    return hospital
  }


  transformUser(resp:any[]){
    const usuarios :Usuario[] = resp.map( (user:Usuario) => new Usuario(user.nombre , user.email
        , '', user.img, user.google , user.role, user.uid))
      return usuarios
  }

  buscarByid(tipo : 'usuarios'|'medicos' | 'hospitales',id:string = ''){

    const url = `${base_url}/${tipo}/${id}`

    return this.http.get(url, this.headers)

  }

}
