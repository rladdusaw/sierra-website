import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { BioComponent } from './app.bioComponent';
import { CVComponent } from './app.cvComponent';
import { TestComponent } from './app.testComponent';

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
