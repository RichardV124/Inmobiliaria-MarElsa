import { TestBed } from '@angular/core/testing';

import { ExperienciaService } from './experiencia.service';

describe('ExperienciaService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ExperienciaService = TestBed.get(ExperienciaService);
    expect(service).toBeTruthy();
  });
});
