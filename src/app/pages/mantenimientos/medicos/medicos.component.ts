import { Component, OnInit } from '@angular/core';
import { MedicosService } from '../../../services/medicos.service';
import { Medico } from '../../../models/medicos.model';
import Swal from 'sweetalert2';
import { BusquedasService } from '../../../services/busquedas.service';
import { HospitalModal } from '../../../models/hospitales.model';

@Component({
  selector: 'app-medicos',
  templateUrl: './medicos.component.html',
  styles: [
  ]
})
export class MedicosComponent implements OnInit{

  public medicos : Medico[] = []
  public medicosAuxiliar : Medico[] = []

  public mensaje: boolean = false
  public valores: boolean = false

  public cargando : boolean = true

  constructor(  private medicosService: MedicosService,
                private busquedasService : BusquedasService){}


  ngOnInit(): void {
    this.cargarMedicos()
  }

  cargarMedicos(){
    this.medicosService.cargarMedicos().subscribe( resp =>{
      this.medicos = resp
      this.medicosAuxiliar = resp
    })
  }

  async abrirSweet(){
    	
    const { value: formValues } = await Swal.fire({
      title: 'Multiple inputs',
      html:
        '<input id="swal-input1" class="swal2-input" placeholder="Nombre del medico">  ' +
        '<input id="swal-input2" class="swal2-input" placeholder="id del hospital">' +
        `<p class="text-center text-danger mt-1">*Todos los datos deben tiene que tener un valor</p>`,
      focusConfirm: false,
      preConfirm: () => {

        const nombreDelMedido:any = document.getElementById('swal-input1')
        const IdHospital:any = document.getElementById('swal-input2')

        if(!nombreDelMedido.value || !IdHospital.value){
          this.valores = false
          Swal.fire('Error','Debe ingresar valores','error')
          console.log('no')
          return
        }

        const nombre:string = nombreDelMedido.value
        const idHosptial:string =  IdHospital.value

        this.medicosService.crearMedicos(nombre, idHosptial)
        .subscribe({
          next: ()=> console.log,
          error: (err) => { console.log(err.error.errors.idHospital.msg), Swal.fire('Error',err.msg,'error')}
        })
        return [
          nombreDelMedido.value,
          IdHospital.value

        ]
      },
    })

    if(!(formValues![0]) || !formValues![1]){
      this.valores = false
      console.log(formValues![0])
      return
    }else if (formValues) {

      const id = formValues[1]

      this.busquedasService.buscarByid('hospitales', id)
      .subscribe( (resp:any) => {
        const nombreHospital = resp.hospital.nombre

        Swal.fire(`El medico ${formValues[0]} fue agregado al ${nombreHospital}`)
      } )
  
    }

  }

 

}
