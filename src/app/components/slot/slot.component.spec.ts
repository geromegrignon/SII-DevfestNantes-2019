import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SlotComponent } from './slot.component';
import {Slot} from '../../models/Slot.model';
import {RouterTestingModule} from '@angular/router/testing';

describe('SlotComponent', () => {
  let component: SlotComponent;
  let fixture: ComponentFixture<SlotComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SlotComponent ],
      imports: [RouterTestingModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SlotComponent);
    component = fixture.componentInstance;
    component.slot = new Slot(57);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
