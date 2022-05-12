import { Component, HostBinding, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Student } from 'src/app/models/Student';
import { User } from 'src/app/models/User';
import { LoginService } from 'src/app/services/login.service';
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
  admissionDate: new Date(),



};
  month : number = 0
  year:number = 0
students: any = [];
exists : boolean = false;


  constructor(private studentService:StudentsService, private router : Router,
    private loginService : LoginService, private userService : UsersService) { }

  ngOnInit(): void
  {
    var role = this.loginService.getCookie()
    if(role == '1' || role == '2'){
       this.listStudentbyMonth();
    }
    else{
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
          
          console.log(this.student.month!)
          console.log(res);
          this.router.navigate(['/students/StudentsbyMonth/'+this.month! + '/'+ this.year!])
  
  
        }
    )
  }

  // fillStudents()
  // {
  //   this.studentService.getStudents().subscribe(
  //     res => {
  //       this.students = res;
  //       console.log(res)
  //     },
  //     err => console.error(err)
  //   )
  // }

}
