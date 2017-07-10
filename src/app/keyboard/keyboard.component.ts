import { Component, OnInit } from '@angular/core';
import { Words } from './../word.model';

@Component({
  selector: 'app-keyboard',
  templateUrl: './keyboard.component.html',
  styleUrls: ['./keyboard.component.scss']
})
export class KeyboardComponent implements OnInit {
  nouns = new Words().array;
  verbs = new Words().array;
  adjs = new Words().array;

  constructor() { }

  ngOnInit() {
  }

  onFetchedAPIWords(e) {
    this.nouns = e.nouns;
    this.verbs = e.verbs;
    this.adjs = e.adjs;
  }

}
