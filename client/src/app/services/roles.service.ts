import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Role } from '../models/Role';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RolesService {

  constructor(private http:HttpClient) 
  {

  }

  getRoles()
  {
    return this.http.get('http://localhost:5000/api/roles')
  }

  getRole(RoleId:string)
  {
    return this.http.get('http://localhost:5000/api/roles/'+RoleId);
  }

  saveRole(role : Role)
   {
    return this.http.post('http://localhost:5000/api/roles/',role);
   }

   deleteRole(roleId : string)
   {
    return this.http.delete('http://localhost:5000/api/roles/'+ roleId);
   }

   updateRole(roleId:string | number, role:Role):Observable<Role>
   {
     return this.http.put('http://localhost:5000/api/roles/'+roleId,role);
   }
}
