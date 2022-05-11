import { Component, HostBinding, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';
import { UsersService } from 'src/app/services/users.service';
import {TeachersService} from '../../services/teachers.service';

@Component({
  selector: 'app-teachers-list',
  templateUrl: './teachers-list.component.html',
  styleUrls: ['./teachers-list.component.css']
})
export class TeachersListComponent implements OnInit {

  @HostBinding('class') classes='row';
  
  teachers:any=[];
  teacher : any;
  users : any = [];

  constructor(private teacherService:TeachersService, private loginService : LoginService, private router : Router,
    private userService : UsersService) 
  { 

  }

  ngOnInit(): void 
  {
    var role = this.loginService.getCookie()
    if(role == '1'){
      this.listTeachers()
    }
    else{
      alert("No tienes permisos para acceder a este apartado.")
      this.router.navigate(['/'])
    }
    
  }

  deleteTeacher(userId:string)
  {
    this.userService.deleteUser(userId).subscribe(
      res =>
      {
        console.log(res);
        this.router.navigate(['/teachers'])
        
      },
      err => console.error(err)
    )
  }

  
  listTeachers(){
    this.teacherService.getTeachers().subscribe(
      res => this.teachers=res,
      err => console.error(err)
    );
  }
  
}
