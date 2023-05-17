import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './conponents/auth-area/login/login.component';
import { RegisterComponent } from './conponents/auth-area/register/register.component';
import { RegisteredGuard } from './utils/registered.guard';
import { PageNotFoundComponent } from './components/layout-area/page-not-found/page-not-found.component';

const routes: Routes = [
  {path: 'login', component: LoginComponent, canActivate: [RegisteredGuard] },
  {path: 'register', component: RegisterComponent, canActivate: [RegisteredGuard] },

  {path: '**', component: PageNotFoundComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
