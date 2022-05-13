import { Component, OnInit, Inject, LOCALE_ID, HostBinding } from '@angular/core';
import { StudentsService } from 'src/app/services/students.service';
import { Student } from 'src/app/models/Student';
import { ActivatedRoute, Router } from '@angular/router';
import { formatDate } from '@angular/common';
import { User } from 'src/app/models/User';
import { UsersService } from 'src/app/services/users.service';
import { LoginService } from 'src/app/services/login.service';
import { SQLVerificatorService } from 'src/app/services/sqlverificator.service';
import { PermissionsService } from 'src/app/services/permissions.service';
import { Permission } from 'src/app/models/Permission';

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
    roleId:4,
    password:'12345'

}
student : Student=
{
  studentId:0,
  email:'',
  admissionDate: new Date()
};

edit:boolean = false;
users : any = [];
register : any = [];
email : any = null;
exists : boolean = false;
createdUser:any=[];
permissionFlag : boolean = false;
dateString : any;

  constructor(private studentsService : StudentsService,private usersService:UsersService, 
    private router:Router, private activatedRoute: ActivatedRoute, private loginService : LoginService,
    @Inject(LOCALE_ID) private locale:string,  private verificationService : SQLVerificatorService,
    private permissionService : PermissionsService) 
  {

  }

  ngOnInit(): void 
  {
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

          this.dateString = formatDate(this.student.admissionDate!, 'yyyy-MM-dd', this.locale)
          console.log(this.dateString)
        },
        err =>console.error(err)
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

   saveNewStudent()
  {
    let permissions : Permission;
    let role = this.loginService.getCookie();

    this.permissionService.getPermission(role).subscribe(
      res =>{
        permissions = res;

        if(!permissions.studentsC){
          alert("No tienes permisos para realizar esta acción.");
            this.router.navigate(['/students'])
        }
        else{
          this.permissionFlag = true;
        }
      },
      err => console.error(err)
    )
    
    if(this.permissionFlag){
      this.user.email = this.verificationService.VerifyInjection(this.user.email!)
      this.user.fatherLastName = this.verificationService.VerifyInjection(this.user.fatherLastName!)
      this.user.firstName = this.verificationService.VerifyInjection(this.user.firstName!)
      this.user.motherLastName = this.verificationService.VerifyInjection(this.user.motherLastName!)
      this.user.phoneNumber = this.verificationService.VerifyInjection(this.user.phoneNumber!)
      

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

          this.usersService.saveUser(this.user).subscribe(res => {
            console.log(res);
          },
          err => console.error(err))
          
          this.student.email=this.user.email;
          
          this.studentsService.saveStudent(this.student).subscribe(
            res => {
              console.log(res);
              this.router.navigate(["/students"]);
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
    
  } 

  updateStudent()
  {
    let permissions : Permission;
    let role = this.loginService.getCookie();

    this.permissionService.getPermission(role).subscribe(
      res =>{
        permissions = res;

        if(!permissions.studentsU){
          alert("No tienes permisos para realizar esta acción.");
            this.router.navigate(['/students'])
        }
        else{
          this.permissionFlag = true;
        }
      },
      err => console.error(err)
    )

    if(this.permissionFlag){
      this.usersService.updateUser(this.student.userId!,this.user).subscribe(
        res =>{
          console.log(res);
        },
        err => console.error(err)
      );

      this.studentsService.updateStudent(this.student.studentId!,this.student).subscribe(
        res =>{
          console.log(res);
          this.router.navigate(['/students']);
        },
        err => console.error(err)
      );
    }
    
    
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

