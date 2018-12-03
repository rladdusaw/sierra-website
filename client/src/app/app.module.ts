import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from '@angular/router';

import { AdminComponent } from './components/app.adminComponent';
import { AppComponent } from './components/app.component';
import { BioComponent } from './components/app.bioComponent';
import { CVComponent } from './components/app.cvComponent';
import { TestComponent } from './components/app.testComponent';
import { SocialComponent } from './components/app.socialComponent';
import { LoginComponent } from './components/app.loginComponent';
import { PageNotFoundComponent } from './components/app.pageNotFoundComponent';
import { AuthenticationService } from './services/authentication.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { JwtInterceptor, JwtInterceptorProvider } from './helpers/jwt.interceptor';
import { AdminGuard } from './guards/admin.guard';
import { LogoutComponent } from './components/app.logoutComponent';

@NgModule({
  declarations: [
    AdminComponent,
    AppComponent,
    BioComponent,
    CVComponent,
    LoginComponent,
    LogoutComponent,
    PageNotFoundComponent,
    SocialComponent,
    TestComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    RouterModule.forRoot([
      {
        path: '',
        component: BioComponent
      },
      {
        path: 'cv',
        component: CVComponent
      },
      {
        path: 'login',
        component: LoginComponent
      },
      {
        path: 'logout',
        component: LogoutComponent
      },
      {
        path: 'admin',
        component: AdminComponent,
        canActivate: [AdminGuard]
      },
      {
        path: '**',
        component: PageNotFoundComponent
      }
    ])
  ],
  providers: [
    AuthenticationService,
    HttpClient,
    JwtInterceptorProvider
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
