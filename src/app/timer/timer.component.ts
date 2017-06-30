import { Component, OnInit, OnDestroy, Output, EventEmitter } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Rx';
import { MadlibsService } from './../madlibs.service';

@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.scss']
})
export class TimerComponent implements OnInit, OnDestroy {
  timer = 0;
  timer$: Observable<number>;
  timerSub: Subscription;
  counter = 0;
  width: string;
  goSub: Subscription;
  @Output() timeUp = new EventEmitter();

  constructor(private ml: MadlibsService) { }

  ngOnInit() {
    this._setupTimer();
    this._setupGo();
  }

  private _setupTimer() {
    // 10 seconds (50ms * 200 = 10s)
    this.timer$ = Observable
      .timer(0, 50)
      .timeInterval()
      .take(200)
      .map(e => e.value);
  }

  private _setupGo() {
    this.goSub = this.ml.go$.subscribe(
      (val) => {
        this._startTimer();
      }
    );
  }

  private _startTimer() {
    if (this.timerSub) {
      this.timerSub.unsubscribe();
    }
    this.counter = 0;
    this.timerSub = this.timer$.subscribe(
      t => {
        this.timer = (t / 2) + .5;
        this.width = this.timer + '%';
        if (this.timer % 1 === 0 && this.timer % 20 === 0) {
          this.counter++;
        }
      },
      err => {
        console.warn('Timer error:', err);
      },
      () => {
        this.timer = 100;
        this.width = '100%';
        this.timeUp.emit();
      }
    );
  }

  ngOnDestroy() {
    if (this.timerSub) {
      this.timerSub.unsubscribe();
    }
  }

}
