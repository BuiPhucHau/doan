import { TestBed } from '@angular/core/testing';

import { BillPdfService } from './billpdf.service';

describe('BillpdfService', () => {
  let service: BillPdfService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BillPdfService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
