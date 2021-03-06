import { Component, HostBinding, OnInit } from '@angular/core';
import { Router, ActivatedRoute} from '@angular/router';
import { Frequency } from 'src/app/models/Frequency';
import { Permission } from 'src/app/models/Permission';
import { FrequenciesService } from 'src/app/services/frequencies.service';
import { LoginService } from 'src/app/services/login.service';
import { PermissionsService } from 'src/app/services/permissions.service';
import { SQLVerificatorService } from 'src/app/services/sqlverificator.service';

@Component({
  selector: 'app-frequencies-form',
  templateUrl: './frequencies-form.component.html',
  styleUrls: ['./frequencies-form.component.css']
})
export class FrequenciesFormComponent implements OnInit {

  @HostBinding('class') classes='row';
  frequency:Frequency=
  {
    frequencyId:'',
    frequency:''
  }
  edit:boolean=false;
  rows:any=[];
  permissionFlag : boolean = false;

  constructor(private frequenciesService:FrequenciesService, 
    private router:Router,
    private activatedRoute:ActivatedRoute,
    private loginService : LoginService,
    private verificationService : SQLVerificatorService,
    private permissionService : PermissionsService) { }

  ngOnInit(): void {
    const params=this.activatedRoute.snapshot.params;
    //console.log(params);
    if(params['frequencyId'])
    {
      this.frequenciesService.getFrequency(params['frequencyId']).subscribe
      (
        res => 
        {
          console.log(res)
          this.frequency=res;
          this.edit=true;
        },
        err => console.error(err)
      )
    }
    this.frequenciesService.getFrequencies().subscribe(f=>{this.rows=f})
    
  }

  validateFrequency(){
    let flag=true;
    
      console.log(this.rows);
      for(let i=0; i<this.rows.length;i++)
      {
        if(this.rows[i]["frequency"]==this.frequency.frequency)
        {
          alert('La frequencia ya existe');
          flag=false;
          break;
        }
      }

      if(flag)
      {
        if(this.edit)
        {
         this.updateFrequency();
        }
        else
        {
          this.saveNewFrequency();
        }
      }
  }

  saveNewFrequency()
  {
    let permissions : Permission;
    let role = this.loginService.getCookie();

    this.permissionService.getPermission(role).subscribe(
      res =>{
        permissions = res;
        console.log(permissions!)

        if(!permissions.frequenciesC){
          alert("No tienes permisos para realizar esta acci??n.");
          this.router.navigate(['/frequencies'])
        }
        else{
          this.permissionFlag = true;
        }
      },
      err => console.error(err)
    );
    
    if(this.permissionFlag){
        this.frequency.frequency = this.verificationService.VerifyInjection(this.frequency.frequency!)

      if(this.frequency.frequency != ''){
          delete this.frequency.frequencyId;

        this.frequenciesService.saveFrequency(this.frequency).subscribe(
          res =>{
            console.log(res);
            this.router.navigate(['/frequencies']);
          },
          err => console.error(err)
        );
      }
      else{
        alert("Por favor completa todos los registros.")
      }
    }
    
  }

  updateFrequency(){
    let permissions : Permission;
    let role = this.loginService.getCookie();

    this.permissionService.getPermission(role).subscribe(
      res =>{
        permissions = res;

        if(!permissions.frequenciesU){
          alert("No tienes permisos para realizar esta acci??n.");
          this.router.navigate(['/frequencies'])
        }
        else{
          this.permissionFlag = true;
        }
      },
      err => console.error(err)
    )

    if(this.permissionFlag){
      this.frequenciesService.updateFrequency(this.frequency.frequencyId!,this.frequency).subscribe(
        res =>{
          console.log(res);
          this.router.navigate(['/frequencies']);
        },
        err => console.error(err)
      );
    }
    
  }

}