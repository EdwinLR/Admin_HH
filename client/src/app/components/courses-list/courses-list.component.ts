import { Component, HostBinding, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CoursesService } from 'src/app/services/courses.service';
import { LoginService } from 'src/app/services/login.service';
import { ScreensService } from 'src/app/services/screens.service';
import { Screen } from 'src/app/models/Screen';

@Component({
  selector: 'app-courses-list',
  templateUrl: './courses-list.component.html',
  styleUrls: ['./courses-list.component.css']
})
export class CoursesListComponent implements OnInit {
  @HostBinding('class') classes='row';

  courses:any=[];

  constructor(private coursesService:CoursesService, private router : Router,
    private loginService : LoginService, private screenService : ScreensService) { 
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

