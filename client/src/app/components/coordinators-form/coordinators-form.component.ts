import { Component, OnInit, Inject, LOCALE_ID, HostBinding } from '@angular/core';
import { CoordinatorsService } from 'src/app/services/coordinators.service';
import { Coordinator } from 'src/app/models/Coordinator';
import { ActivatedRoute,Router } from '@angular/router';
import { formatDate } from '@angular/common';
import { User } from 'src/app/models/User';
import { UsersService } from 'src/app/services/users.service';
import { LoginService } from 'src/app/services/login.service';
import { SQLVerificatorService } from 'src/app/services/sqlverificator.service';

@Component({
  selector: 'app-coordinators-form',
  templateUrl: './coordinators-form.component.html',
  styleUrls: ['./coordinators-form.component.css']
})
export class CoordinatorsFormComponent implements OnInit {
@HostBinding ('class') classes = 'row';
user:User=
{
  firstName: '',
  fatherLastName:'',
  motherLastName:'',
  email:'',
  phoneNumber:'',
  photoUrl:'',
  roleId:1,
  password:'12345'
}
coordinator : Coordinator=
{
  coordinatorId:0,
  hiringDate: new Date(),
  rfc:'',
};
edit:boolean=false;

users : any = [];
register : any = [];
exists : boolean = false;
createdUser:any=[];
dateString : any;

  constructor(private coordinatorsService:CoordinatorsService, 
    private usersService:UsersService, private router:Router,
    private activatedRoute:ActivatedRoute, private loginService : LoginService,
    @Inject(LOCALE_ID) private locale:string, private verificationService : SQLVerificatorService) 
  {

  }

  ngOnInit(): void 
  {
    var role = this.loginService.getCookie()
    if(role == '1'){
      const params=this.activatedRoute.snapshot.params;
      console.log(params['coordinatorId'])
      if(params['coordinatorId'])
      {
        this.coordinatorsService.getCoordinator(params['coordinatorId']).subscribe
        (
          res => 
          {
            console.log(res)
            this.coordinator=res;
            this.edit=true;

            this.dateString = formatDate(this.coordinator.hiringDate!, 'yyyy-MM-dd', this.locale)
            console.log(this.dateString)
          },
          err => console.error(err)
        );
      }
      this.filluser();
    }
    else{
      alert("No tienes permisos para acceder a este apartado.")
      this.router.navigate(['/'])
    }
  }

  saveNewCoordinator()
  {
    this.user.email = this.verificationService.VerifyInjection(this.user.email!)
    this.user.fatherLastName = this.verificationService.VerifyInjection(this.user.fatherLastName!)
    this.user.firstName = this.verificationService.VerifyInjection(this.user.firstName!)
    this.user.motherLastName = this.verificationService.VerifyInjection(this.user.motherLastName!)
    this.user.phoneNumber = this.verificationService.VerifyInjection(this.user.phoneNumber!)

    this.coordinator.rfc = this.verificationService.VerifyInjection(this.coordinator.rfc!)

    if(this.user.email != '' && this.user.fatherLastName != '' && this.user.firstName != '' && 
    this.user.motherLastName != '' && this.user.phoneNumber != '' && this.coordinator.rfc != ''){
      console.log(this.coordinator);
    
      for (let i = 0; i < this.register.length; i++) {
        if (this.register[i].email == this.user.email) {
          this.exists = true;
          break;
        }
        else{
          this.exists = false;
        }
      }
  
      if(!this.exists){
        delete this.coordinator.coordinatorId;

        if(this.user.photoUrl == ''){
          this.user.photoUrl = '/assets/NoImage.jpg'
        }
        this.usersService.saveUser(this.user).subscribe(res => {
          console.log(res);
        },
        err => console.error(err))

        this.createdUser=this.usersService.getUser(this.user.email!).subscribe()
        this.coordinator.userId=this.createdUser[0]["userId"];
        
        this.coordinatorsService.saveCoordinator(this.coordinator).subscribe(
          res => {
            console.log(res);
          },
          err => console.error(err)
        );
        
      }
      else{
        alert("No puedes registrar un nuevo usuario con ese correo.")
      }
    }
    else{
      alert("Por favor completa todos los registros.")
    }
  }
  

  updateCoordinator(){
    //console.log(this.teacher);
    //! -->Utilizado cuando se pueden esperar distintos tipos de un dato
  
    this.coordinatorsService.updateCoordinator(this.coordinator.coordinatorId!,this.coordinator).subscribe(
      res =>{
        console.log(res);
        this.router.navigate(['/coordinators']);
      },
      err => console.error(err)
    );
  }

  filluser()
  {
    this.usersService.getUsers().
    subscribe(
      res => {
        this.register = res;
        console.log(res)
      },
      err => console.error(err)
    )
  }

}
