import { Component } from '@angular/core';
import { FileUploadService } from 'src/app/services/file-upload.service';
import { ModalImagenService } from 'src/app/services/modal-imagen.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-modal-imagen',
  templateUrl: './modal-imagen.component.html',
  styles: [
  ]
})
export class ModalImagenComponent {
 
  public imagen!: File;
  public imgTemplate:any = ""  
 
  constructor(public modalImagen : ModalImagenService,
              public fileUploadServices : FileUploadService){}

  cambiarModal(){
    this.imgTemplate = null
   
  }

  cerrarModal(){
    this.modalImagen.cerrarModal()
  }

  
  cambiarImagen( file :File){
  

    this.imagen = file

    if(!file){
      this.imgTemplate = null
      return
    }

    const reader = new FileReader()
    const url64 = reader.readAsDataURL(file)

    reader.onloadend = () =>{
      this.imgTemplate = reader.result
    }
    
  }

  subirImagen(){

    const id = this.modalImagen.id
    const tipo = this.modalImagen.tipo
    

    this.fileUploadServices.actualizarImagen(this.imagen, tipo, id)
    .then( (img) =>  {
      if(img=== false){
        Swal.fire('Error', 'no se puedo guardar', 'error')
      }else{
        Swal.fire('Guardado', 'Cambios realizados', 'success')
        this.modalImagen.nuevaImagen.emit(img)
      }
      this.cerrarModal()
    }).catch((error) => {
      const msgError = error.error.msg
        Swal.fire('Guardado', msgError, 'error')
    })
  }

}
