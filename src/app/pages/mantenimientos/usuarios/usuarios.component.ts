import { Component, OnInit } from '@angular/core';
import { debounceTime, Subject } from 'rxjs';
import { Usuario } from 'src/app/models/usuario.model';
import { BusquedasService } from 'src/app/services/busquedas.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styles: [
  ]
})
export class UsuariosComponent implements OnInit{

  public totalUsers : number =0;
  public usuarios : Usuario[] =[];
  public auxiliarUsuarios : Usuario[] =[];
  public desde : number = 0
  public cargando :boolean = true


  constructor(  private usuarioServices : UsuarioService,
                private busquedasServices: BusquedasService){}
  ngOnInit(): void {

    this.termino$.pipe(
      debounceTime(500)
    ).subscribe(resp => this.buscar(resp))

    this.cargarUsuarios()
  }

  cargarUsuarios(){
    this.cargando = true
    this.usuarioServices.cargarUsuarios(this.desde)
    .subscribe(({total,usuarios}) => {

      this.totalUsers = total,
      this.usuarios = usuarios
      this.auxiliarUsuarios = usuarios
      this.cargando = false
    })

  }

  cambiarPagina(valor : number){

    this.desde += valor

    if(this.desde < 0){
      this.desde = 0
    }else if( this.desde >= this.totalUsers){
      this.desde -= valor
    }

    this.cargarUsuarios()

  }

  termino$ :Subject<string> = new Subject()

  buscar(termino : string){

    this.busquedasServices.buscar('usuarios', termino)
    .subscribe(resp => {
      
      this.usuarios = resp
    })

  }

  TerminoDeBusqueda(termino : string) {

    if(termino.length === 0){
      this.cargarUsuarios()
    }

    this.termino$.next(termino)

  }

  eliminarUsuario(usuario : Usuario){

    if(usuario.uid === this.usuarioServices.uid){
      return Swal.fire('Error' , 'No te podes borrar a vos flaco', 'error')
    }

      Swal.fire({
        title: 'Estas seguro?',
        text: "Esta accion no puede revertirse",
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      }).then((result) => {
      if (result.isConfirmed) {
        this.usuarioServices.eliminarUsuario(usuario)
        .subscribe((resp:{ok:boolean, msg:string}) => 
        { 
        if( resp.ok){
            Swal.fire(
              'Borrado!',
              `${resp.msg}`,
              'success'
              )
            this.cargarUsuarios
          }
        else{
            Swal.fire(
              'No se puedo borrar!',
              `${resp.msg}`,
              'error'
            )
          }
        })
      }})
      return
    }
  

}
