import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { SigningComponent } from './components/signin/signing.component';
import { SignupComponent } from './components/signup/signup.component';
import {FormsModule} from '@angular/forms';
import { RouterModule, Routes} from '@angular/router';
import { HomeComponent } from './components/home/home.component';

const appRoutes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'signin', component: SigningComponent },
  {path: 'app-signup', component: SignupComponent}
];


@NgModule({
  declarations: [
    AppComponent,
    SigningComponent,
    SignupComponent,
    HomeComponent,
    RouterModule.forRoot(appRoutes)
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
