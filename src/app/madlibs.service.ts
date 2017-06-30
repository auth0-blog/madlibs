import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class MadlibsService {
  go$ = new Subject<boolean>();

  constructor() { }

  go() {
    this.go$.next(true);
  }

}
