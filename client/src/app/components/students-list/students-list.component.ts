import { Component, OnInit,HostBinding } from '@angular/core';
import { StudentsService } from 'src/app/services/students.service';
import { Student } from 'src/app/models/Student';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-students-list',
  templateUrl: './students-list.component.html',
  styleUrls: ['./students-list.component.css']
})
export class StudentsListComponent implements OnInit {
  @HostBinding('class') classes = 'row';

  students : any = [];
  student : any;
  roles : any = [];
  users : any = [];

  constructor(private studentService:StudentsService, private router : Router,
    private loginService : LoginService, private userService : UsersService) { }

  ngOnInit(): void
  {
    var role = this.loginService.getCookie()
    if(role == '1' || role == '2'){
      this.listStudents();
    }
    else{
      alert("No tienes permisos para acceder a este apartado.")
      this.router.navigate(['/'])
    }
  }

  deleteStudent(userId:string)
  {
    this.userService.deleteUser(userId).subscribe(
      res =>
      {
        console.log(res);
        this.ngOnInit()
        
      },
      err => console.error(err)
    )
  }

  listStudents()
  {
    this.studentService.getStudents().subscribe(
      res=> this.students=res,
      err=> console.error(err)
    );
  }

}
