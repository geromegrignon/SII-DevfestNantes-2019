export class Slot {
  public isActive = false;
  public note: number;
  public characterType: string;
  public isSpotted = false;

  // tslint:disable-next-line:no-unnecessary-initializer
  constructor(note: number, characterType: string = undefined, isActive: boolean = false) {
    this.note = note;
    this.characterType = characterType;
    this.isActive = isActive;
  }
}





