import { TestBed } from '@angular/core/testing';

import { FreedrumService } from './freedrum.service';
import {RouterTestingModule} from '@angular/router/testing';

describe('FreedrumService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [RouterTestingModule]
  }));

  it('should be created', () => {
    const service: FreedrumService = TestBed.get(FreedrumService);
    expect(service).toBeTruthy();
  });
});
