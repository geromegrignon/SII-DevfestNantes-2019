import {Component, OnInit} from '@angular/core';
import {GameService} from '../services/game.service';
import {Slot} from '../models/Slot.model';
import {BehaviorSubject, Observable} from 'rxjs';
import {Match} from '../models/Match.model';
import {StateOfMatch} from '../models/StateOfMatch.enum';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {
  public slots$: Observable<Slot[]>;
  public match: Match;
  public scoreMultiplicator: number;
  public countdown$: BehaviorSubject<number>;

  constructor(private gameService: GameService) { }

  ngOnInit() {
    this.gameService.slots$.next([
      new Slot(57),
      new Slot(50),
      new Slot(51),
      new Slot(42),
      new Slot(38),
      new Slot(41),
    ]);
    this.slots$ = this.gameService.slots$.asObservable();
    this.gameService.launchGame();
    this.match = this.gameService.match;
    this.scoreMultiplicator = this.gameService.scoreMultiplicator;
    this.gameService.stateOfMatch$.next(StateOfMatch.MATCH_STARTED);
    this.countdown$ = this.gameService.match.gameCountdown$;
  }

}
