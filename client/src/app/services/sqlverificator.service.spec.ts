import { TestBed } from '@angular/core/testing';

import { SQLVerificatorService } from './sqlverificator.service';

describe('SQLVerificatorService', () => {
  let service: SQLVerificatorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SQLVerificatorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
