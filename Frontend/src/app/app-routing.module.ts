import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageNotFoundComponent } from './components/layout-area/page-not-found/page-not-found.component';
import { LoginComponent } from './components/auth-area/login/login.component';
import { RegisterComponent } from './components/auth-area/register/register.component';
import { CommemorativeListComponent } from './components/commemorative-area/commemorative-list/commemorative-list.component';
import { CommemorativePageComponent } from './components/commemorative-area/commemorative-page/commemorative-page.component';
import { CommemorativeFormComponent } from './components/commemorative-area/commemorative-form/commemorative-form.component';
import { AuthGuard } from './utils/auth.guard';
import { RegisteredGuard } from './utils/registered.guard';

const routes: Routes = [
  {path: 'login', component: LoginComponent, canActivate: [RegisteredGuard] },
  {path: 'register', component: RegisterComponent, canActivate: [RegisteredGuard] },
 
  {path: 'commemorative_list', component: CommemorativeListComponent},
  {path: 'commemorative/:id', component: CommemorativePageComponent},

  {path: 'add_commemorative', component: CommemorativeFormComponent, canActivate: [AuthGuard]},
  {path: 'edit_commemorative/:id', component: CommemorativeFormComponent, canActivate: [AuthGuard]},
 
  {path: '', redirectTo: '/commemorative_list', pathMatch: 'full' },
  {path: '**', component: PageNotFoundComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
