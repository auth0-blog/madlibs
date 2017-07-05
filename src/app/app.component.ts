import { Component, OnInit } from '@angular/core';
import { MadlibsService } from './madlibs.service';
import { SpeechService } from './speech.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(
    public ml: MadlibsService,
    public speech: SpeechService) {}

  ngOnInit() {

  }
}
