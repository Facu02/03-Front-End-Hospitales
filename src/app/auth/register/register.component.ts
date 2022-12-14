import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsuarioService } from '../../services/usuario.service';

import Swal from 'sweetalert2'

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'
  ]
})
export class RegisterComponent {

  public formSubmit:boolean = false
   
  public registerForm = this.fb.group({
    nombre:   ['Facu', [Validators.required, Validators.minLength(3)] ],
    email:    ['test100@gmail.com', [Validators.required, Validators.email]],
    password: ['123456', [Validators.required]],
    passwordRepeat: ['123456', [Validators.required]],
    terminos : [false,Validators.required]

  },{ validators: this.passwordsIguales('password', 'passwordRepeat')})


  constructor(public fb : FormBuilder,
              private usuarioServices: UsuarioService){}


  crearUsuario (){

    this.formSubmit = true
    
    this.usuarioServices.crearUsuario( this.registerForm.value)
      .subscribe({
        next: (resp) => {console.log(resp)},
        error: (err) => {
          Swal.fire('Error',err.error.msg, 'error')
          
        }
      })
  }

  campoNoValido(campo:string):boolean{

    if(this.registerForm.get(campo)?.invalid && this.formSubmit){
      return true
    }

    if(this.registerForm.valid){
      console.log('formulario posteado')
    }
 

  return false    
  }

  contraseniasNoValidas():boolean{
    const password1 = this.registerForm.get('password')
    const password2 = this.registerForm.get('passwordRepeat')


    if(password1!.value === password2!.value ){
      return true
    }

    return false

  }

  aceptarTerminos(){
    return !this.registerForm.get('terminos')?.value && this.formSubmit
  }

  passwordsIguales( arg1:string, arg2:string){

    return (formGrup : FormGroup)=> {
      const passwordControl1  = formGrup.get(arg1);
      const passwordControl2  = formGrup.get(arg2)

      if(passwordControl1 === passwordControl2){
        passwordControl2?.setErrors(null)
      }
      else{
        passwordControl2?.setErrors({
          passworsNoValido: true
        })
      }

    }

  }

}
