import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { MadlibsService } from './madlibs.service';
import { ProgressBarComponent } from './progress-bar/progress-bar.component';
import { TimerComponent } from './timer/timer.component';

@NgModule({
  declarations: [
    AppComponent,
    ProgressBarComponent,
    TimerComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [
    MadlibsService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
