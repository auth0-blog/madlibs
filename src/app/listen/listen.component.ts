import { Component, OnInit, OnDestroy, NgZone } from '@angular/core';
import { Word, Words } from './../word.model';
import { SpeechService } from './../speech.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-listen',
  templateUrl: './listen.component.html',
  styleUrls: ['./listen.component.scss']
})
export class ListenComponent implements OnInit, OnDestroy {
  nouns: Word[] = new Words().array;
  verbs: Word[] = new Words().array;
  adjs: Word[] = new Words().array;
  nounSub: Subscription;
  verbSub: Subscription;
  adjSub: Subscription;
  errorsSub: Subscription;
  errorMsg: string;

  constructor(
    public speech: SpeechService,
    private zone: NgZone) { }

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
        (noun) => {
          this.zone.run(() => {
            this._setError();
            this.nouns = this._updateWords(this.nouns, noun);
          });
        }
      );
  }

  private _listenVerbs() {
    this.verbSub = this.speech.words$
      .filter(obj => obj.type === 'verb')
      .map(verbObj => verbObj.word)
      .subscribe(
        (verb) => {
          this.zone.run(() => {
            this._setError();
            this.verbs = this._updateWords(this.verbs, verb);
          });
        }
      );
  }

  private _listenAdj() {
    this.adjSub = this.speech.words$
      .filter(obj => obj.type === 'adj')
      .map(adjObj => adjObj.word)
      .subscribe(
        (adj) => {
          this.zone.run(() => {
            this._setError();
            this.adjs = this._updateWords(this.adjs, adj);
          });
        }
      );
  }

  private _listenErrors() {
    this.errorsSub = this.speech.errors$
      .subscribe(
        (err) => {
          this.zone.run(() => {
            this._setError(err);
          });
        }
      );
  }

  private _setError(err?: any) {
    if (err) {
      console.log('Speech Recognition:', err);
      this.errorMsg = err.message;
    } else {
      this.errorMsg = null;
    }
  }

  private _updateWords(arr, newWord) {
    let added = false;
    return arr.map((item, i) => {
      if (!item.word && !added) {
        added = true;
        return new Word(item.id, newWord);
      } else {
        return item;
      }
    });
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
