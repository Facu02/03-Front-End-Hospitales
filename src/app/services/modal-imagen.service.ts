import { EventEmitter, Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

 const baseUrl = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class ModalImagenService {

  public tipo : 'usuarios' | 'medicos' | 'hospitales' = 'usuarios';
  public id : string = ''
  public img : string = ''

  public nuevaImagen: EventEmitter<string> = new EventEmitter<string>()


  private _ocultarModal: boolean = true

  get ocultarModal(){
    return this._ocultarModal
  }
 
  constructor() { }

  cambiarModal( 
    tipo: 'usuarios' | 'medicos' | 'hospitales',
    id: string ,
    img:string = 'no-img'
  ){
  
      if(img.includes('https')){
        this.img = img
      }else{
        this.img = `${baseUrl}/upload/${tipo}/${img}`
      }
    this.id = id

    this._ocultarModal = !this._ocultarModal

  }

  cerrarModal(){
    this._ocultarModal = !this._ocultarModal
  }

}
