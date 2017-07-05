import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-madlib',
  templateUrl: './madlib.component.html',
  styleUrls: ['./madlib.component.scss']
})
export class MadlibComponent implements OnInit {
  @Input() words: string[];

  constructor() { }

  ngOnInit() {
  }

}
