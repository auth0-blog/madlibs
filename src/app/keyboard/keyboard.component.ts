import { Component, OnInit } from '@angular/core';
import { Word } from './../word.model';

@Component({
  selector: 'app-keyboard',
  templateUrl: './keyboard.component.html',
  styleUrls: ['./keyboard.component.scss']
})
export class KeyboardComponent implements OnInit {
  nouns: Word[] = [{id: 0, word: ''}, {id: 1, word: ''}, {id: 2, word: ''}];
  verbs: Word[] = [{id: 0, word: ''}, {id: 1, word: ''}, {id: 2, word: ''}];
  adjs: Word[] = [{id: 0, word: ''}, {id: 1, word: ''}, {id: 2, word: ''}];

  constructor() { }

  ngOnInit() {
  }

  onFetchedWords(e) {
    this.nouns = e.nouns;
    this.verbs = e.verbs;
    this.adjs = e.adjs;
  }

}
