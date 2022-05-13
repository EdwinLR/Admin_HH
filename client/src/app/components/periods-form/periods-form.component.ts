import { Component, HostBinding, OnInit } from '@angular/core';
import { Router, ActivatedRoute} from '@angular/router';
import {Period} from 'src/app/models/Period';
import { Permission } from 'src/app/models/Permission';
import { LoginService } from 'src/app/services/login.service';
import { PeriodsService } from 'src/app/services/periods.service';
import { PermissionsService } from 'src/app/services/permissions.service';
import { SQLVerificatorService } from 'src/app/services/sqlverificator.service';

@Component({
  selector: 'app-periods-form',
  templateUrl: './periods-form.component.html',
  styleUrls: ['./periods-form.component.css']
})
export class PeriodsFormComponent implements OnInit {
  @HostBinding('class') classes='row';
  period:Period=
  {
    periodId:'',
    period:''
  }
  edit:boolean=false;
  rows:any=[];
  permissionFlag : boolean = false;

  constructor(private router:Router,
    private activatedRoute:ActivatedRoute, 
    private periodService:PeriodsService,
    private loginService : LoginService,
    private verificationService : SQLVerificatorService,
    private permissionService : PermissionsService) { }

    ngOnInit(): void {
      const params=this.activatedRoute.snapshot.params;
      //console.log(params);
      if(params['periodId'])
      {
        this.periodService.getPeriod(params['periodId']).subscribe
        (
          res => 
          {
            console.log(res)
            this.period=res;
            this.edit=true;
          },
          err => console.error(err)
        )
      }
      this.periodService.getPeriods().subscribe(p=>{this.rows=p})
    }
  
    validatePeriod(){
      let flag=true;
      
        console.log(this.rows);
        for(let i=0; i<this.rows.length;i++)
        {
          if(this.rows[i]["period"]==this.period.period)
          {
            alert('El periodo ya existe');
            flag=false;
            break;
          }
        }
  
        if(flag)
        {
          if(this.edit)
          {
           this.updatePeriod();
          }
          else
          {
            this.saveNewPeriod();
          }
        }
    }

    saveNewPeriod()
    {
      let permissions : Permission;
      let role = this.loginService.getCookie();

      this.permissionService.getPermission(role).subscribe(
        res =>{
          permissions = res;

          if(!permissions.periodsC){
            alert("No tienes permisos para realizar esta acción.");
              this.router.navigate(['/periods'])
          }
          else{
            this.permissionFlag = true;
          }
        },
        err => console.error(err)
      )

      if(this.permissionFlag){
        this.period.period = this.verificationService.VerifyInjection(this.period.period!)
        
        if(this.period.period != ''){
          delete this.period.periodId;
      
          this.periodService.savePeriod(this.period).subscribe(
            res =>{
              console.log(res);
              this.router.navigate(['/periods']);
            },
            err => console.error(err)
          );
        }
        else{
          alert("Por favor completa todos los registros.")
        }
      }
      
    }
  
    updatePeriod(){
      let permissions : Permission;
      let role = this.loginService.getCookie();

      this.permissionService.getPermission(role).subscribe(
        res =>{
          permissions = res;

          if(!permissions.periodsU){
            alert("No tienes permisos para realizar esta acción.");
              this.router.navigate(['/periods'])
          }
          else{
            this.permissionFlag = true;
          }
        },
        err => console.error(err)
      )

      if(this.permissionFlag){
        this.periodService.updatePeriod(this.period.periodId!,this.period).subscribe(
          res =>{
            console.log(res);
            this.router.navigate(['/periods']);
          },
          err => console.error(err)
        );
      }
      
    }
  }
