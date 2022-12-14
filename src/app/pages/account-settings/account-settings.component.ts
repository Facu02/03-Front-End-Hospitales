import { Component, OnInit } from '@angular/core';
import { SettingsService } from '../../services/settings.service';

@Component({
  selector: 'app-account-settings',
  templateUrl: './account-settings.component.html',
  styles: [
  ]
})
export class AccountSettingsComponent implements OnInit{

  constructor(private SettingsServices : SettingsService){}
  
  ngOnInit(): void {
    this.SettingsServices.checkCruutentTheme()
  }
  

  changeTheme(theme:string){

    this.SettingsServices.changeTheme(theme)

  }



}
