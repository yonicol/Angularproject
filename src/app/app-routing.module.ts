import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GuestareaComponent } from './guestarea/guestarea.component';
import { LoginscreenComponent } from './loginscreen/loginscreen.component';
import { RegisteruserComponent } from './registeruser/registeruser.component';
import { UserareaComponent } from './userarea/userarea.component';
import { UserconnectedGuard } from './userconnected.guard';
import { CoinfixerComponent } from './coinfixer/coinfixer.component';
import { CartplaceComponent } from './cartplace/cartplace.component';






const routes: Routes = [
  {path:'', component:GuestareaComponent},
  {path:'login', component:LoginscreenComponent},
  {path:'register', component:RegisteruserComponent},
  {path:'userarea', component:UserareaComponent, canActivate:[UserconnectedGuard]},
  {path:'coinarea', component:CoinfixerComponent, canActivate:[UserconnectedGuard]},
  {path:'cart', component:CartplaceComponent, canActivate:[UserconnectedGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
