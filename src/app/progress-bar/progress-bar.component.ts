import { Component, OnInit, OnDestroy, Output, EventEmitter } from '@angular/core';
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
  goSub: Subscription;
  @Output() finished = new EventEmitter<{[key: string]: string[]}>();

  constructor(private ml: MadlibsService) { }

  ngOnInit() {
    this._setupProgress();
    this._setupGo();
  }

  private _setupProgress() {
    this.progress$ = Observable
      .timer(0, 50)
      .timeInterval()
      .take(100)
      .map(e => e.value);
  }

  private _setupGo() {
    this.goSub = this.ml.go$
      .subscribe(
        (val) => {
          this._startProgress(val);
        }
      );
  }

  private _startProgress(val) {
    this.progressSub = this.progress$
      .subscribe(
        (p) => {
          this.progress = p;
          this.width = this.progress + '%';
        },
        (err) => {
          console.warn('Progress error:', err);
        },
        () => {
          this.progress = 100;
          this.width = '100%';
          this.finished.emit(val);
        }
      );
  }

  ngOnDestroy() {
    if (this.progressSub) {
      this.progressSub.unsubscribe();
    }
    this.goSub.unsubscribe();
  }

}
