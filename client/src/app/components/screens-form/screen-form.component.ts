import { Component, HostBinding, OnInit } from '@angular/core';
import { ScreensService } from 'src/app/services/screens.service';
import { Screen } from 'src/app/models/Screen';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';
import { PermissionsService } from 'src/app/services/permissions.service';
import { Permission } from 'src/app/models/Permission';

@Component({
  selector: 'app-screen-form',
  templateUrl: './screen-form.component.html',
  styleUrls: ['./screen-form.component.css']
})
export class ScreenFormComponent implements OnInit {
  @HostBinding('class') classes = 'row';
  screensControl : Screen =
  {
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

  constructor(private screenService : ScreensService, private loginService : LoginService,
    private activatedRoute : ActivatedRoute, private router : Router, private permissionService : PermissionsService) { }

  ngOnInit(): void {
    const params=this.activatedRoute.snapshot.params;
    this.screenService.getScreen(params['roleId']).subscribe
      (
        res => 
        {
          console.log(res)
          this.screensControl = res;
        },
        err => console.error(err)
      );

      this.verifyAccess();
  }

  updateScreens(){
    //console.log(this.screensControl);

    let permissions : Permission;
    let role = this.loginService.getCookie();

    this.permissionService.getPermission(role).subscribe(
      res =>{
        permissions = res;

        if(!permissions.screensU){
          alert("No tienes permisos para realizar esta acción.");
            this.router.navigate(['/roles'])
        }
      },
      err => console.error(err)
    )
    
    this.screenService.updateScreen(this.screensControl.roleId!,this.screensControl).subscribe(
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

          if(!screenPermissions.screens){
            alert("No tienes permisos para acceder a este apartado.");
            this.router.navigate(['/roles'])
          }
        },
        err => console.error(err)
      );
  }

}
