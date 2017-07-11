import { Component, OnInit } from '@angular/core';
import { Word, Words } from './../word.model';

@Component({
  selector: 'app-keyboard',
  templateUrl: './keyboard.component.html',
  styleUrls: ['./keyboard.component.scss']
})
export class KeyboardComponent implements OnInit {
  nouns: Word[] = new Words().array;
  verbs: Word[] = new Words().array;
  adjs: Word[] = new Words().array;

  constructor() { }

  ngOnInit() {
  }

  onFetchedAPIWords(e) {
    this.nouns = e.nouns;
    this.verbs = e.verbs;
    this.adjs = e.adjs;
  }

}
