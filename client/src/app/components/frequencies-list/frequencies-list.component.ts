import { Component, HostBinding, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FrequenciesService } from 'src/app/services/frequencies.service';
import { LoginService } from 'src/app/services/login.service';
import { ScreensService } from 'src/app/services/screens.service';
import { Screen } from 'src/app/models/Screen';

@Component({
  selector: 'app-frequencies-list',
  templateUrl: './frequencies-list.component.html',
  styleUrls: ['./frequencies-list.component.css']
})
export class FrequenciesListComponent implements OnInit {
  @HostBinding('class') classes='row';
  frequencies:any=[];
  constructor(private frequenciesService:FrequenciesService, private router : Router,
    private loginService : LoginService, private screenService : ScreensService) { }

  ngOnInit(): void {
    this.listFrequencies()
    
    this.verifyAccess();
  }

  listFrequencies(){
    this.frequenciesService.getFrequencies().subscribe(
      res => this.frequencies=res,
      err => console.error(err)
    );
  }

  deleteFrequency(frequencyId:string)
  {
    this.frequenciesService.deleteFrequency(frequencyId).subscribe
    (
      res =>
      {
        console.log(res);
        this.listFrequencies();
      },
      err => console.error(err)
    );
  }

  verifyAccess(){
  let screenPermissions : Screen;
  let role = this.loginService.getCookie();

  console.log(role)
  this.screenService.getScreen(role).subscribe
    (
      res => 
      {
        screenPermissions = res;

        if(!screenPermissions.frequencies){
          alert("No tienes permisos para acceder a este apartado.");
          this.router.navigate(['/'])
        }
      },
      err => console.error(err)
    );
  }

}