import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {Slot} from '../../models/Slot.model';
import {GameService} from '../../services/game.service';
import {StateOfMatch} from '../../models/StateOfMatch.enum';

@Component({
  selector: 'app-training',
  templateUrl: './training.component.html',
  styleUrls: ['./training.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TrainingComponent implements OnInit {
  public slots$: Observable<Slot[]>;

  constructor(private gameService: GameService) { }

  ngOnInit() {
    this.slots$ = this.gameService.slots$.asObservable();
    this.gameService.stateOfMatch$.next(StateOfMatch.TRAINING_MODE_LIGHT);
  }

}
