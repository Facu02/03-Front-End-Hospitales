import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { delay, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Medico } from '../models/medicos.model';

const baseUrl = environment.base_url

@Injectable({
  providedIn: 'root'
})
export class MedicosService {
  public get http(): HttpClient {
    return this._http;
  }
  public set http(value: HttpClient) {
    this._http = value;
  }

  constructor( private _http: HttpClient ) { }

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

  cargarMedicos( ){

    const url = `${baseUrl}/medicos`

    return this.http.get<{ok:boolean, medicos:Medico[]}>(url, this.headers)
           .pipe(
            delay(500),
            map( (resp: { ok:boolean, medicos:Medico[]}) => resp.medicos)
           )
  }

  crearMedicos( nombre : string , idHospital:string ){
    const url = `${baseUrl}/medicos`

    return this.http.post(url,{nombre,idHospital },this.headers)

  }

  actualizarMedicos(id:string, nombre : string){
    const url = `${baseUrl}/medicos/${id}`

    return this.http.put(url,{nombre},this.headers)
  }

  borrarMedicos(id:string){
    const url = `${baseUrl}/medicos/${id}`

    return this.http.delete(url,this.headers)
  }
}
