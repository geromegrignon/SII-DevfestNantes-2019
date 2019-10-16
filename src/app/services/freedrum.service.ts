import {Injectable} from '@angular/core';
import {FreedrumSensor} from '../models/freedrumSensor.model';
import {Router} from '@angular/router';
import {GameService} from './game.service';
import {StateOfMatch} from '../models/StateOfMatch.enum';

const availablePositions = [10, 11, 12, 20, 21, 22];

@Injectable({
  providedIn: 'root'
})
export class FreedrumService {
  activeSensors = 0;

  constructor(private router: Router, private gameService: GameService) {
  }

  // connecte le senseur au navigateur
  public connect(): void {
    const currentSensor: FreedrumSensor = new FreedrumSensor('toto');
    this.activeSensors++;
    currentSensor.request()
      .then(_ => currentSensor.connect())
      .then(device => {
        currentSensor.device.addEventListener('gattserverdisconnected', () => this.onDisconnected());
      })
      .then(_ => {
        this.setupSensor(currentSensor);
      }).then(_ => {
        if (this.activeSensors === 2) {
          this.navigate();
        }
      }
    )
      .catch(error => {
        console.log(error);
      });
  }

  private onDisconnected(): void {
    this.activeSensors--;
    if (this.activeSensors < 1) {
      this.router.navigate(['']);
    }
  }

  /**
   * filtre les logrmations reçues lors des mouvements du senseur
   * @param event événement reçu
   */
  private handleData(event): void {
    const data = event.target.value;
    const command = data.getUint8(2);
    const note = data.getUint8(3);
    if (this.gameService.stateOfMatch$.value === StateOfMatch.TRAINING_MODE_LIGHT) {
      this.highlight(data);
    } else if (this.gameService.stateOfMatch$.value === StateOfMatch.TRAINING_MODE_HIT) {
      this.gameService.handleTrainingEvents(command, note);
    } else {
      this.gameService.handleDrumSticksEvents(command, note);
    }
  }

  /**
   * setup l'écoute des mouvements des senseurs
   * @param sensor senseur
   */
  private setupSensor(sensor: FreedrumSensor): void {
    sensor.setup()
      .then(characteristic => {
        characteristic.addEventListener('characteristicvaluechanged', (event) => this.handleData(event));
      });
  }

  // navigue vers l'écran de match quand 2 senseurs sont connectés
  private navigate(): void {
    setTimeout(() => this.router.navigate(['/training']), 2000);
  }

  private highlight(data) {
    if (data.buffer.byteLength === 17 && availablePositions.includes(data.getUint8(12))) {
      switch (data.getUint8(12)) {
        case 20:
          console.log('top left');
          this.highlightSlot(57);
          break;
        case 21:
          console.log('top center');
          this.highlightSlot(50);
          break;
        case 22:
          console.log('top right');
          this.highlightSlot(51);
          break;
        case 10:
          console.log('bottom left');
          this.highlightSlot(42);
          break;
        case 11:
          console.log('bottom center');
          this.highlightSlot(38);
          break;
        case 12:
          console.log('bottom right');
          this.highlightSlot(41);
          break;
        default:
          console.error('case not supported');
      }
    }
  }

  private highlightSlot(note) {
    /*
    const slots = this.gameService.slots$.value;
    slots.forEach(slot => slot.isSpotted = false);
    this.gameService.slots$.next(slots);
     */
    const index = this.gameService.slots$.value.indexOf(this.gameService.slots$.value.find(slot => slot.note === note));
    const currentSlot = {...this.gameService.slots$.value.find(slot => slot.note === note), isSpotted: true};

    this.gameService.slots$.next([
      ...this.gameService.slots$.value.slice(0, index),
      Object.assign({}, currentSlot),
      ...this.gameService.slots$.value.slice(index + 1)
    ]);
    if (this.gameService.slots$.value.find(slot => slot.isSpotted === false) === undefined) {
      setTimeout(() => this.router.navigate(['/training-two']), 1000);
    }
  }
}
