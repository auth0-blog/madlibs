import { Component, Input, Output, OnInit, EventEmitter } from '@angular/core';
import { MadlibsService } from './../madlibs.service';

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
  generating = false;
  placeholders = {
    noun: ['person', 'place', 'place', 'thing', 'thing'],
    verb: ['present', 'present', 'past', 'past', 'past']
  };

  constructor(private ml: MadlibsService) { }

  ngOnInit() {
  }

  trackWords(index, word) {
    return word ? word.id : undefined;
  }

  getPlaceholder(type: string, id: number) {
    return this.placeholders[type][id];
  }

  done() {
    this.ml.submit({
      nouns: this.nouns,
      verbs: this.verbs,
      adjs: this.adjs
    });
    this.generating = true;
  }

}
