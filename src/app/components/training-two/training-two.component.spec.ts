import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainingTwoComponent } from './training-two.component';
import {SlotComponent} from '../slot/slot.component';
import {RouterTestingModule} from '@angular/router/testing';
import {of} from 'rxjs';
import {Slot} from '../../models/Slot.model';

describe('TrainingTwoComponent', () => {
  let component: TrainingTwoComponent;
  let fixture: ComponentFixture<TrainingTwoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrainingTwoComponent, SlotComponent ],
      imports: [RouterTestingModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrainingTwoComponent);
    component = fixture.componentInstance;
    component.slots$ = of([new Slot(50)]);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
