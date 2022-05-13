import { Component, HostBinding, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Permission } from 'src/app/models/Permission';
import { LoginService } from 'src/app/services/login.service';
import { PermissionsService } from 'src/app/services/permissions.service';
import { ProgramsService } from 'src/app/services/programs.service';
import { Screen } from 'src/app/models/Screen';
import { ScreensService } from 'src/app/services/screens.service';

@Component({
  selector: 'app-programs-list',
  templateUrl: './programs-list.component.html',
  styleUrls: ['./programs-list.component.css']
})
export class ProgramsListComponent implements OnInit {
  @HostBinding('class') classes='row';

  programs:any=[];
  permissionFlag : boolean = false;

  constructor(private programService:ProgramsService, private router : Router,
    private loginService : LoginService, private permissionService : PermissionsService,private screensService:ScreensService) { }

  ngOnInit(): void {
    var role = this.loginService.getCookie()
    if(role == '1'){
      this.listPrograms();
    }
    else{
      alert("No tienes permisos para acceder a este apartado.")
      this.router.navigate(['/'])
    }
  }

  listPrograms(){
    this.programService.getPrograms().subscribe(
      res => this.programs=res,
      err => console.error(err)
    );
  }

  deleteProgram(program:string)
  {
    let permissions : Permission;
    let role = this.loginService.getCookie();

    this.permissionService.getPermission(role).subscribe(
      res =>{
        permissions = res;

        if(!permissions.programsD){
          alert("No tienes permisos para realizar esta acción.");
            this.router.navigate(['/programs'])
        }
        else{
          this.permissionFlag = true;
        }
      },
      err => console.error(err)
    )
    
    if(this.permissionFlag){
      this.programService.deleteProgram(program).subscribe
      (
        res =>
        {
          console.log(res);
          this.listPrograms();
        },
        err => console.error(err)
      );
    }
   
  }

  verifyAccess(){
    let screenPermissions : Screen;
    let role = this.loginService.getCookie();
  
    console.log(role)
    this.screensService.getScreen(role).subscribe
      (
        res => 
        {
          screenPermissions = res;
  
          if(!screenPermissions.programs){
            alert("No tienes permisos para acceder a este apartado.");
            this.router.navigate(['/'])
          }
        },
        err => console.error(err)
      );
    }


}
