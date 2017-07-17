import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { MadlibsService } from './madlibs.service';
import { SpeechService } from './speech.service';
import { ProgressBarComponent } from './progress-bar/progress-bar.component';
import { ListenComponent } from './listen/listen.component';
import { MadlibComponent } from './madlib/madlib.component';
import { WordsFormComponent } from './words-form/words-form.component';
import { KeyboardComponent } from './keyboard/keyboard.component';
import { GenerateWordsComponent } from './generate-words/generate-words.component';

@NgModule({
  declarations: [
    AppComponent,
    ProgressBarComponent,
    ListenComponent,
    MadlibComponent,
    WordsFormComponent,
    KeyboardComponent,
    GenerateWordsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [
    MadlibsService,
    SpeechService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
