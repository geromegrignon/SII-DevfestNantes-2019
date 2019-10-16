import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {Slot} from '../../models/Slot.model';
import {GameService} from '../../services/game.service';
import {StateOfMatch} from '../../models/StateOfMatch.enum';
import {map} from 'rxjs/operators';
import {Router} from '@angular/router';
import {DrumkitService} from '../../services/drumkit.service';

@Component({
  selector: 'app-training-two',
  templateUrl: './training-two.component.html',
  styleUrls: ['./training-two.component.scss']
})
export class TrainingTwoComponent implements OnInit {
  public slots$: Observable<Slot[]>;
  public stepState = 'starting';
  public countDown = 3;

  constructor(private gameService: GameService, private router: Router, private drumkit: DrumkitService) {
  }

  ngOnInit() {
    this.populateSlots();
    this.gameService.stateOfMatch$.next(StateOfMatch.TRAINING_MODE_HIT);
    this.gameService.slots$.subscribe(slots => {
      if (!slots.filter(slot => slot.characterType === 'rockstar').length) {
        this.stepState = 'victory';
        const interval = setInterval(() => {
          this.countDown--;
          if (this.countDown === 0) {
            clearInterval(interval);
            this.router.navigate(['/game']);
          }
        }, 1000);
      }
    });
    this.drumkit.activateSong();
  }

  async populateSlots() {
    await this.gameService.slots$.next([
      new Slot(57, 'rockstar', true),
      new Slot(50, 'clown', true),
      new Slot(51, 'rockstar', true),
      new Slot(42, 'clown', true),
      new Slot(38, 'rockstar', true),
      new Slot(41, 'clown', true),
    ]);
    await this.toto();
  }

  async toto() {
    this.slots$ = this.gameService.slots$.asObservable();
  }

  getScore(characterType) {
    return this.slots$.pipe(
      map(slots => slots.filter(slot => slot.characterType === characterType)),
    );
  }
}
