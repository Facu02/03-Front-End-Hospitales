import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

const baseUrl = environment.base_url

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {

  constructor() { }

  async actualizarImagen(
    archivo : File,
    tipo: 'usuarios'| 'medicos'| 'hospitales',
    id:string
  ){

    try {

      const url = `${baseUrl}/upload/${tipo}/${id}`

      const data = new FormData()

      data.append('imagen', archivo)

      const fileUpload = await fetch( url,{
        method: 'PUT',
        headers:{
          'x-token': localStorage.getItem('token')|| ''
        },
        body: data
      })

      
      const img = await fileUpload.json()

      if(!img.ok){
        console.log(img.msg)
        return false
      }
      
      return img.nombreImg
      
    } catch (error) {
      console.log(error)
      return false
    }


  }


}
