export class Words {
  constructor(
    public array: string[] = []
  ) {
    for (let i = 0; i < 5; i++) {
      array.push('');
    }
  }
}
