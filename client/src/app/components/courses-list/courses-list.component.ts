import { Component, HostBinding, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CoursesService } from 'src/app/services/courses.service';
import { LoginService } from 'src/app/services/login.service';
import { ScreensService } from 'src/app/services/screens.service';
import { Screen } from 'src/app/models/Screen';
import { Permission } from 'src/app/models/Permission';
import { PermissionsService } from 'src/app/services/permissions.service';

@Component({
  selector: 'app-courses-list',
  templateUrl: './courses-list.component.html',
  styleUrls: ['./courses-list.component.css']
})
export class CoursesListComponent implements OnInit {
  @HostBinding('class') classes='row';

  courses:any=[];
  permissionFlag : boolean = false;

  constructor(private coursesService:CoursesService, private router : Router,
    private loginService : LoginService, private screenService : ScreensService,
    private permissionService : PermissionsService) { 
  }

  ngOnInit(): void {
    this.listCourses();
    
    this.verifyAccess();
  }

  listCourses(){
    this.coursesService.getCourses().subscribe(
      res => {
        console.log(res);
        this.courses=res
      },
      err => console.error(err)
    );
  }

  deleteCourse(crn:string)
  {
    let permissions : Permission;
    let role = this.loginService.getCookie();

    this.permissionService.getPermission(role).subscribe(
      res =>{
        permissions = res;

        if(!permissions.coursesD){
          alert("No tienes permisos para realizar esta acción.");
            this.router.navigate(['/courses'])
        }
        else{
          this.permissionFlag = true;
        }
      },
      err => console.error(err)
    )
    
    if(this.permissionFlag){
      this.coursesService.deleteCourse(crn).subscribe
      (
        res =>
        {
          console.log(res);
          this.listCourses();
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

          if(!screenPermissions.courses){
            alert("No tienes permisos para acceder a este apartado.");
            this.router.navigate(['/'])
          }
        },
        err => console.error(err)
      );
  }

}

