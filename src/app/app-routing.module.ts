import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './services/authentication/auth.guard';

const routes: Routes = [
  { path: '', loadChildren: './login/login.module#LoginPageModule' },
  // { path: '', loadChildren: './tabs/tabs.module#TabsPageModule' },
  { path: 'signup', loadChildren: './signup/signup.module#SignupPageModule' },
  { path: 'reset-password',
    loadChildren: './reset-password/reset-password.module#ResetPasswordPageModule',
    canActivate: [AuthGuard] },
  { path: 'first-access',
    loadChildren: './first-access/first-access.module#FirstAccessPageModule',
    canActivate: [AuthGuard]},
  { path: 'home',
    loadChildren: './home/home.module#HomePageModule',
    canActivate: [AuthGuard] },
  { path: 'register-class', 
    loadChildren: './register-class/register-class.module#RegisterClassPageModule',
    canActivate: [AuthGuard]
   }
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
