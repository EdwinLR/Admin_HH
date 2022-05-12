import { formatDate } from '@angular/common';
import { Component, HostBinding, Inject, LOCALE_ID, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';
import { SalariesService } from 'src/app/services/salaries.service';

@Component({
  selector: 'app-salaries-list',
  templateUrl: './salaries-list.component.html',
  styleUrls: ['./salaries-list.component.css']
})

export class SalariesListComponent implements OnInit {

  @HostBinding('class') classes='row';

  payments:any=[];
  dateString : any;
  params:any;
  teacherId:number=0;
  getDate:number=new Date().getDate();

  constructor(private salaryServices:SalariesService, 
    private loginService:LoginService,
     private router:Router,
     @Inject(LOCALE_ID) private locale:string,
     private activatedRoute:ActivatedRoute) { }

  ngOnInit(): void {
    var role = this.loginService.getCookie()
    if(role == '1' || role=='2'){
      this.listPayments()
    }
    else{
      alert("No tienes permisos para acceder a este apartado.")
      this.router.navigate(['/'])
    }
  }

  listPayments() {
    this.params=this.activatedRoute.snapshot.params;
    this.salaryServices.getSalaries(this.params["teacherId"]).subscribe(
      res => {
        this.payments=res
        console.log(res)
      },
      err => console.error(err)
    );
    this.teacherId=this.params["teacherId"]
  }

}
