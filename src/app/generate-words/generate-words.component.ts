import { Component, OnDestroy, Output, EventEmitter } from '@angular/core';
import { MadlibsService } from './../madlibs.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-generate-words',
  templateUrl: './generate-words.component.html',
  styleUrls: ['./generate-words.component.scss']
})
export class GenerateWordsComponent implements OnDestroy {
  @Output() fetchedWords = new EventEmitter;
  wordsSub: Subscription;
  loading = false;
  generated = false;
  error = false;

  constructor(private ml: MadlibsService) { }

  fetchWords() {
    this.loading = true;
    this.generated = false;
    this.error = false;

    this.wordsSub = this.ml.getWords$()
      .subscribe(
        (res) => {
          this.loading = false;
          this.generated = true;
          this.error = false;
          this.fetchedWords.emit(res);
        },
        (err) => {
          this.loading = false;
          this.generated = false;
          this.error = true;
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
