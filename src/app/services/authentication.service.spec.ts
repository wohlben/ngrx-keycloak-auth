import { TestBed } from '@angular/core/testing';

import { AuthenticationService } from './authentication.service';
import {RouterModule} from '@angular/router';

describe('AuthenticationService', () => {
  let service: AuthenticationService;

  beforeEach(() => {
    TestBed.configureTestingModule({imports: [RouterModule.forRoot([])]});
    service = TestBed.inject(AuthenticationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
