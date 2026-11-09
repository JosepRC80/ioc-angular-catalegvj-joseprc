import { TestBed } from '@angular/core/testing';
import { Videojocs } from './videojocs.service';

describe('Videojocs', () => {
  let service: Videojocs;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Videojocs);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
