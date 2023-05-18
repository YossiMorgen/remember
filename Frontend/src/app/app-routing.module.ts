import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageNotFoundComponent } from './components/layout-area/page-not-found/page-not-found.component';
import { LoginComponent } from './components/auth-area/login/login.component';
import { RegisterComponent } from './components/auth-area/register/register.component';
import { CommemorativeListComponent } from './components/commemorative-area/commemorative-list/commemorative-list.component';
import { CommemorativePageComponent } from './components/commemorative-area/commemorative-page/commemorative-page.component';

const routes: Routes = [
  {path: 'login', component: LoginComponent },
  {path: 'register', component: RegisterComponent },
  {path: 'commemorative_list', component: CommemorativeListComponent},
  {path: 'commemorative_list/:id', component: CommemorativePageComponent},
  {path: '', redirectTo: '/commemorative_list', pathMatch: 'full' },
  {path: '**', component: PageNotFoundComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
