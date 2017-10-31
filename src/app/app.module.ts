import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AppComponent } from './components/app.component';
import { BioComponent } from './components/app.bioComponent';
import { CVComponent } from './components/app.cvComponent';
import { TestComponent } from './components/app.testComponent';

@NgModule({
  declarations: [
    AppComponent,
    BioComponent,
    CVComponent,
    TestComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot([
      {
        path: '',
        component: BioComponent
      },
      {
        path: 'cv',
        component: CVComponent
      }
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
