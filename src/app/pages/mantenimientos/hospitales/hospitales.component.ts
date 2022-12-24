import { Component, OnInit, OnDestroy } from '@angular/core';
import { HospitalService } from '../../../services/hospital.service';
import { HospitalModal } from '../../../models/hospitales.model';
import Swal from 'sweetalert2';
import { ModalImagenService } from '../../../services/modal-imagen.service';
import { Subscription, delay, Subject, debounceTime } from 'rxjs';
import { BusquedasService } from '../../../services/busquedas.service';
import { map, pluck, take } from 'rxjs/operators';

@Component({
  selector: 'app-hospitales',
  templateUrl: './hospitales.component.html',
  styles: [
  ]
})
export class HospitalesComponent implements OnInit ,OnDestroy{

  public hospitales : HospitalModal[] = []
  public hospitalesAxuliar : HospitalModal[] = []

  public mensaje: boolean = false

  public cargando : boolean = true

  private imgSubscription! : Subscription;

  private termino$: Subject<string>= new Subject()

  constructor(private hospitalServices : HospitalService,
              private modalImagenService : ModalImagenService,
              private busquedasService:BusquedasService){}

  ngOnDestroy(): void {
    this.imgSubscription.unsubscribe()  
  }

  ngOnInit(): void {

    this.cargarHospitales()

    this.termino$.pipe(
      debounceTime(500)
    ).subscribe(
      busqueda => {
        this.busquedasService.buscar('hospitales', busqueda)
        .pipe(
          map((resp:any) => resp.resultado)
        )
        .subscribe({
          next : (resp:HospitalModal[]) => {
            if(resp.length > 0){
              this.hospitales = resp
              this.mensaje = false
            }
            else{
              this.mensaje = true
              this.hospitales = this.hospitalesAxuliar
            }
         
          },
          error: ()=> {
            this.mensaje = false
            this.hospitales = this.hospitalesAxuliar}

        })
      }
    )

    this.imgSubscription = this.modalImagenService.nuevaImagen
      .pipe(
        delay(500)
      ).subscribe(
        console.log
      )
    
  }

  cargarHospitales(){
    this.cargando = true

    this.hospitalServices.cargarHospitales().subscribe( resp => {
      this.cargando= false
      this.hospitales = resp
      this.hospitalesAxuliar = resp
    })
  }

  guardarCambios( hospital : HospitalModal){
    this.hospitalServices.actualizarHospital(hospital._id, hospital.nombre)
      .subscribe(  
      {
        next: () => {Swal.fire('Actualizado', hospital.nombre , 'success')},
        error:(err) => {console.log(err), Swal.fire('Error' , 'No se puedo actualizar' , 'error')}
      } )
  }

  eliminarHospital( hospital : HospitalModal){
    this.hospitalServices.borrarHospital(hospital._id)
      .subscribe(  
      {
        next: () => {
          this.cargarHospitales()
          Swal.fire('Eliminado', hospital.nombre , 'success')},
        error:(err) => {console.log(err), Swal.fire('Error' , 'No se puedo borrar' , 'error')}
      } )
  }

  async abrirSweet(){
    	
    const {value, isConfirmed} = await Swal.fire<string>({
    text:'Nombre del nuevo Hospital',
    input: 'text',
    showCancelButton: true,
    inputPlaceholder: 'Nombre del hospital'
    })

    if(!value && isConfirmed){
      Swal.fire('Error' , 'debe ingresar un valor' , 'error')
      return
    }

    if( value?.trim().length! > 0){
      this.hospitalServices.crearHospital(value!)
      .subscribe((resp:any) => this.hospitales.push(resp.hospital))

    }

  }

  abrirModal(hospital: HospitalModal){

    this.modalImagenService.cambiarModal( 'hospitales', hospital._id , hospital.img)

  }

  TerminoDeBusqueda( valor :string){

    if(valor !== ''){
      this.termino$.next(valor)
    }else{
      this.mensaje = false
      this.hospitales = this.hospitalesAxuliar
    }

  

  }

}
