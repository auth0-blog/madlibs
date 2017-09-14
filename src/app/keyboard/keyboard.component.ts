import { Component } from '@angular/core';
import { Words } from './../words';

@Component({
  selector: 'app-keyboard',
  templateUrl: './keyboard.component.html',
  styleUrls: ['./keyboard.component.scss']
})
export class KeyboardComponent {
  nouns: string[] = new Words().array;
  verbs: string[] = new Words().array;
  adjs: string[] = new Words().array;

  constructor() { }

  onFetchedAPIWords(e) {
    this.nouns = e.nouns;
    this.verbs = e.verbs;
    this.adjs = e.adjs;
  }

}
