import { Component, HostBinding, OnInit } from '@angular/core';
import { Router, ActivatedRoute} from '@angular/router';
import { Permission } from 'src/app/models/Permission';
import {Program} from 'src/app/models/Program';
import { LoginService } from 'src/app/services/login.service';
import { PermissionsService } from 'src/app/services/permissions.service';
import { ProgramsService } from 'src/app/services/programs.service';
import { SQLVerificatorService } from 'src/app/services/sqlverificator.service';

@Component({
  selector: 'app-programs-form',
  templateUrl: './programs-form.component.html',
  styleUrls: ['./programs-form.component.css']
})
export class ProgramsFormComponent implements OnInit {
  @HostBinding('class') classes='row';
  program:Program=
  {
    programId:'',
    program:''
  }
  edit:boolean=false;
  rows:any=[];
  permissionFlag : boolean = false;

  constructor(private router:Router,
    private activatedRoute:ActivatedRoute, 
    private programService:ProgramsService,
    private loginService : LoginService,
    private verificationService : SQLVerificatorService,
    private permissionService : PermissionsService) { }

  ngOnInit(): void {
      const params=this.activatedRoute.snapshot.params;
      //console.log(params);
      if(params['programId'])
      {
        this.programService.getProgram(params['programId']).subscribe
        (
          res => 
          {
            console.log(res)
            this.program=res;
            this.edit=true;
          },
          err => console.error(err)
        )
      }
      this.programService.getPrograms().subscribe(p=>{this.rows=p})
    
    }


    validateProgram(){
      let flag=true;
      
        console.log(this.rows);
        for(let i=0; i<this.rows.length;i++)
        {
          if(this.rows[i]["program"]==this.program.program)
          {
            alert('El programa ya existe');
            flag=false;
            break;
          }
        }
  
        if(flag)
        {
          if(this.edit)
          {
           this.updateProgram();
          }
          else
          {
            this.saveNewProgram();
          }
        }
    }
  
    saveNewProgram()
    {
      let permissions : Permission;
      let role = this.loginService.getCookie();

      this.permissionService.getPermission(role).subscribe(
        res =>{
          permissions = res;

          if(!permissions.programsC){
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
        this.program.program = this.verificationService.VerifyInjection(this.program.program!)

        if(this.program.program != ''){
          delete this.program.programId;
          this.programService.saveProgram(this.program).subscribe(
            res =>{
              console.log(res);
              this.router.navigate(['/programs']);
            },
            err => console.error(err)
          );
        }
        else{
          alert("Por favor completa todos los registros.")
        }
      }
    
    }
  
    updateProgram(){
      let permissions : Permission;
      let role = this.loginService.getCookie();

      this.permissionService.getPermission(role).subscribe(
        res =>{
          permissions = res;

          if(!permissions.programsU){
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
        this.programService.updateProgram(this.program.programId!,this.program).subscribe(
          res =>{
            console.log(res);
            this.router.navigate(['/programs']);
          },
          err => console.error(err)
        );
      }
      
    }
  }
