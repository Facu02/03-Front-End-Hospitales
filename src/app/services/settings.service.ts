import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

 private LinkTheme = document.querySelector('#theme');

  constructor() {
    let theme = localStorage.getItem("theme") || './assets/css/colors/default.css' ;
    this.LinkTheme?.setAttribute('href', theme!)
  }

  changeTheme(theme:string){
    const url = `./assets/css/colors/${theme}.css`

    this.LinkTheme?.setAttribute('href', url)

    localStorage.setItem('theme' , url)
    this.checkCruutentTheme()
  }

  
  checkCruutentTheme(){

    const links = document.querySelectorAll('.selector')

    links.forEach(element => {

      element.classList.remove('working')

      const btnTheme = element.getAttribute('data-theme')

      const btnThemeUrl = `./assets/css/colors/${btnTheme}.css`

      const currentThme = this.LinkTheme?.getAttribute('href')

      if( btnThemeUrl === currentThme ){

        element.classList.add('working')

      }


    });


  }

}
