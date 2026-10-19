import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LlistaVideojocs } from './llista-videojocs.component';

describe('LlistaVideojocs', () => {
  let component: LlistaVideojocs;
  let fixture: ComponentFixture<LlistaVideojocs>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LlistaVideojocs],
    }).compileComponents();

    fixture = TestBed.createComponent(LlistaVideojocs);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
