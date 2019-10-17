import {Injectable} from '@angular/core';
import {Match} from '../models/Match.model';
import {Slot} from '../models/Slot.model';
import {BehaviorSubject} from 'rxjs';
import {DrumkitService} from './drumkit.service';
import {StateOfMatch} from '../models/StateOfMatch.enum';
import {Router} from '@angular/router';

const availableNotes = [57, 50, 51, 42, 38, 41];

@Injectable({
  providedIn: 'root'
})
export class GameService {
  public match: Match;
  public sequence;
  public slots$: BehaviorSubject<Slot[]> = new BehaviorSubject<Slot[]>([
    new Slot(57),
    new Slot(50),
    new Slot(51),
    new Slot(42),
    new Slot(38),
    new Slot(41),
  ]);
  public stateOfMatch$: BehaviorSubject<StateOfMatch> = new BehaviorSubject<StateOfMatch>(StateOfMatch.MATCH_NOT_STARTED);

  // to put a setTimeout on the handleData to avoid catching too close events
  private isTriggerReady = true;

  constructor(private drumkit: DrumkitService, private router: Router) {
  }

  public launchGame(): void {
    this.match = new Match(120);
    this.start();
    const interval = setInterval(() => {
      let updatedCountdown = this.match.gameCountdown$.value;
      this.match.gameCountdown$.next(--updatedCountdown);
      if (this.match.gameCountdown$.value === 0) {
        clearInterval(interval);
        this.stopGame();
        this.router.navigate(['/score']);
      }
    }, 1000);
  }

  /**
   * agit en fonction de la note et de la commande reçue par le mouvement du senseur
   * @param command commande émise par le senseur
   * @param note note émise par le senseur
   */
  public handleDrumSticksEvents(command, note): void {
    if (command === 153) {
      if (this.isTriggerReady && availableNotes.includes(note)) {
        const currentSlot = this.slots$.value.find(slot => slot.note === note);
        this.isTriggerReady = false;
        // activate drum (physical & audio)
        if (currentSlot.isActive) {
          if (currentSlot.characterType === 'rockstar') {
            this.drumkit.activateDrum(currentSlot.note);
            this.updateScore(currentSlot);
          } else {
            this.drumkit.activateClownHorn();
            this.match.score--;
            this.match.counter = 0;
          }
        }
        setTimeout(() => this.isTriggerReady = true, 300);
      }
    }
  }

  /**
   * agit en fonction de la note et de la commande reçue par le mouvement du senseur
   * @param command commande émise par le senseur
   * @param note note émise par le senseur
   */
  public handleTrainingEvents(command, note): void {
    if (command === 153) {
      if (this.isTriggerReady && availableNotes.includes(note)) {
        const currentSlot = this.slots$.value.find(slot => slot.note === note);
        this.isTriggerReady = false;
        if (currentSlot.isActive) {
          this.updateSlot(currentSlot);
        }
        setTimeout(() => this.isTriggerReady = true, 300);
      }
    }
  }

  public start(): void {
    if (this.sequence !== undefined) {
      this.stopGame();
    }
    this.sequence = setInterval(() => this.activateSlot(), this.match.intervalBetweenActivation);
  }

  /**
   * clear the current interval
   */
  private stopGame(): void {
    clearInterval(this.sequence);
  }

  /**
   * update the score of the match
   * @param slot selected slot
   */
  public updateScore(slot: Slot): void {
    if (slot.isActive) {
      this.drumkit.activateKickDrum();
      // this.match.score += this.scoreMultiplicator;
      this.match.score += 1;
      // this.match.counter++;
      this.updateSlot(slot);
      this.start();
    }
  }

  private activateSlot(): void {
    const slots: Slot[] = this.slots$.value;
    const index: number = this.getRandomInt(slots.length);
    const slot: Slot = slots[index];
    const characterType: string = this.getRandomInt(10) > 3 ? 'rockstar' : 'clown';
    // activate the slot
    this.slots$.next([
      ...slots.slice(0, index),
      Object.assign({}, slot, {isActive: true, characterType}),
      ...slots.slice(index + 1)
    ]);
    // desactivate the slot
    setTimeout(() => {
      // tslint:disable-next-line:no-shadowed-variable
      const slots: Slot[] = this.slots$.value;
      this.slots$.next([
        ...slots.slice(0, index),
        Object.assign({}, slot, {isActive: false, characterType: undefined}),
        ...slots.slice(index + 1)
      ]);
      this.accelerateGameSpeed();
    }, this.match.slotActivationDuration);
  }

  /**
   * reset the state of the selected slot
   * @param slot selected slot
   */
  private updateSlot(slot: Slot): void {
    const index = this.slots$.value.indexOf(slot);
    this.slots$.next([
      ...this.slots$.value.slice(0, index),
      Object.assign({}, slot, {isActive: false, characterType: undefined}),
      ...this.slots$.value.slice(index + 1)
    ]);
  }

  /**
   *  return a random number
   * @param max number
   */
  private getRandomInt(max: number): number {
    return Math.floor(Math.random() * Math.floor(max));
  }

  // calculate the score multiplicator (+1 per 10 consecutive points)
  public get scoreMultiplicator(): number {
    return (this.match.counter / 5) > 1 ? Math.trunc(this.match.counter / 5) : 1;
  }

  private accelerateGameSpeed(): void {
    this.match.slotActivationDuration -= 20;
    this.match.intervalBetweenActivation -= 20;
  }
}
