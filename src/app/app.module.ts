import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GuestareaComponent } from './guestarea/guestarea.component';
import { LoginscreenComponent } from './loginscreen/loginscreen.component';
import { RegisteruserComponent } from './registeruser/registeruser.component';
import { UserareaComponent } from './userarea/userarea.component';
import { environment } from '../environments/environment';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { HttpClientModule } from '@angular/common/http';
import { CartplaceComponent } from './cartplace/cartplace.component';

@NgModule({
  declarations: [
    AppComponent,
    GuestareaComponent,
    LoginscreenComponent,
    RegisteruserComponent,
    UserareaComponent,
    CartplaceComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
    AngularFireAuthModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
