import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { guardloginGuard } from './guardlogin.guard';

describe('guardloginGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => guardloginGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
