import { Component, HostBinding, Inject, LOCALE_ID, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Course } from 'src/app/models/Course';
import { CoursesService } from 'src/app/services/courses.service';
import { SchedulesService } from 'src/app/services/schedules.service';
import { FrequenciesService } from 'src/app/services/frequencies.service';
import { TeachersService } from 'src/app/services/teachers.service';
import { ProgramsService } from 'src/app/services/programs.service';
import { PeriodsService } from 'src/app/services/periods.service';
import { formatDate } from '@angular/common';
import { LoginService } from 'src/app/services/login.service';
import { SQLVerificatorService } from 'src/app/services/sqlverificator.service';
import { PermissionsService } from 'src/app/services/permissions.service';
import { Permission } from 'src/app/models/Permission';

@Component({
  selector: 'app-courses-form',
  templateUrl: './courses-form.component.html',
  styleUrls: ['./courses-form.component.css']
})

export class CoursesFormComponent implements OnInit 
{
  @HostBinding('class') classes='row';
  course:Course=
  {
    crn:'',
    courseName:'',
    scheduleId:'',
    frequencyId:'',
    periodId:'',
    programId:'',
    startingDate:new Date(),
    teacherId:''
  };

  edit:boolean=false;
  crn:any;
  schedules:any=[];
  frequencies:any=[];
  teachers:any=[];
  programs:any=[];
  periods:any=[];
  dateString:any;
  
  constructor(private coursesService:CoursesService,
    private router:Router,
    private activatedRoute:ActivatedRoute,
    private schedulesService:SchedulesService,
    private frequenciesService:FrequenciesService,
    private teachersService:TeachersService,
    private programsService:ProgramsService,
    private periodsService:PeriodsService,
    private loginService : LoginService,
    @Inject(LOCALE_ID) private locale:string,
    private verificationService : SQLVerificatorService,
    private permissionService : PermissionsService) { }

  ngOnInit(): void {
    this.schedules=this.schedulesService.getSchedules().subscribe(s=>{this.schedules=s});
    this.frequencies=this.frequenciesService.getFrequencies().subscribe(f=>{this.frequencies=f});
    this.teachers=this.teachersService.getTeachers().subscribe(t=>{this.teachers=t})
    this.programs=this.programsService.getPrograms().subscribe(p=>{this.programs=p})
    this.periods=this.periodsService.getPeriods().subscribe(p=>{this.periods=p})
    
    const params=this.activatedRoute.snapshot.params;
    console.log(params)
    this.crn = params['id'];

    if(this.crn)
    {
      this.coursesService.getCourse(this.crn).subscribe
      (
        res => 
        {
          console.log(res)
          this.course=res;
          this.edit=true;
          
          this.dateString = formatDate(this.course.startingDate!, 'yyyy-MM-dd', this.locale)
          console.log(this.dateString);
        },
        err => console.error(err)
      )
    }
  }

  saveNewCourse()
  {
    let permissions : Permission;
    let role = this.loginService.getCookie();

    this.permissionService.getPermission(role).subscribe(
      res =>{
        permissions = res;

        if(!permissions.coursesC){
          alert("No tienes permisos para realizar esta acción.");
            this.router.navigate(['/courses'])
        }
      },
      err => console.error(err)
    )

    this.course.courseName = this.verificationService.VerifyInjection(this.course.courseName!)

    if(this.course.courseName != '' && this.course.frequencyId != '' && this.course.periodId != '' && 
    this.course.programId != '' && this.course.scheduleId != '' && this.course.teacherId != ''){
      this.coursesService.saveCourse(this.course).subscribe(
        res =>{
          console.log(this.course)
          console.log(res);
          this.router.navigate(['/courses']);
        },
        err => console.error(err)
      );
    }
    else{
      alert("Por favor completa todos los registros.")
    }
  }

  updateCourse(){
    let permissions : Permission;
    let role = this.loginService.getCookie();

    this.permissionService.getPermission(role).subscribe(
      res =>{
        permissions = res;

        if(!permissions.coursesU){
          alert("No tienes permisos para realizar esta acción.");
            this.router.navigate(['/courses'])
        }
      },
      err => console.error(err)
    )

    this.coursesService.updateCourse(this.course.crn!,this.course).subscribe(
      res =>{
        console.log(res);
        this.router.navigate(['/courses']);
      },
      err => console.error(err)
    );
  }

}

