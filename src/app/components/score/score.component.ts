import { Component, OnInit } from '@angular/core';
import {GameService} from '../../services/game.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-score',
  templateUrl: './score.component.html',
  styleUrls: ['./score.component.scss']
})
export class ScoreComponent implements OnInit {
  public score: number;
  public countdown = 20;

  constructor(private game: GameService, private router: Router) { }

  ngOnInit() {
    this.score = this.game.match.score;
    const interval = setInterval(() => {
      this.countdown--;
      if (this.countdown === 0) {
        clearInterval(interval);
        this.router.navigate(['/training']);
      }
    }, 1000);
  }

}
