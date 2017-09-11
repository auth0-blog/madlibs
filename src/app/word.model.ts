export class Word {
  constructor(
    public id: number,
    public word: string
  ) {}
}

export class Words {
  constructor(
    public array: Word[] = []
  ) {
    for (let i = 0; i < 5; i++) {
      array.push(new Word(i, ''));
    }
  }
}
