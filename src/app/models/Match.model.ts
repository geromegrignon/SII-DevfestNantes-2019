import {BehaviorSubject} from 'rxjs';

export class Match {
  public score: number;
  public counter: number;
  public intervalBetweenActivation: number;
  public slotActivationDuration: number;
  public gameCountdown$: BehaviorSubject<number>;

  constructor(countdown: number) {
    this.score = 0;
    this.counter = 0;
    this.intervalBetweenActivation = 2100;
    this.slotActivationDuration = 2000;
    this.gameCountdown$ = new BehaviorSubject<number>(countdown);
  }

}
