import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DrumkitComponent } from './drumkit.component';

describe('DrumkitComponent', () => {
  let component: DrumkitComponent;
  let fixture: ComponentFixture<DrumkitComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DrumkitComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DrumkitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
