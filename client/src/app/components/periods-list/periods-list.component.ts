import { Component, HostBinding, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Permission } from 'src/app/models/Permission';
import { LoginService } from 'src/app/services/login.service';
import { PeriodsService } from 'src/app/services/periods.service';
import { PermissionsService } from 'src/app/services/permissions.service';

@Component({
  selector: 'app-periods-list',
  templateUrl: './periods-list.component.html',
  styleUrls: ['./periods-list.component.css']
})
export class PeriodsListComponent implements OnInit {
  @HostBinding('class') classes='row';
  periods:any=[];
  constructor(private periodService:PeriodsService, private router : Router,
    private loginService : LoginService, private permissionService : PermissionsService) { }

  ngOnInit(): void {
    var role = this.loginService.getCookie()
    if(role == '1'){
      this.listPeriods();
    }
    else{
      alert("No tienes permisos para acceder a este apartado.")
      this.router.navigate(['/'])
    }
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
      },
      err => console.error(err)
    )
    
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
