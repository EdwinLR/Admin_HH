import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Student } from 'src/app/models/Student';
import { User } from 'src/app/models/User';
import { LoginService } from 'src/app/services/login.service';
import { StudentsService } from 'src/app/services/students.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-studentby-month-list',
  templateUrl: './studentby-month-list.component.html',
  styleUrls: ['./studentby-month-list.component.css']
})
export class StudentbyMonthListComponent implements OnInit {

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

studentsbyMonth: any = [];


  constructor(private studentServices: StudentsService, private router : Router,
    private loginService : LoginService, private userService : UsersService, private activatedRoute:ActivatedRoute) { }

  ngOnInit(): void 
  {
    const params=this.activatedRoute.snapshot.params;
    this.month=params['month']
    this.year=params['year']
    
    var role = this.loginService.getCookie()
    if(role == '1' || role == '2'){
      this.getStudentsbyMonth();
    }
    else{
      alert("No tienes permisos para acceder a este apartado.")
      this.router.navigate(['/'])
    }
  }

  getStudentsbyMonth()
  {
    this.studentServices.getStudentbyMonth(this.month.toString(),this.year.toString()).subscribe
    (
      res =>
      {
        this.studentsbyMonth = res
      }

    )
  }

}
