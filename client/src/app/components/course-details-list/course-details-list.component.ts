import { Component, OnInit, HostBinding } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CourseDetailsService } from 'src/app/services/course-details.service';
import { LoginService } from 'src/app/services/login.service';
import { ScreensService } from 'src/app/services/screens.service';
import { Screen } from 'src/app/models/Screen';
import { Permission } from 'src/app/models/Permission';
import { PermissionsService } from 'src/app/services/permissions.service';
  
@Component({
  selector: 'app-course-details-list',
  templateUrl: './course-details-list.component.html',
  styleUrls: ['./course-details-list.component.css']
})
export class CourseDetailsListComponent implements OnInit {
  @HostBinding('class') classes = 'row';
  courseDetails : any = [];
  id : any;
  constructor(private courseDetailService : CourseDetailsService, private route : ActivatedRoute, 
    private router : Router, private loginService : LoginService, private screenService : ScreensService,
    private permissionService : PermissionsService) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id')
    this.getListCourseDetails(this.id);

    this.verifyAccess();
  }
  
  getListCourseDetails(studentId : string) : void {
    this.courseDetailService.getCourseDetails(studentId).subscribe(
      res => {
        console.log("ID: " + studentId)
        console.log(res)
        this.courseDetails = res
      },
      err => console.error(err)
    );
  }

  deleteCourse(studentId : string){
    let permissions : Permission;
    let role = this.loginService.getCookie();

    this.permissionService.getPermission(role).subscribe(
      res =>{
        permissions = res;

        if(!permissions.course_detailsD){
          alert("No tienes permisos para realizar esta acción.");
            this.router.navigate(['/courses'])
        }
      },
      err => console.error(err)
    )
    
    console.log(studentId);
    this.courseDetailService.deleteCourseDetail(studentId).subscribe(
      res =>{
        console.log(res)
        window.location.reload();
      },
      err => console.log(err)
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

          if(!screenPermissions.course_details){
            alert("No tienes permisos para acceder a este apartado.");
            this.router.navigate(['/courses'])
          }
        },
        err => console.error(err)
      );
  }
}
