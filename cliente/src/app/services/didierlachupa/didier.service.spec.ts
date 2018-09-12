import { TestBed, inject } from '@angular/core/testing';

import { DidierService } from './didier.service';

describe('DidierService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DidierService]
    });
  });

  it('should be created', inject([DidierService], (service: DidierService) => {
    expect(service).toBeTruthy();
  }));
});
