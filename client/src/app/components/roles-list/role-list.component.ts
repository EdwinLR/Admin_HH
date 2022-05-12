import { Component, OnInit,HostBinding} from '@angular/core';
import { Router } from '@angular/router';
import { RolesService } from 'src/app/services/roles.service';

@Component({
  selector: 'app-roles-list',
  templateUrl: './role-list.component.html',
  styleUrls: ['./role-list.component.css']
})
export class RoleListComponent implements OnInit {

  @HostBinding('class') classes = 'row';
  roles: any = {};
  constructor(private roleService:RolesService, private router : Router) 
  {

   }

  ngOnInit(): void 
  {
    this.listRoles();
  }

  listRoles()
  {
    this.roleService.getRoles().subscribe(res=> this.roles=res,
      err=>console.error(err))
  }

  deleteRole(roleId:string)
  {
    this.roleService.deleteRole(roleId).subscribe
    (
      res=>{
        console.log(res),
        this.listRoles()
      },
      err=>console.error(err)
      )
      }

}
