import { TestBed } from '@angular/core/testing';

import { GameService } from './game.service';
import {RouterTestingModule} from '@angular/router/testing';

describe('GameService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [RouterTestingModule]
  }));

  it('should be created', () => {
    const service: GameService = TestBed.get(GameService);
    expect(service).toBeTruthy();
  });

  it(' score multiplicator should be 4', () => {
    const service: GameService = TestBed.get((GameService));
    service.match.counter = 45;
    expect(service.scoreMultiplicator).toEqual(4);
  });

  it(' score multiplicator should be 1', () => {
    const service: GameService = TestBed.get(GameService);
    service.match.counter = 0;
    expect(service.scoreMultiplicator).toEqual(1);
  });
  for (let i = 0; i < 100; i++) {
    it('random index should be under 3', () => {
      const service: GameService = TestBed.get(GameService);
      expect(service['getRandomInt'](3)).toBeLessThan(3);
    });
  }
  it('should return undefined characterType', () => {
    const service: GameService = TestBed.get(GameService);
    service.slots$.next([{isActive: false, note: 50, characterType: 'rockstar', isSpotted: false}]);
    service['updateSlot'](service.slots$.value[0]);
    expect(service.slots$.value[0].characterType).toBeUndefined();
  });
});
