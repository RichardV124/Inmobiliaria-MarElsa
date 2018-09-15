import { TestBed, inject } from '@angular/core/testing';

import { InmuebleService } from './inmueble.service';

describe('InmuebleService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [InmuebleService]
    });
  });

  it('should be created', inject([InmuebleService], (service: InmuebleService) => {
    expect(service).toBeTruthy();
  }));
});
