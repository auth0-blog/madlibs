import { Component, OnInit } from '@angular/core';
import { MadlibsService } from './../madlibs.service';

@Component({
  selector: 'app-madlib',
  templateUrl: './madlib.component.html',
  styleUrls: ['./madlib.component.scss']
})
export class MadlibComponent implements OnInit {
  constructor(public ml: MadlibsService) { }

  ngOnInit() {
  }

  aOrAn(word: string, beginSentence: boolean) {
    const regex = /\b[aeiou]\w*/ig;

    if (word.match(regex)) {
      return beginSentence ? 'An' : 'an';
    } else {
      return beginSentence ? 'A' : 'a';
    }
  }

}
