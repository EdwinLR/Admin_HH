import { Component, OnInit,HostBinding} from '@angular/core';
import { Router } from '@angular/router';
import { Permission } from 'src/app/models/Permission';
import { LoginService } from 'src/app/services/login.service';
import { PermissionsService } from 'src/app/services/permissions.service';
import { RolesService } from 'src/app/services/roles.service';

@Component({
  selector: 'app-roles-list',
  templateUrl: './role-list.component.html',
  styleUrls: ['./role-list.component.css']
})
export class RoleListComponent implements OnInit {

  @HostBinding('class') classes = 'row';
  roles: any = {};
  constructor(private roleService:RolesService, private router : Router, 
   private loginService : LoginService, private permissionService : PermissionsService) 
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
    let permissions : Permission;
    let role = this.loginService.getCookie();

    this.permissionService.getPermission(role).subscribe(
      res =>{
        permissions = res;

        if(!permissions.rolesD){
          alert("No tienes permisos para realizar esta acción.");
            this.router.navigate(['/roles'])
        }
      },
      err => console.error(err)
    )
    
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
