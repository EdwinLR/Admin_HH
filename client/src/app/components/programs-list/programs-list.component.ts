import { Component, HostBinding, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Permission } from 'src/app/models/Permission';
import { LoginService } from 'src/app/services/login.service';
import { PermissionsService } from 'src/app/services/permissions.service';
import { ProgramsService } from 'src/app/services/programs.service';

@Component({
  selector: 'app-programs-list',
  templateUrl: './programs-list.component.html',
  styleUrls: ['./programs-list.component.css']
})
export class ProgramsListComponent implements OnInit {
  @HostBinding('class') classes='row';
  programs:any=[];

  constructor(private programService:ProgramsService, private router : Router,
    private loginService : LoginService, private permissionService : PermissionsService) { }

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
      },
      err => console.error(err)
    )
    
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
