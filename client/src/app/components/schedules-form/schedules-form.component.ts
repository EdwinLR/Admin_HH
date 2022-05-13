import { Component, HostBinding, OnInit } from '@angular/core';
import { Router, ActivatedRoute} from '@angular/router';
import { Permission } from 'src/app/models/Permission';
import { Schedule } from 'src/app/models/Schedule';
import { LoginService } from 'src/app/services/login.service';
import { PermissionsService } from 'src/app/services/permissions.service';
import { SchedulesService } from 'src/app/services/schedules.service';

@Component({
  selector: 'app-schedules-form',
  templateUrl: './schedules-form.component.html',
  styleUrls: ['./schedules-form.component.css']
})
export class SchedulesFormComponent implements OnInit {
  @HostBinding('class') classes='row';
  schedule:Schedule=
  {
    scheduleId:'',
    startingTime:'',
    endingTime:''
  }

  edit:boolean=false;
  rows:any=[];
  permissionFlag : boolean = false;

  constructor(private schedulesService:SchedulesService, 
    private router:Router,
    private activatedRoute:ActivatedRoute,
    private loginService : LoginService,
    private permissionService : PermissionsService) { }

  ngOnInit(): void {
    const params=this.activatedRoute.snapshot.params;
    //console.log(params);
    if(params['scheduleId'])
    {
      this.schedulesService.getSchedule(params['scheduleId']).subscribe
      (
        res => 
        {
          console.log(res)
          this.schedule=res;
          this.edit=true;
        },
        err => console.error(err)
      )
    }
    this.schedulesService.getSchedules().subscribe(s=>{this.rows=s});
    
  }

  validateSchedule(){
    let flag=true;
    if(this.schedule.endingTime!<=this.schedule.startingTime!)
    {
      alert('La hora de salida no puede ser mayor o igual a la hora de inicio')
    }
    else
    {
      console.log(this.rows);
      for(let i=0; i<this.rows.length;i++)
      {
        console.log(this.rows[i]["startingTime"])
        if(this.rows[i]["startingTime"]==this.schedule.startingTime+":00" && this.rows[i]["endingTime"]==this.schedule.endingTime+":00")
        {
          alert('El horario ya existe');
          flag=false;
          break;
        }
      }

      if(flag)
      {
        if(this.edit)
        {
         this.updateSchedule();
        }
        else
        {
          this.saveNewSchedule();
        }
      }
    }
  }

  saveNewSchedule()
  {
    let permissions : Permission;
    let role = this.loginService.getCookie();

    this.permissionService.getPermission(role).subscribe(
      res =>{
        permissions = res;

        if(!permissions.schedulesC){
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
      delete this.schedule.scheduleId;

      this.schedulesService.saveSchedule(this.schedule).subscribe(
        res =>{
          console.log(res);
          this.router.navigate(['/schedules']);
        },
        err => console.error(err)
      );
    }
    
  }

  updateSchedule(){
    let permissions : Permission;
    let role = this.loginService.getCookie();

    this.permissionService.getPermission(role).subscribe(
      res =>{
        permissions = res;

        if(!permissions.schedulesU){
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
      this.schedulesService.updateSchedule(this.schedule.scheduleId!,this.schedule).subscribe(
        res =>{
          console.log(res);
          this.router.navigate(['/schedules']);
        },
        err => console.error(err)
      );
    }
    
  }
}
