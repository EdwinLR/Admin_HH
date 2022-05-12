import { Component, HostBinding, OnInit } from '@angular/core';
import { PermissionsService } from 'src/app/services/permissions.service';
import { Permission } from 'src/app/models/Permission';
import { ScreensService } from 'src/app/services/screens.service';
import { Screen } from 'src/app/models/Screen';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-screen-form',
  templateUrl: './permission-form.component.html',
  styleUrls: ['./permission-form.component.css']
})
export class PermissionFormComponent implements OnInit {
  @HostBinding('class') classes = 'row';
  permissionControl : Permission = {
    roleId : 0,
    coordinatorsC : false,
    coordinatorsD : false,
    coordinatorsU : false,
    course_detailsC : false,
    course_detailsD : false,
    course_detailsU : false,
    coursesC : false,
    coursesD : false,
    coursesU : false,
    frequenciesC : false,
    frequenciesD : false,
    frequenciesU : false,
    periodsC : false,
    periodsD : false,
    periodsU : false,
    permissionsU : false,
    programsC : false,
    programsD : false,
    programsU : false,
    rolesC : false,
    rolesD : false,
    schedulesC : false,
    schedulesD : false,
    schedulesU : false,
    screensU : false,
    studentsC : false,
    studentsD : false,
    studentsU : false,
    teachersC : false,
    teachersD : false,
    teachersU : false,
  }

  screensControl : Screen = {
    roleId : 0,
    coordinators : false,
    course_details : false,
    courses : false,
    frequencies : false,
    periods : false,
    permission : false,
    programs : false,
    roles : false,
    schedules : false,
    screens : false,
    students : false,
    teachers : false
  }

  constructor(private activatedRoute : ActivatedRoute, private router : Router, private loginService : LoginService,
    private permissionService : PermissionsService, private screenService : ScreensService) { }

  ngOnInit(): void {
    const params=this.activatedRoute.snapshot.params;
    let role = params['roleId'];
    this.screenService.getScreen(role).subscribe(
      res => 
      {
        console.log(res)
        this.screensControl = res;
      },
      err => console.error(err)
    );
    
    this.permissionService.getPermission(role).subscribe(
      res =>{
        console.log(res)
        this.permissionControl = res;
      },
      err => console.error(err)
    );

    this.verifyAccess();

  }

  updateScreens(){
    console.log(this.permissionControl);
    
    this.permissionService.updatePermission(this.permissionControl.roleId!,this.permissionControl).subscribe(
      res =>{
        console.log(res);
      },
      err => console.error(err)
    );

    this.router.navigate(['/roles'])
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

          if(!screenPermissions.permission){
            alert("No tienes permisos para acceder a este apartado.");
            this.router.navigate(['/roles'])
          }
        },
        err => console.error(err)
      );
  }

}
