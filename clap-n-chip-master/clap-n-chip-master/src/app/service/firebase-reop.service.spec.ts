import { TestBed } from '@angular/core/testing';

import { FirebaseRepoService } from './firebase-reop.service';

describe('FirebaseReopService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FirebaseRepoService = TestBed.get(FirebaseRepoService);
    expect(service).toBeTruthy();
  });
});
