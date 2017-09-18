import { Component } from '@angular/core';
import { MadlibsService } from './../madlibs.service';

@Component({
  selector: 'app-madlib',
  templateUrl: './madlib.component.html',
  styleUrls: ['./madlib.component.scss']
})
export class MadlibComponent {
  constructor(public ml: MadlibsService) { }

  aOrAn(word: string, beginSentence: boolean) {
    const startsWithVowel = ['a', 'e', 'i', 'o', 'u'].indexOf(word.charAt(0).toLowerCase()) !== -1;

    if (startsWithVowel) {
      return beginSentence ? 'An' : 'an';
    } else {
      return beginSentence ? 'A' : 'a';
    }
  }

}
