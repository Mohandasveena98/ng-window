import { TestBed } from '@angular/core/testing';

import { NgWindowService } from './ng-window.service';

describe('NgWindowService', () => {
  let service: NgWindowService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NgWindowService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
