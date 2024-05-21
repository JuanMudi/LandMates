import { TestBed } from '@angular/core/testing';

import { NewPropertyService } from './new-property.service';

describe('NewPropertyService', () => {
  let service: NewPropertyService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NewPropertyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
