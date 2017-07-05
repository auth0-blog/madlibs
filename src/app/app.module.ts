import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { MadlibsService } from './madlibs.service';
import { SpeechService } from './speech.service';
import { ProgressBarComponent } from './progress-bar/progress-bar.component';
import { TimerComponent } from './timer/timer.component';
import { ListenComponent } from './listen/listen.component';
import { MadlibComponent } from './madlib/madlib.component';
import { WordsFormComponent } from './words-form/words-form.component';
import { KeyboardComponent } from './keyboard/keyboard.component';

@NgModule({
  declarations: [
    AppComponent,
    ProgressBarComponent,
    TimerComponent,
    ListenComponent,
    MadlibComponent,
    WordsFormComponent,
    KeyboardComponent
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [
    MadlibsService,
    SpeechService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
