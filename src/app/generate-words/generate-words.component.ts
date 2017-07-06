import { Component, Output, OnInit, OnDestroy, EventEmitter } from '@angular/core';
import { MadlibsService } from './../madlibs.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-generate-words',
  templateUrl: './generate-words.component.html',
  styleUrls: ['./generate-words.component.scss']
})
export class GenerateWordsComponent implements OnInit, OnDestroy {
  @Output() fetchedWords = new EventEmitter;
  wordsSub: Subscription;

  constructor(private ml: MadlibsService) { }

  ngOnInit() {
  }

  fetchWords() {
    this.wordsSub = this.ml.getWords$()
      .subscribe(
        (res) => {
          this.fetchedWords.emit(res);
        },
        (err) => {
          console.warn(err);
        }
      );
  }

  ngOnDestroy() {
    if (this.wordsSub) {
      this.wordsSub.unsubscribe();
    }
  }
}
