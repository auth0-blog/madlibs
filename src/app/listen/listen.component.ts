import { Component, OnInit, OnDestroy, NgZone } from '@angular/core';
import { SpeechService } from './../speech.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-listen',
  templateUrl: './listen.component.html',
  styleUrls: ['./listen.component.scss']
})
export class ListenComponent implements OnInit, OnDestroy {
  nouns: string[] = [];
  verbs: string[] = [];
  adjs: string[] = [];
  nounSub: Subscription;
  verbSub: Subscription;
  adjSub: Subscription;

  constructor(
    public speech: SpeechService,
    private zone: NgZone) { }

  ngOnInit() {
    // @TODO: this entire component should only be initialized if browser supports speech recognition
    this.speech.init();
    this._listenNouns();
    this._listenVerbs();
    this._listenAdj();
  }

  private _listenNouns() {
    this.nounSub = this.speech.words$
      .filter(obj => obj.type === 'noun')
      .map(nounObj => nounObj.word)
      .subscribe(
        (noun) => {
          this.zone.run(() => {
            this.nouns = [...this.nouns, ...[noun]];
            console.log(this.nouns);
          });
        }
      );
  }

  private _listenVerbs() {
    this.nounSub = this.speech.words$
      .filter(obj => obj.type === 'verb')
      .map(verbObj => verbObj.word)
      .subscribe(
        (verb) => {
          this.zone.run(() => {
            // this.verb = verb;
            // alert('verb:' + this.verb);
          });
        }
      );
  }

  private _listenAdj() {
    this.nounSub = this.speech.words$
      .filter(obj => obj.type === 'adj')
      .map(adjObj => adjObj.word)
      .subscribe(
        (adj) => {
          this.zone.run(() => {
            // this.adj = adj;
            // alert('adjective:' + this.adj);
          });
        }
      );
  }

  ngOnDestroy() {
    this.nounSub.unsubscribe();
    this.verbSub.unsubscribe();
    this.adjSub.unsubscribe();
  }

}
