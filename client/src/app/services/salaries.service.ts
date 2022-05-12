import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Salary } from '../models/Salary';

@Injectable({
  providedIn: 'root'
})
export class SalariesService {

  constructor(private Http:HttpClient) { }

  getSalaries(teacherId:string|number)
  {
    return this.Http.get('http://localhost:5000/api/payments/'+teacherId)
  }

  saveSalary(salary:Salary)
  {
    return this.Http.post('http://localhost:5000/api/payments/',salary);
  }
}
