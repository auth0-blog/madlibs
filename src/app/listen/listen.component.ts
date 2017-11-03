import { Component, OnInit, OnDestroy } from '@angular/core';
import { Words } from './../words';
import { SpeechService } from './../speech.service';
import { Subscription } from 'rxjs/Subscription';
import { filter, map } from 'rxjs/operators';

@Component({
  selector: 'app-listen',
  templateUrl: './listen.component.html',
  styleUrls: ['./listen.component.scss']
})
export class ListenComponent implements OnInit, OnDestroy {
  nouns: string[] = new Words().array;
  verbs: string[] = new Words().array;
  adjs: string[] = new Words().array;
  nounSub: Subscription;
  verbSub: Subscription;
  adjSub: Subscription;
  arrayFull: string;
  errorsSub: Subscription;
  errorMsg: string;

  constructor(public speech: SpeechService) { }

  ngOnInit() {
    this.speech.init();
    this._listenNouns();
    this._listenVerbs();
    this._listenAdj();
    this._listenErrors();
  }

  get btnLabel(): string {
    return this.speech.listening ? 'Listening...' : 'Listen';
  }

  private _listenNouns() {
    this.nounSub = this.speech.words$
      .filter(obj => obj.type === 'noun')
      .map(nounObj => nounObj.word)
      .subscribe(
        noun => {
          this._setError();
          this.nouns = this._updateWords('nouns', this.nouns, noun);
        }
      );
  }

  private _listenVerbs() {
    this.verbSub = this.speech.words$
      .filter(obj => obj.type === 'verb')
      .map(verbObj => verbObj.word)
      .subscribe(
        verb => {
          this._setError();
          this.verbs = this._updateWords('verbs', this.verbs, verb);
        }
      );
  }

  private _listenAdj() {
    this.adjSub = this.speech.words$
      .filter(obj => obj.type === 'adj')
      .map(adjObj => adjObj.word)
      .subscribe(
        adj => {
          this._setError();
          this.adjs = this._updateWords('adjectives', this.adjs, adj);
        }
      );
  }

  private _listenErrors() {
    this.errorsSub = this.speech.errors$
      .subscribe(err => this._setError(err));
  }

  private _setError(err?: any) {
    if (err) {
      console.log('Speech Recognition:', err);
      this.errorMsg = err.message;
    } else {
      this.errorMsg = null;
    }
  }

  private _updateWords(type: string, arr: string[], newWord: string) {
    const _checkArrayFull = arr.every(item => !!item === true);

    if (_checkArrayFull) {
      this.arrayFull = type;
      return arr;
    } else {
      let _added = false;
      this.arrayFull = null;
      return arr.map(item => {
        if (!item && !_added) {
          _added = true;
          return newWord;
        } else {
          return item;
        }
      });
    }
  }

  onFetchedAPIWords(e) {
    this.nouns = e.nouns;
    this.verbs = e.verbs;
    this.adjs = e.adjs;
  }

  ngOnDestroy() {
    this.nounSub.unsubscribe();
    this.verbSub.unsubscribe();
    this.adjSub.unsubscribe();
    this.errorsSub.unsubscribe();
  }

}
