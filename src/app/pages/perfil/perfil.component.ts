import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Usuario } from 'src/app/models/usuario.model';
import { FileUploadService } from 'src/app/services/file-upload.service';
import Swal from 'sweetalert2';
import { UsuarioService } from '../../services/usuario.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styles: [
  ]
})
export class PerfilComponent implements OnInit{

  public perfilForm!: FormGroup 
  public usuario :Usuario
  public imagen!: File;
  public imgTemplate:any = ""  
  constructor(  private fb : FormBuilder,
                private usuarioServices : UsuarioService,
                private fileUploadServices : FileUploadService){
                  this.usuario = usuarioServices.usuario
  }
  ngOnInit(): void {
    
    this.perfilForm = this.fb.group({
      nombre:['Facundo', [Validators.required]],
      email:['facundito@gmail.com', [Validators.required, Validators.email]]
    })

  }

  actualizar(){
    this.usuarioServices.actualizarUsuario(this.perfilForm.value).subscribe(
    { next: (resp:any) => {
        this.usuario.nombre = resp.usuario.nombre
        this.usuario.email  = resp.usuario.email

        Swal.fire('Guardado', 'Cambios realizados', 'success')
      },
      error: (error) => {
        const msgError = error.error.msg
        Swal.fire('Guardado', msgError, 'error')
      }
    })
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
    this.fileUploadServices.actualizarImagen(this.imagen, 'usuarios', this.usuario.uid!)
    .then( (img) =>  {
      this.usuario.img = img 
      Swal.fire('Guardado', 'Cambios realizados', 'success')
    }).catch((error) => {
      const msgError = error.error.msg
        Swal.fire('Guardado', msgError, 'error')
    })
  }

}
