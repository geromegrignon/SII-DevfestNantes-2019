import { TestBed, inject } from '@angular/core/testing';

import { SensorGuard } from './sensor.guard';
import {RouterTestingModule} from '@angular/router/testing';

describe('SensorGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SensorGuard],
      imports: [RouterTestingModule]
    });
  });

  it('should ...', inject([SensorGuard], (guard: SensorGuard) => {
    expect(guard).toBeTruthy();
  }));
});
