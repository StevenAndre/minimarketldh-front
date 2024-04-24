import { TestBed } from '@angular/core/testing';

import { ForgetpasswService } from './forgetpassw.service';

describe('ForgetpasswService', () => {
  let service: ForgetpasswService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ForgetpasswService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
