import { Component, OnInit,HostBinding } from '@angular/core';
import { StudentsService } from 'src/app/services/students.service';
import { Student } from 'src/app/models/Student';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';
import { UsersService } from 'src/app/services/users.service';
import { PermissionsService } from 'src/app/services/permissions.service';
import { Permission } from 'src/app/models/Permission';
import { ScreensService } from 'src/app/services/screens.service';
import { Screen } from 'src/app/models/Screen';

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
  permissionFlag : boolean = false;

  constructor(private studentService:StudentsService, private router : Router,
    private loginService : LoginService, private userService : UsersService,
    private permissionService : PermissionsService, private screenService:ScreensService) { }

  ngOnInit(): void
  {
      this.listStudents();
      this.verifyAccess();
  }

  deleteStudent(userId:string)
  {
    let permissions : Permission;
    let role = this.loginService.getCookie();

    this.permissionService.getPermission(role).subscribe(
      res =>{
        permissions = res;

        if(!permissions.studentsD){
          alert("No tienes permisos para realizar esta acción.");
            this.router.navigate(['/students'])
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

  listStudents()
  {
    this.studentService.getStudents().subscribe(
      res=> this.students=res,
      err=> console.error(err)
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
