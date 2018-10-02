import { TestBed } from '@angular/core/testing';

import { ArriendosService } from './arriendos.service';

describe('ArriendosService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ArriendosService = TestBed.get(ArriendosService);
    expect(service).toBeTruthy();
  });
});
