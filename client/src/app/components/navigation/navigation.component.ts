import { Component, HostBinding, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';
import { ScreensService } from 'src/app/services/screens.service';
import { Screen } from 'src/app/models/Screen';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {

  @HostBinding('class') classes = 'row';
  screensControl : Screen =
  {
    roleId : 0,
    coordinators : false,
    course_details : false,
    courses : false,
    frequencies : false,
    periods : false,
    permission : false,
    programs : false,
    roles : false,
    schedules : false,
    screens : false,
    students : false,
    teachers : false
  }

  roleId : any;

  constructor(private loginService : LoginService, private screenService : ScreensService) { }

  ngOnInit(): void {
    this.roleId = this.loginService.getCookie();

    window.setInterval( () =>{
      this.checkNavigation();
    }, 500);
  }

  checkNavigation() : void {

    var lastCookie = this.roleId;
    var Cookie = this.loginService.getCookie();

    if(lastCookie != Cookie){
      window.location.reload();
    }
    
    //console.log(lastCookie);

    this.screenService.getScreen(this.roleId).subscribe(
      res =>{
        this.screensControl = res;
        //console.log(res)
      },
      err => console.error(err)
    );
  }
}
