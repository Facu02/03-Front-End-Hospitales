import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Route, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { UsuarioService } from '../../services/usuario.service';

declare const google:any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'
  ]
})
export class LoginComponent implements AfterViewInit{

  
  public formSubmit:boolean = false
  
  loginForm: FormGroup;
  
  @ViewChild('googleBtn') googleBtn!: ElementRef ;
  
  constructor(  private fb : FormBuilder, 
                private usuarioService : UsuarioService,
                private router :Router)
    {
      
      this.loginForm = this.fb.group({
        email:    [localStorage.getItem('email') || "", [Validators.required, Validators.email]],
        password: ['123456', [Validators.required]],
        remember:[false]
      })
    }
    ngAfterViewInit(): void {
    this.googleInit()
  }

  googleInit(){

    google.accounts.id.initialize({
      client_id: "294372777058-2eqacfulm1qpkdp8vv5r1ku0821odh85.apps.googleusercontent.com",
      callback: (response:any) =>this.handleCredentialResponse(response)
    });
    google.accounts.id.renderButton(
      // document.getElementById("buttonDiv"),
      this.googleBtn.nativeElement,
      { theme: "outline", size: "large" }  // customization attributes
    );
    
  }
  
  handleCredentialResponse(response:any){
    this.usuarioService.loginGoogle(response.credential).subscribe({
        next: ()=> {
        this.router.navigateByUrl('/dashboard')

      }}
    )
  }

  login(){

    if(this.loginForm.get('remember')?.value){
      localStorage.setItem('email', this.loginForm.get('email')?.value)
    }else{
      localStorage.removeItem('email')
    }

    this.usuarioService.login(this.loginForm.value).subscribe({
      next: resp => console.log(resp),
      error: (err) => {
        Swal.fire('Error',err.error.msg, 'error')
        
      }
    })


  }

}
