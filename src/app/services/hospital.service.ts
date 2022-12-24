import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { delay } from 'rxjs';
import { map } from 'rxjs/operators';
import { HospitalModal } from '../models/hospitales.model';

const baseUrl =  environment.base_url

@Injectable({
  providedIn: 'root'
})
export class HospitalService {

  constructor( private http : HttpClient ) { }

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

  cargarHospitales( ){

    const url = `${baseUrl}/hospitales`

    return this.http.get<{ok:boolean, hospitales:HospitalModal[]}>(url, this.headers)
           .pipe(
            delay(500),
            map( (resp) => resp.hospitales)
           )
  }

  crearHospital( nombre : string ){
    const url = `${baseUrl}/hospitales`

    return this.http.post(url,{nombre},this.headers)

  }

  actualizarHospital(id:string, nombre : string){
    const url = `${baseUrl}/hospitales/${id}`

    return this.http.put(url,{nombre},this.headers)
  }

  borrarHospital(id:string){
    const url = `${baseUrl}/hospitales/${id}`

    return this.http.delete(url,this.headers)
  }

}
