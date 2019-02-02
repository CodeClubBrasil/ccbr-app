import { TestBed, inject } from '@angular/core/testing';

import { CodeClubApiService } from './code-club-api.service';

describe('CodeClubApiService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CodeClubApiService]
    });
  });

  it('should be created', inject([CodeClubApiService], (service: CodeClubApiService) => {
    expect(service).toBeTruthy();
  }));
});
