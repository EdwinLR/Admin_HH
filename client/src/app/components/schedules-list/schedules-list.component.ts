import { Component, HostBinding, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Permission } from 'src/app/models/Permission';
import { LoginService } from 'src/app/services/login.service';
import { PermissionsService } from 'src/app/services/permissions.service';
import { SchedulesService } from 'src/app/services/schedules.service';

@Component({
  selector: 'app-schedules-list',
  templateUrl: './schedules-list.component.html',
  styleUrls: ['./schedules-list.component.css']
})
export class SchedulesListComponent implements OnInit {
  @HostBinding('class') classes='row';
  schedules:any=[];
  constructor(private schedulesService:SchedulesService, private router : Router,
    private loginService : LoginService, private permissionService : PermissionsService) { }

  ngOnInit(): void {
    var role = this.loginService.getCookie()
    if(role == '1'){
      this.listSchedules();
    }
    else{
      alert("No tienes permisos para acceder a este apartado.")
      this.router.navigate(['/'])
    }
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
      },
      err => console.error(err)
    )
    
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
