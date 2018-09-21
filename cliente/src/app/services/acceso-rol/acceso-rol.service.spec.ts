import { TestBed, inject } from '@angular/core/testing';

import { AccesoRolService } from './acceso-rol.service';

describe('AccesoRolService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AccesoRolService]
    });
  });

  it('should be created', inject([AccesoRolService], (service: AccesoRolService) => {
    expect(service).toBeTruthy();
  }));
});
