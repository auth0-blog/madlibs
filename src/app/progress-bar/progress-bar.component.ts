import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Rx';
import { MadlibsService } from './../madlibs.service';

@Component({
  selector: 'app-progress-bar',
  templateUrl: './progress-bar.component.html',
  styleUrls: ['./progress-bar.component.scss']
})
export class ProgressBarComponent implements OnInit, OnDestroy {
  progress = 0;
  progress$: Observable<number>;
  progressSub: Subscription;
  width: string;
  submitSub: Subscription;
  pronounSub: Subscription;

  constructor(private ml: MadlibsService) { }

  ngOnInit() {
    this._setupProgress();
    this._setupSubmit();
    this._getPronoun();
  }

  private _setupProgress() {
    this.progress$ = Observable
      .timer(0, 50)
      .timeInterval()
      .take(50)
      .map(e => e.value);
  }

  private _getPronoun() {
    this.pronounSub = this.ml.getPronoun$()
      .subscribe(
        (res) => this.ml.setPronoun(res)
      );
  }

  private _setupSubmit() {
    this.submitSub = this.ml.submit$
      .subscribe(
        (words) => {
          this._startProgress(words);
        }
      );
  }

  private _startProgress(words) {
    this.progressSub = this.progress$
      .subscribe(
        (p) => {
          this.progress = p * 2;
          this.width = this.progress + '%';
        },
        (err) => {
          console.warn('Progress error:', err);
        },
        () => {
          this.progress = 100;
          this.width = '100%';
          this.ml.setMadlibReady(true);
        }
      );
  }

  ngOnDestroy() {
    if (this.progressSub) {
      this.progressSub.unsubscribe();
    }
    this.submitSub.unsubscribe();
    this.pronounSub.unsubscribe();
  }

}
