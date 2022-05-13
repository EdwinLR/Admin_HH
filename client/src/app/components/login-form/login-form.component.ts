import { Component, OnInit,HostBinding } from '@angular/core';
import { Login } from 'src/app/models/Login';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';
import { SQLVerificatorService } from 'src/app/services/sqlverificator.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {
  @HostBinding('class') classes = 'row';
  login : Login =
  {
    email : '',
    password : '',
    roleId : 0
  }
  users : any = [];
  user : any;
  exists : boolean = false;

  constructor(private router: Router, private loginService : LoginService, 
    private verificatorService : SQLVerificatorService) 
  {

  }

  ngOnInit(): void 
  {
  }

  Login()
  {
    this.login.email = this.verificatorService.VerifyInjection(this.login.email!)
    this.login.password = this.verificatorService.VerifyInjection(this.login.password!)

    this.login.email = this.login.email!.trim();

    this.loginService.login(this.login.email!).subscribe(
      res => {
        console.log(res);
        this.users = res;
        for (let i = 0; i < this.users.length; i++) {
          if (this.users[i].email == this.login.email) {
            this.exists = true;
            this.user = this.users[i];
            break;
          }
          else{
            this.exists = false;
          }
        }

        console.log(this.user);

        if(this.exists){
          if (this.user.password == this.login.password){

            console.log(this.user.roleId)
            this.loginService.setCookie(this.user.roleId, this.user.email);

            this.router.navigate(['/'])
            //alert("Login correcto!");
          }
          else{
            alert("Usuario o contraseña incorrecta.");
          }
        }
        else{
          alert("El Usuario no existe.");
        }
      },
      err =>console.error(err)
      );
  }

}
