import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FiltresVideojocs } from './filtres-videojocs.component';

describe('FiltresVideojocs', () => {
  let component: FiltresVideojocs;
  let fixture: ComponentFixture<FiltresVideojocs>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FiltresVideojocs],
    }).compileComponents();

    fixture = TestBed.createComponent(FiltresVideojocs);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
