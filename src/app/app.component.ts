import { Component } from '@angular/core';
import { SpeechService } from './speech.service';
import { MadlibsService } from './madlibs.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor(
    public ml: MadlibsService,
    public speech: SpeechService) {}
}
