import { Component, OnInit, Inject, LOCALE_ID, HostBinding } from '@angular/core';
import { StudentsService } from 'src/app/services/students.service';
import { Student } from 'src/app/models/Student';
import { ActivatedRoute, Router } from '@angular/router';
import { formatDate } from '@angular/common';
import { User } from 'src/app/models/User';
import { UsersService } from 'src/app/services/users.service';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-students-form',
  templateUrl: './students-form.component.html',
  styleUrls: ['./students-form.component.css']
})
export class StudentsFormComponent implements OnInit {
@HostBinding ('class') classes = 'row';
user:User=
{
    firstName:'',
    fatherLastName:'',
    motherLastName:'',
    email:'',
    phoneNumber:'',
    photoUrl:'',
  roleId:1,
  password:'12345'

}
student : Student=
{
  studentId:0,
  admissionDate: new Date(),

};
edit:boolean = false;

users : any = [];
register : any = [];
email : any = null;
exists : boolean = false;
createdUser:any=[];

dateString : any;

  constructor(private studentsService : StudentsService,private usersService:UsersService, 
    private router:Router, private activatedRoute: ActivatedRoute, private loginService : LoginService,
    @Inject(LOCALE_ID) private locale:string) 
  {

  }

  ngOnInit(): void 
  {
    var role = this.loginService.getCookie()
    if(role == '1' || role == '2'){
      const params = this.activatedRoute.snapshot.params;
      console.log(params)
      if(params['studentId']) 
      {
        this.studentsService.getStudent(params['studentId']).subscribe
        (
          res => 
          {
            console.log(res); 
            this.student=res;
            this.edit=true;

            this.dateString = formatDate(this.student.admissionDate!, 'yyyy-MM-dd', this.locale)
            console.log(this.dateString)
          },
          err =>console.error(err)
        );
      }

      this.filluser();
    }
    else{
      alert("No tienes permisos para acceder a este apartado.")
      this.router.navigate(['/'])
    }
    
   }

   saveNewStudent()
  {
    if(this.user.email != '' && this.user.fatherLastName != '' && this.user.firstName != '' && 
      this.user.motherLastName != '' && this.user.phoneNumber != ''){
      console.log(this.student);
    
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
        delete this.student.studentId;

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
  
          this.createdUser=this.usersService.getUser(this.user.email!).subscribe()
          this.student.userId=this.createdUser[0]["userId"];
          
          this.studentsService.saveStudent(this.student).subscribe(
            res => {
              console.log(res);
              this.router.navigate(['/students']);
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

  updateStudent()
  {
   console.log(this.student);
    this.studentsService.updateStudent(this.student.studentId!,this.student).subscribe
    (
    res => 
    {
      console.log(res); 
    this.router.navigate(['/students'])
     },
    err =>console.error(err)
    );
    
  }

  filluser()
  {
    this.usersService.getUsers().subscribe(
      res => {
        this.register = res;
        console.log(res)
      },
      err => console.error(err)
    )
  }


 }

