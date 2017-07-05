import { Component, Input, Output, OnInit, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-words-form',
  templateUrl: './words-form.component.html',
  styleUrls: ['./words-form.component.scss']
})
export class WordsFormComponent implements OnInit {
  @Input() nouns: any[];
  @Input() verbs: any[];
  @Input() adjs: any[];
  @Output() submitForm = new EventEmitter;

  constructor() { }

  ngOnInit() {
  }

  trackWords(index, word) {
    return word ? word.id : undefined;
  }

  done() {
    this.submitForm.emit({
      nouns: this.nouns,
      verbs: this.verbs,
      adjs: this.adjs
    });
  }

}
