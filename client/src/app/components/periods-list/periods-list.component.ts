import { Component, HostBinding, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Permission } from 'src/app/models/Permission';
import { LoginService } from 'src/app/services/login.service';
import { PeriodsService } from 'src/app/services/periods.service';
import { PermissionsService } from 'src/app/services/permissions.service';
import { ScreensService } from 'src/app/services/screens.service';
import { Screen } from 'src/app/models/Screen';

@Component({
  selector: 'app-periods-list',
  templateUrl: './periods-list.component.html',
  styleUrls: ['./periods-list.component.css']
})
export class PeriodsListComponent implements OnInit {
  @HostBinding('class') classes='row';

  periods:any=[];
  permissionFlag : boolean = false;

  constructor(private periodService:PeriodsService, private router : Router,
    private loginService : LoginService, private permissionService : PermissionsService,private screenService:ScreensService) { }

  ngOnInit(): void {
 
      this.listPeriods();
      this.verifyAccess();
  }

  listPeriods(){
    this.periodService.getPeriods().subscribe(
      res => this.periods=res,
      err => console.error(err)
    );
  }

  deletePeriod(periodId:string)
  {
    let permissions : Permission;
    let role = this.loginService.getCookie();

    this.permissionService.getPermission(role).subscribe(
      res =>{
        permissions = res;

        if(!permissions.periodsD){
          alert("No tienes permisos para realizar esta acción.");
            this.router.navigate(['/periods'])
        }
        else{
          this.permissionFlag = true;
        }
      },
      err => console.error(err)
    )
    
    if(this.permissionFlag){
      this.periodService.deletePeriod(periodId).subscribe
      (
        res =>
        {
          console.log(res);
          this.listPeriods();
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
  
          if(!screenPermissions.periods){
            alert("No tienes permisos para acceder a este apartado.");
            this.router.navigate(['/'])
          }
        },
        err => console.error(err)
      );
    }
}


