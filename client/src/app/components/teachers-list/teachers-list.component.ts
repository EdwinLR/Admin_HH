import { Component, HostBinding, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Permission } from 'src/app/models/Permission';
import { LoginService } from 'src/app/services/login.service';
import { PermissionsService } from 'src/app/services/permissions.service';
import { UsersService } from 'src/app/services/users.service';
import {TeachersService} from '../../services/teachers.service';
import { Screen } from 'src/app/models/Screen';
import { ScreensService } from 'src/app/services/screens.service';

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
  permissionFlag : boolean = false;

  constructor(private teacherService:TeachersService, private loginService : LoginService, private router : Router,
    private userService : UsersService, private permissionService : PermissionsService, private screenService:ScreensService) 
  { 

  }

  ngOnInit(): void 
  {
      this.listTeachers()
      this.verifyAccess();
    
  }

  deleteTeacher(userId:string)
  {
    let permissions : Permission;
    let role = this.loginService.getCookie();

    this.permissionService.getPermission(role).subscribe(
      res =>{
        permissions = res;

        if(!permissions.teachersD){
          alert("No tienes permisos para realizar esta acción.");
            this.router.navigate(['/teachers'])
        }
        else{
          this.permissionFlag = true;
        }
      },
      err => console.error(err)
    )
    
    if(this.permissionFlag){
      this.userService.deleteUser(userId).subscribe(
        res =>
        {
          console.log(res);
          this.ngOnInit()
          
        },
        err => console.error(err)
      )
    }
    
  }

  
  listTeachers(){
    this.teacherService.getTeachers().subscribe(
      res => {
        this.teachers=res
        console.log(res)
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
  
          if(!screenPermissions.students){
            alert("No tienes permisos para acceder a este apartado.");
            this.router.navigate(['/'])
          }
        },
        err => console.error(err)
      );
    }
  
}
