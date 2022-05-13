import { Component, HostBinding, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { iif } from 'rxjs';
import { Student } from 'src/app/models/Student';
import { User } from 'src/app/models/User';
import { LoginService } from 'src/app/services/login.service';
import { SQLVerificatorService } from 'src/app/services/sqlverificator.service';
import { StudentsService } from 'src/app/services/students.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-studentby-month-form',
  templateUrl: './studentby-month-form.component.html',
  styleUrls: ['./studentby-month-form.component.css']
})
export class StudentbyMonthFormComponent implements OnInit {
  @HostBinding ('class') classes = 'row';
user:User=
{
    firstName:'',
    fatherLastName:'',
    motherLastName:'',
    email:'',
    phoneNumber:'',
    photoUrl:'',
    roleId:4,
    password:'12345'

}
student : Student=
{
  studentId:0,
  email:'',
  admissionDate: new Date()
};

  month : number = 0
  year:number = 0
students: any = [];


  constructor(private studentService:StudentsService, private router : Router,
    private loginService : LoginService, private userService : UsersService,
    private verificationService : SQLVerificatorService) { }

  ngOnInit(): void
  {
    var role = this.loginService.getCookie()
    if(role == '4'){
       alert("No tienes permisos para acceder a este apartado.")
      this.router.navigate(['/'])
    }

    // this.fillStudents()
  }

  listStudentbyMonth()
  {

    this.studentService.getStudentbyMonth(this.month.toString(),this.year.toString()).subscribe
    (
      
        res =>
        {
            console.log(res)
            console.log(this.student.month!)
             this.router.navigate(['/students/StudentsbyMonth/'+this.month! + '/'+ this.year!])
        },
        err =>{
          alert("Estudiante(s) no registrados")
        }
    )
  }

}
