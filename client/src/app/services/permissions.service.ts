import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Permission } from '../models/Permission';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PermissionsService {

  constructor(private http:HttpClient) 
  {

  }

  getPermissions()
  {
    return this.http.get('http://localhost:5000/api/permissions')
  }

  getPermission(RoleId:string)
  {
    return this.http.get('http://localhost:5000/api/permissions/'+RoleId);
  }

  savePermission(permission : Permission)
   {
    return this.http.post('http://localhost:5000/api/permissions/',permission);
   }

   deletePermission(RoleId : string)
   {
    return this.http.delete('http://localhost:5000/api/permissions/'+ RoleId);
   }

   updatePermission(RoleId:string | number, permission:Permission):Observable<Permission>
   {
     return this.http.put('http://localhost:5000/api/permissions/'+RoleId,permission);
   }
}
