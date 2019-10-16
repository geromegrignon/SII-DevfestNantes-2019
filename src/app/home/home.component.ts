import { Component } from '@angular/core';
import {FreedrumService} from '../services/freedrum.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  constructor(private freedrumService: FreedrumService) {
  }

  public connect(): void {
    this.freedrumService.connect();
  }

}
