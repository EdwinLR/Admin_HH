import { Component, HostBinding, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FrequenciesService } from 'src/app/services/frequencies.service';
import { LoginService } from 'src/app/services/login.service';
import { ScreensService } from 'src/app/services/screens.service';
import { Screen } from 'src/app/models/Screen';
import { Permission } from 'src/app/models/Permission';
import { PermissionsService } from 'src/app/services/permissions.service';

@Component({
  selector: 'app-frequencies-list',
  templateUrl: './frequencies-list.component.html',
  styleUrls: ['./frequencies-list.component.css']
})
export class FrequenciesListComponent implements OnInit {
  @HostBinding('class') classes='row';
  frequencies:any=[];
  constructor(private frequenciesService:FrequenciesService, private router : Router,
    private loginService : LoginService, private screenService : ScreensService,
    private permissionService : PermissionsService) { }

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
    let permissions : Permission;
    let role = this.loginService.getCookie();

    this.permissionService.getPermission(role).subscribe(
      res =>{
        permissions = res;

        if(!permissions.frequenciesD){
          alert("No tienes permisos para realizar esta acción.");
            this.router.navigate(['/frequencies'])
        }
      },
      err => console.error(err)
    )
    
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