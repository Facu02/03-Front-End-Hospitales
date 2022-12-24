import { Pipe, PipeTransform } from '@angular/core';
import { environment } from 'src/environments/environment';

const baseUrl = environment.base_url

@Pipe({
  name: 'imagen'
})
export class ImagenPipe implements PipeTransform {

  transform(  img: string = 'no-img', tipo: 'usuarios' | 'hospitales' | 'medicos'): string {
    if(img === 'no-img' ){
      return `${baseUrl}/upload/${tipo}/no-image`
    }

    if(img.includes('https')){
        return img
    }

    if(img){
        return `${baseUrl}/upload/${tipo}/${img}`
    }

    return `${baseUrl}/upload/${tipo}/no-image`
  }

}
