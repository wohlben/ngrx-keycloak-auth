import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from './routes/home/home.component';
import {ForceLoginGuard} from './_helpers/force-login.guard';
import {AuthenticatedComponent} from './routes/authenticated/authenticated.component';


const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'authenticated', component: AuthenticatedComponent, canActivate: [ForceLoginGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
