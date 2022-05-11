import { Component, HostBinding, OnInit } from '@angular/core';
import { CoordinatorsService } from 'src/app/services/coordinators.service';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';
import { UsersService } from 'src/app/services/users.service';

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
    private loginService : LoginService, private userService : UsersService) 
  {

  }

  ngOnInit(): void
  {
    var role = this.loginService.getCookie()
    if(role == '1'){
      this.listCoordinators();
      this.filluser;
    }
    else{
      alert("No tienes permisos para acceder a este apartado.")
      this.router.navigate(['/'])
    }
  }

  deleteCoordinator(userId:string)
  {
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

}
