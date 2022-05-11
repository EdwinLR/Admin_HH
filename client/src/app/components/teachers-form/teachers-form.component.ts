import { Component, HostBinding, Inject, LOCALE_ID, OnInit } from '@angular/core';
import { Teacher } from 'src/app/models/Teacher';
import { User } from 'src/app/models/User';
import { TeachersService } from 'src/app/services/teachers.service';
import { Router, ActivatedRoute} from '@angular/router';
import { UsersService } from 'src/app/services/users.service';
import { LoginService } from 'src/app/services/login.service';
import { formatDate } from '@angular/common';
import { SQLVerificatorService } from 'src/app/services/sqlverificator.service';

@Component({
  selector: 'app-teacher-form',
  templateUrl: './teachers-form.component.html',
  styleUrls: ['./teachers-form.component.css']
})
export class TeachersFormComponent implements OnInit {
//Necesario para mostrar los divs de forma organizada
  @HostBinding('class') classes='row';
  user:User=
{
  email:'',
  firstName:'',
  fatherLastName:'',
  motherLastName:'',
  phoneNumber:'',
  photoUrl:'',
  roleId:2,
  password:'12345'
};

teacher:Teacher=
{
  teacherId:0,
  rfc:'',
  email:'',
  hiringDate:new Date
}

edit:boolean=false;

users : any = [];
register : any = [];
exists : boolean = false;
dateString : any;

  constructor(private teachersService:TeachersService, 
    private usersService:UsersService,
    private router:Router,
    private activatedRoute:ActivatedRoute,
    private loginService : LoginService,
    @Inject(LOCALE_ID) private locale:string,
    private verificationService : SQLVerificatorService)
    { 
    }

  ngOnInit(): void {
    var role = this.loginService.getCookie()
    if(role == '1'){
      const params=this.activatedRoute.snapshot.params;
      if(params['teacherId'])
      {
        this.teachersService.getTeacher(params['teacherId']).subscribe
        (
          res => 
          {
            console.log(res)
            this.teacher=res;

            this.dateString = formatDate(this.teacher.hiringDate!, 'yyyy-MM-dd', this.locale)
            console.log(this.dateString)
          },
          err => console.error(err)
        );
      }
      if(params['userId'])
      {
        this.usersService.getUser(params['userId']).subscribe
        (
          res => 
          {
            console.log(res)
            this.user=res;
            this.edit = true;
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

  saveNewTeacher()
  {
    this.user.email = this.verificationService.VerifyInjection(this.user.email!)
    this.user.fatherLastName = this.verificationService.VerifyInjection(this.user.fatherLastName!)
    this.user.firstName = this.verificationService.VerifyInjection(this.user.firstName!)
    this.user.motherLastName = this.verificationService.VerifyInjection(this.user.motherLastName!)
    this.user.phoneNumber = this.verificationService.VerifyInjection(this.user.phoneNumber!)

    let flag:boolean=false;

    if(this.user.email != '' && this.user.fatherLastName != '' && this.user.firstName != '' && 
    this.user.motherLastName != '' && this.user.phoneNumber != '' && this.teacher.rfc != ''){
      console.log(this.teacher);
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
        delete this.teacher.teacherId;

        if(this.user.photoUrl == ''){
          this.user.photoUrl = '/assets/NoImage.jpg'
        }

        if(this.user.photoUrl == ''){
          this.user.photoUrl = '/assets/NoImage.jpg'
        }
        this.usersService.saveUser(this.user).subscribe(res => {
          console.log(res);
        },
        err => console.error(err))
        
        this.teacher.email=this.user.email;
        
        this.teachersService.saveTeacher(this.teacher).subscribe(
          res => {
            console.log(res);
            this.router.navigate(["/teachers"]);
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
  

  updateTeacher(){
    console.log(this.teacher);
    
    this.usersService.updateUser(this.teacher.userId!,this.user).subscribe(
      res =>{
        console.log(res);
      },
      err => console.error(err)
    );

    this.teachersService.updateTeacher(this.teacher.teacherId!,this.teacher).subscribe(
      res =>{
        console.log(res);
        this.router.navigate(['/teachers']);
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


