import { TestBed, inject } from '@angular/core/testing';

import { PersonaService } from './persona.service';

describe('PersonalService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PersonaService]
    });
  });

  it('should be created', inject([PersonaService], (service: PersonaService) => {
    expect(service).toBeTruthy();
  }));
});
