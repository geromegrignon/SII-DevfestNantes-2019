import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GameComponent } from './game.component';
import {DrumkitComponent} from '../components/drumkit/drumkit.component';
import {SlotComponent} from '../components/slot/slot.component';
import {RouterTestingModule} from '@angular/router/testing';
import {CountdownComponent} from '../components/countdown/countdown.component';

describe('GameComponent', () => {
  let component: GameComponent;
  let fixture: ComponentFixture<GameComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GameComponent, DrumkitComponent, SlotComponent, CountdownComponent ],
      imports: [RouterTestingModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
