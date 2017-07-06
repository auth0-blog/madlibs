import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Rx';

@Injectable()
export class MadlibsService {
  go$ = new Subject<boolean>();
  private _API = 'http://localhost:8084/api/';

  constructor(private http: Http) { }

  go() {
    this.go$.next(true);
  }

  getNouns$() {
    const nounPerson$ = this.http
      .get(`${this._API}noun/person`)
      .map(this._successHandler)
      .catch(this._errorHandler);

    const nounPlace$ = this.http
      .get(`${this._API}noun/place`)
      .map(this._successHandler)
      .catch(this._errorHandler);

    const nounThing$ = this.http
      .get(`${this._API}noun/thing`)
      .map(this._successHandler)
      .catch(this._errorHandler);

    return Observable.forkJoin([nounPerson$, nounPlace$, nounThing$]);
  }

  getVerbs$() {
    const verbPresent$ = this.http
      .get(`${this._API}verb/present`)
      .map(this._successHandler)
      .catch(this._errorHandler);

    const verbPast1$ = this.http
      .get(`${this._API}verb/past`)
      .map(this._successHandler)
      .catch(this._errorHandler);

    const verbPast2$ = this.http
      .get(`${this._API}verb/past`)
      .map(this._successHandler)
      .catch(this._errorHandler);

    return Observable.forkJoin([verbPresent$, verbPast1$, verbPast2$]);
  }

  getAdjs$() {
    const adj1$ = this.http
      .get(`${this._API}adjective`)
      .map(this._successHandler)
      .catch(this._errorHandler);

    const adj2$ = this.http
      .get(`${this._API}adjective`)
      .map(this._successHandler)
      .catch(this._errorHandler);

    const adj3$ = this.http
      .get(`${this._API}adjective`)
      .map(this._successHandler)
      .catch(this._errorHandler);

    return Observable.forkJoin([adj1$, adj2$, adj3$]);
  }

  getWords$() {
    return Observable
      .zip(this.getNouns$(), this.getVerbs$(), this.getAdjs$())
      .map((res) => {
        const mapWords = (words) => {
          return words.map((word, i) => {
            return {
              id: i,
              word: word
            };
          });
        };

        return {
          nouns: mapWords(res[0]),
          verbs: mapWords(res[1]),
          adjs: mapWords(res[2])
        };
      });
  }

  private _successHandler(res: Response) {
    return res.json();
  }

  private _errorHandler(err: any) {
    const errorMsg = err.message || 'Error: Unable to complete request.';
    return Observable.throw(errorMsg);
  }

}
