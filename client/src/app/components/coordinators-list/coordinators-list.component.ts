import { Component, HostBinding, OnInit } from '@angular/core';
import { CoordinatorsService } from 'src/app/services/coordinators.service';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';
import { UsersService } from 'src/app/services/users.service';
import { ScreensService } from 'src/app/services/screens.service';
import { Screen } from 'src/app/models/Screen';
import { PermissionsService } from 'src/app/services/permissions.service';
import { Permission } from 'src/app/models/Permission';

@Component({
  selector: 'app-coordinators-list',
  templateUrl: './coordinators-list.component.html',
  styleUrls: ['./coordinators-list.component.css']
})
export class CoordinatorsListComponent implements OnInit {
  @HostBinding('class') classes = 'row';

  roles : any= [];
  coordinators:any=[];
  coordinator : any;
  users : any = [];

  constructor(private coordiantorService: CoordinatorsService, private router : Router,
    private loginService : LoginService, private userService : UsersService, 
    private screenService : ScreensService, private permissionService : PermissionsService) 
  {

  }

  ngOnInit(): void
  {
    this.listCoordinators();
    this.filluser;

    this.verifyAccess();
  }

  deleteCoordinator(userId:string)
  {
    let permissions : Permission;
    let role = this.loginService.getCookie();

    this.permissionService.getPermission(role).subscribe(
      res =>{
        permissions = res;

        if(!permissions.coordinatorsD){
          alert("No tienes permisos para realizar esta acción.");
            this.router.navigate(['/coordinators'])
        }
      },
      err => console.error(err)
    )
    
    this.userService.deleteUser(userId).subscribe(
      res =>
      {
        console.log(res);
        this.ngOnInit()
        
      },
      err => console.error(err)
    )
  }

  listCoordinators()
  {
    this.coordiantorService.getCoordinators().subscribe(
      res => this.coordinators=res,
      err => console.error(err)
    );
  }

  filluser()
  {
    this.userService.getUsers().
    subscribe(
      res => {
        this.users = res;
        console.log(res)
      },
      err => console.error(err)
    )
  }

  verifyAccess(){
    let screenPermissions : Screen;
    let role = this.loginService.getCookie();

    console.log(role)
    this.screenService.getScreen(role).subscribe
      (
        res => 
        {
          screenPermissions = res;

          if(!screenPermissions.coordinators){
            alert("No tienes permisos para acceder a este apartado.");
            this.router.navigate(['/'])
          }
        },
        err => console.error(err)
      );
  }

}
