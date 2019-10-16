import {ChangeDetectionStrategy, Component, Input, OnInit} from '@angular/core';
import {Slot} from '../../models/Slot.model';
import {GameService} from '../../services/game.service';
import {StateOfMatch} from '../../models/StateOfMatch.enum';

@Component({
  selector: 'app-slot',
  templateUrl: './slot.component.html',
  styleUrls: ['./slot.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SlotComponent implements OnInit {
  @Input() slot: Slot;
  stateOfMatch: StateOfMatch;

  constructor(private gameService: GameService) {
  }

  ngOnInit(): void {
    this.gameService.stateOfMatch$.asObservable().subscribe(state => this.stateOfMatch = state);
  }

  /**
   *  return a random number
   * @param max number
   */
  private getRandomInt(max: number): number {
    return Math.floor(Math.random() * Math.floor(max));
  }

  generateCharacter() {
    if (this.slot.characterType === 'rockstar') {
      const index = (this.getRandomInt(11) + 1);
      return 'rockstar' + index;
    }
    if (this.slot.characterType === 'clown') {
      const index = (this.getRandomInt(16) + 1);
      return 'clown' + index;
    }
  }

}
