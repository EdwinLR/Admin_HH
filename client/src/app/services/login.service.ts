import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CookieService } from "ngx-cookie-service";

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient, private cookies : CookieService) { }

  login(email: string)
  {
    return this.http.get("http://localhost:5000/api/login/"+email);
  }

  logout(){
    this.setCookie('0','');

      var Cookie = this.getCookie();
      console.log(Cookie);
  }

  setCookie(Id: string, email:string) {
    this.cookies.set("roleId", Id);
    this.cookies.set('email',email);
  }
  getCookie() {
    return this.cookies.get("roleId");
  }

  getCookie2(){
    return this.cookies.get('email')
  }
}
