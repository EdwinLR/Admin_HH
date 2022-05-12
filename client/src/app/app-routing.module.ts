import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { TeachersListComponent } from './components/teachers-list/teachers-list.component';
import { TeachersFormComponent } from './components/teachers-form/teachers-form.component'
import { SchedulesFormComponent } from './components/schedules-form/schedules-form.component';
import { SchedulesListComponent } from './components/schedules-list/schedules-list.component';
import { FrequenciesFormComponent } from './components/frequencies-form/frequencies-form.component';
import { FrequenciesListComponent } from './components/frequencies-list/frequencies-list.component';
import { PeriodsFormComponent } from './components/periods-form/periods-form.component';
import { PeriodsListComponent } from './components/periods-list/periods-list.component';
import { ProgramsFormComponent } from './components/programs-form/programs-form.component';
import { ProgramsListComponent } from './components/programs-list/programs-list.component';
import { CoursesListComponent } from './components/courses-list/courses-list.component';
import { CoursesFormComponent } from './components/courses-form/courses-form.component';
import { CourseDetailsListComponent } from './components/course-details-list/course-details-list.component';
import { CourseDetailsFormComponent } from './components/course-details-form/course-details-form.component';
import { StudentsListComponent } from './components/students-list/students-list.component';
import { StudentsFormComponent } from './components/students-form/students-form.component';
import { UsersFormComponent } from './components/users-form/users-form.component';
import { UsersListComponent } from './components/users-list/users-list.component';
import { CoordinatorsFormComponent } from './components/coordinators-form/coordinators-form.component';
import { CoordinatorsListComponent } from './components/coordinators-list/coordinators-list.component';
import { LoginFormComponent } from './components/login-form/login-form.component';
import { LogoutComponent } from './components/logout/logout.component';
import { SalariesFormComponent } from './components/salaries-form/salaries-form.component';
import { SalariesListComponent } from './components/salaries-list/salaries-list.component';
import { RoleListComponent } from './components/roles-list/role-list.component';
import { ScreenFormComponent } from './components/screens-form/screen-form.component';
import { PermissionFormComponent } from './components/permissions-form/permission-form.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
//Teachers
  {
    path:'teachers',
    component:TeachersListComponent
  },
  
  {
    path:'teachers/add',
    component:TeachersFormComponent
  },

  {
    path:'teachers/edit/:teacherId/:userId',
    component:TeachersFormComponent
  },
  {
    path:'',
    redirectTo:'/teachers',
    pathMatch:'full'
  },

//  //Schedules
  {
    path:'schedules',
    component:SchedulesListComponent
  },
  
  {
    path:'schedules/add',
    component:SchedulesFormComponent
  },

  {
    path:'schedules/edit/:scheduleId',
    component:SchedulesFormComponent
  },

   //Frequencies

  {
    path:'frequencies',
    component:FrequenciesListComponent
  },
  
  {
    path:'frequencies/add',
    component:FrequenciesFormComponent
  },

  {
    path:'frequencies/edit/:frequencyId',
    component:FrequenciesFormComponent
  },

  //Periods
  {
    path:'periods',
    component:PeriodsListComponent
  },
  
  {
    path:'periods/add',
    component:PeriodsFormComponent
  },

  {
    path:'periods/edit/:periodId',
    component:PeriodsFormComponent
  },

  //Programs
  {
    path:'programs',
    component:ProgramsListComponent
  },
  
  {
    path:'programs/add',
    component:ProgramsFormComponent
  },

  {
    path:'programs/edit/:programId',
    component:ProgramsFormComponent
  },

  //Periods
  {
    path:'periods',
    component:PeriodsListComponent
  },
  
  {
    path:'periods/add',
    component:PeriodsFormComponent
  },

  {
    path:'periods/edit/:periodId',
    component:PeriodsFormComponent
  },
  //Users
  {
    path: 'users',
    component:UsersListComponent
  },

  {
    path: 'users/add',
    component:UsersFormComponent
  },

  {
    path: 'users',
    component:UsersFormComponent
  },

  //Courses
  {
    path: 'courses',
    component: CoursesListComponent
  },
  {
    path: 'courses/add',
    component: CoursesFormComponent
  },
  {
    path: 'courses/edit/:id',
    component: CoursesFormComponent
  },
  //CourseDetails
  {
    path: 'courseDetails/:id',
    component: CourseDetailsListComponent
  },
  {
    path: 'courseDetails/add/:crn',
    component: CourseDetailsFormComponent
  },
  {
    path: 'courseDetails/edit/:crn/:studentId',
    component: CourseDetailsFormComponent
  },

  //Students
  {
    path:'students',
    component:StudentsListComponent
  },
  
  {
    path:'students/add',
    component:StudentsFormComponent
  },

  {
    path:'students/edit/:studentId/:userId',
    component:StudentsFormComponent
  },

  //Coordinators
  {
    path:'coordinators',
    component:CoordinatorsListComponent
  },

  {
    path:'coordinators/add',
    component:CoordinatorsFormComponent
  },

  {
    path:'coordinators/edit/:coordinatorId/:userId',
    component:CoordinatorsFormComponent
  },
  //Login y Logout
  {
    path: 'login',
    component : LoginFormComponent
  },
  {
    path: 'login/:email',
    component : LoginFormComponent
  },
  {
    path: 'logout',
    component : LogoutComponent
  },
  //Salaries
  {
    path:'payments/:teacherId',
    component:SalariesListComponent
  },
  {
    path:'payments/:teacherId/:emissionDate',
    component:SalariesFormComponent
    },
  // Roles
  {
    path: 'roles',
    component: RoleListComponent
  },
  // Screen Control
  {
    path: 'roles/screens/:roleId',
    component: ScreenFormComponent
  },
  // Permission Control
  {
    path: 'roles/permissions/:roleId',
    component: PermissionFormComponent
  },
  //Sin coincidencias
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full'
  },
  
 ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }