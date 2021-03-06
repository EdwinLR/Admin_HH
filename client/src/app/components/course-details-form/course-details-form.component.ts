import { Component, HostBinding, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CourseDetailsService } from 'src/app/services/course-details.service';
import { StudentsService } from 'src/app/services/students.service';
import { CourseDetail } from 'src/app/models/CourseDetail';
import { LoginService } from 'src/app/services/login.service';
import { SQLVerificatorService } from 'src/app/services/sqlverificator.service';
import { PermissionsService } from 'src/app/services/permissions.service';
import { Permission } from 'src/app/models/Permission';

@Component({
  selector: 'app-course-details-form',
  templateUrl: './course-details-form.component.html',
  styleUrls: ['./course-details-form.component.css']
})
export class CourseDetailsFormComponent implements OnInit {

  @HostBinding('class') classes = 'row';
  courseDetail : CourseDetail = {
    studentId : '',
    courseId : '',
    WQ_1 : 0,
    WQ_2 : 0,
    WQ_3 : 0,
    OQ_1 : 0,
    OQ_2 : 0,
    OQ_3 : 0,
    CP_1 : 0,
    CP_2 : 0,
    CP_3 : 0,
    final_Project : 0,
    final_Grade : 0,
  };

  students : any = [];
  details : any = [];
  edit : boolean = false;
  exists : boolean = false;
  crn : any = null;
  detailId : any = null;
  permissionFlag : boolean = false;

  constructor(private courseDetailService : CourseDetailsService, private studentService : StudentsService, 
    private router : Router, private route : ActivatedRoute, private loginService : LoginService,  
    private verificationService : SQLVerificatorService, private permissionService : PermissionsService ) {
     }

  ngOnInit(): void {
    const params = this.route.snapshot.params
    console.log(params)

    this.crn = params['crn'];
    this.detailId = params['studentId'];
    console.log(this.crn);
    console.log(this.detailId);

    if(this.detailId != undefined){
      this.courseDetailService.getCourseDetail(this.detailId).subscribe(
        res => {
          console.log(res);
          this.courseDetail = res;
          this.edit = true;
        },
        err => console.log(err)
      );
    }

    this.fillStudents()
    this.fillCourse_Details()
  }

  saveNewCourseDetail() 
  {
    let permissions : Permission;
    let role = this.loginService.getCookie();

    this.permissionService.getPermission(role).subscribe(
      res =>{
        permissions = res;

        if(!permissions.course_detailsC){
          alert("No tienes permisos para realizar esta acci??n.");
            this.router.navigate(['/courses'])
        }
        else{
          this.permissionFlag = true;
        }
      },
      err => console.error(err)
    )

    if(this.permissionFlag){
        this.courseDetail.studentId = this.verificationService.VerifyInjection(this.courseDetail.studentId!)

      if(this.courseDetail.studentId != ''){
        delete this.courseDetail.final_Grade;
        this.courseDetail.courseId = this.crn;

        console.log(this.courseDetail);
        
        for (let i = 0; i < this.details.length; i++) {
          if (this.details[i].studentId == this.courseDetail.studentId) {
            this.exists = true;
            break;
          }
          else{
            this.exists = false;
          }
        }

        if(!this.exists){
          this.courseDetailService.createCourseDetail(this.courseDetail).subscribe(
            res => {
              console.log(res);
              this.router.navigate(['/courseDetails', this.crn]);
            },
            err => console.error(err)
          );
        }
        else{
          alert("No puede inscribir a un alumno ya inscrito en este u otro curso.")
        }
      }
      else{
        alert("Por favor completa todos los registros.")
      }
    }

    
  }

  updateCourseDetail(){
    let permissions : Permission;
    let role = this.loginService.getCookie();

    this.permissionService.getPermission(role).subscribe(
      res =>{
        permissions = res;

        if(!permissions.course_detailsU){
          alert("No tienes permisos para realizar esta acci??n.");
            this.router.navigate(['/courses'])
        }
        else{
          this.permissionFlag = true;
        }
      },
      err => console.error(err)
    )

    if(this.permissionFlag){
      this.courseDetail.final_Grade = ((this.courseDetail.WQ_1! + this.courseDetail.WQ_2! + this.courseDetail.WQ_3!)/3 + (this.courseDetail.OQ_1! + this.courseDetail.OQ_2! + this.courseDetail.OQ_3!)/3 + (this.courseDetail.CP_1! + this.courseDetail.CP_2! + this.courseDetail.CP_3!)/3 + this.courseDetail.final_Project!) /4;
      this.courseDetail.final_Grade = +this.courseDetail.final_Grade.toFixed(2);

      this.courseDetailService.updateCourseDetail(this.courseDetail.studentId!, this.courseDetail).subscribe(
        res => {
          console.log(res);
          this.router.navigate(['/courseDetails', this.crn]);
        },
        err => console.error(err)
      );
    }

    
  }

  fillStudents(){
    this.studentService.getStudents().subscribe(
      res => {
        this.students = res;
        console.log(res)
      },
      err => console.error(err)
    )
  }

  fillCourse_Details(){
    this.courseDetailService.getAllCourseDetails().subscribe(
      res => {
        this.details = res;
        console.log(res)
      },
      err => console.error(err)
    )
  }

}
