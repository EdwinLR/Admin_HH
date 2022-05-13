import { Component, HostBinding, Inject, LOCALE_ID, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Permission } from 'src/app/models/Permission';
import { LoginService } from 'src/app/services/login.service';
import { PermissionsService } from 'src/app/services/permissions.service';
import { SchedulesService } from 'src/app/services/schedules.service';
import { ScreensService } from 'src/app/services/screens.service';
import { Screen } from 'src/app/models/Screen';

@Component({
  selector: 'app-schedules-list',
  templateUrl: './schedules-list.component.html',
  styleUrls: ['./schedules-list.component.css']
})
export class SchedulesListComponent implements OnInit {
  @HostBinding('class') classes='row';

  schedules:any=[];
  permissionFlag : boolean = false;

  constructor(private schedulesService:SchedulesService, private router : Router,
    private loginService : LoginService, private permissionService : PermissionsService,
    @Inject(LOCALE_ID) private locale:string, private screenService:ScreensService) { }

  ngOnInit(): void {
      this.listSchedules();
      this.verifyAccess();
  }

  listSchedules(){
    this.schedulesService.getSchedules().subscribe(
      res => this.schedules=res,
      err => console.error(err)
    );
  }

  deleteSchedule(scheduleId:string)
  {
    let permissions : Permission;
    let role = this.loginService.getCookie();

    this.permissionService.getPermission(role).subscribe(
      res =>{
        permissions = res;

        if(!permissions.schedulesD){
          alert("No tienes permisos para realizar esta acción.");
            this.router.navigate(['/schedules'])
        }
        else{
          this.permissionFlag = true;
        }
      },
      err => console.error(err)
    )
    
    if(this.permissionFlag){
      this.schedulesService.deleteSchedule(scheduleId).subscribe
      (
        res =>
        {
          console.log(res);
          this.listSchedules();
        },
        err => console.error(err)
      );
    }
    
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
  
          if(!screenPermissions.schedules){
            alert("No tienes permisos para acceder a este apartado.");
            this.router.navigate(['/'])
          }
        },
        err => console.error(err)
      );
    }

}
