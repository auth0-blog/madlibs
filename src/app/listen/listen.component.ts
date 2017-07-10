import { Component, OnInit, OnDestroy, NgZone } from '@angular/core';
import { Word } from './../word.model';
import { MadlibsService } from './../madlibs.service';
import { SpeechService } from './../speech.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-listen',
  templateUrl: './listen.component.html',
  styleUrls: ['./listen.component.scss']
})
export class ListenComponent implements OnInit, OnDestroy {
  nouns: Word[] = [
    {id: 0, word: ''},
    {id: 1, word: ''},
    {id: 2, word: ''},
    {id: 3, word: ''},
    {id: 4, word: ''}];
  verbs: Word[] = [
    {id: 0, word: ''},
    {id: 1, word: ''},
    {id: 2, word: ''},
    {id: 3, word: ''},
    {id: 4, word: ''}];
  adjs: Word[] = [
    {id: 0, word: ''},
    {id: 1, word: ''},
    {id: 2, word: ''},
    {id: 3, word: ''},
    {id: 4, word: ''}];
  nounSub: Subscription;
  verbSub: Subscription;
  adjSub: Subscription;
  errorsSub: Subscription;

  constructor(
    private ml: MadlibsService,
    public speech: SpeechService,
    private zone: NgZone) { }

  ngOnInit() {
    this.speech.init();

    this._listenNouns();
    this._listenVerbs();
    this._listenAdj();
    this._listenErrors();
  }

  private _listenNouns() {
    this.nounSub = this.speech.words$
      .filter(obj => obj.type === 'noun')
      .map(nounObj => nounObj.word)
      .subscribe(
        (noun) => {
          this.zone.run(() => {
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
            this.adjs = this._updateWords(this.adjs, adj);
          });
        }
      );
  }

  private _listenErrors() {
    this.errorsSub = this.speech.errors$
      .subscribe(
        (err) => {
          console.error(err);
        }
      );
  }

  private _updateWords(arr, newWord) {
    let added = false;
    return arr.map((item, i) => {
      if (!item.word && !added) {
        added = true;
        return {id: item.id, word: newWord};
      } else {
        return item;
      }
    });
  }

  onFetchedWords(e) {
    this.nouns = e.nouns;
    this.verbs = e.verbs;
    this.adjs = e.adjs;
  }

  ngOnDestroy() {
    this.nounSub.unsubscribe();
    this.verbSub.unsubscribe();
    this.adjSub.unsubscribe();
  }

}
