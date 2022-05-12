import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Screen } from '../models/Screen';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ScreensService {

  constructor(private http:HttpClient) 
  {

  }

  getScreens()
  {
    return this.http.get('http://localhost:5000/api/screens')
  }

  getScreen(RoleId:string)
  {
    return this.http.get('http://localhost:5000/api/screens/'+RoleId);
  }

  saveScreen(screen : Screen)
   {
    return this.http.post('http://localhost:5000/api/screens/',screen);
   }

   deleteScreen(RoleId : string)
   {
    return this.http.delete('http://localhost:5000/api/screens/'+ RoleId);
   }

   updateScreen(RoleId:string | number, screen:Screen):Observable<Screen>
   {
     return this.http.put('http://localhost:5000/api/screens/'+RoleId,screen);
   }
}
