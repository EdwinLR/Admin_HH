import { formatDate } from '@angular/common';
import { Component, HostBinding, Inject, LOCALE_ID, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Salary } from 'src/app/models/Salary';
import { SalariesService } from 'src/app/services/salaries.service';
import { SQLVerificatorService } from 'src/app/services/sqlverificator.service';

@Component({
  selector: 'app-salaries-form',
  templateUrl: './salaries-form.component.html',
  styleUrls: ['./salaries-form.component.css']
})
export class SalariesFormComponent implements OnInit {
  //Necesario para mostrar los divs de forma organizada
  @HostBinding('class') classes='row';

payment:Salary=
{
  teacherId:0,
  fechaPago:'',
  horasTrabajadas:0
};

iva16:number=0.0;
iva11:number=0.0;
isr:number=0.0;
total:number=0.0;
params:any
teacherId:number=0
previousPayments:any=[]
flag:boolean=false;
  dateString: any;

  constructor(private activatedRoute:ActivatedRoute, private verificationService:SQLVerificatorService, 
    @Inject(LOCALE_ID) private locale:string,
    private salariesService:SalariesService, private router:Router) { }

  ngOnInit(): void {
    this.params=this.activatedRoute.snapshot.params;
    this.teacherId=this.params['teacherId'];

    this.salariesService.getSalaries(this.teacherId).subscribe(p=>{this.previousPayments=p});
    
  }

  saveSalary():void{
    this.payment.fechaPago=new Date().toString();
    this.dateString = formatDate(this.payment.fechaPago, 'yyyy-MM-dd', this.locale)
    this.payment.fechaPago=this.dateString
    this.payment.teacherId=this.teacherId;

    if(this.verificationService.VerifyInjection(this.payment.horasTrabajadas?.toString()!)=="")
    {
      this.payment.horasTrabajadas=0
    }

    if(this.payment.horasTrabajadas!<=0)
    {
        alert("Es necesario llenar todos los campos antes de continuar.")
        this.flag=true;
    }
    else
    {
        for(let i=0; i<this.previousPayments.length;i++)
        {
          this.dateString = formatDate(this.previousPayments[i]["emissionDate"], 'yyyy-MM-dd', this.locale)
          if(this.previousPayments[i]["emissionDate"]==this.payment.fechaPago)
          {
            alert("No se pueden realizar dos nóminas en la misma fecha")
            this.flag=true;
            break;
          }
          else
            this.flag=false;
        }
    }
        if(!this.flag)
        {
          this.salariesService.saveSalary(this.payment).subscribe(res => {
            console.log(res);
            this.router.navigate(['/payments/'+this.teacherId])
          },
          err => console.error(err))
        }
      }

  calculateSalary():void
  {
    if(this.payment.horasTrabajadas!>0)
    {
      let isr=.10
      let iva11=.11

      let totalSinIva=this.payment.horasTrabajadas!*90
      let iva16=totalSinIva*.16
      let totalConIva=iva16+totalSinIva;
      this.iva16=totalConIva;
      this.isr=totalSinIva*isr;
      this.iva11=totalSinIva*iva11
      this.total=totalConIva-this.isr-this.iva11;
      this.ngOnInit();
    }
    else
    {
      alert("Introduzca una cantidad válida")
    }
  }

}
