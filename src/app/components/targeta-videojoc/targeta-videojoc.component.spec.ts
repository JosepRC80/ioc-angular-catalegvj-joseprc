import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TargetaVideojoc } from './targeta-videojoc.component';

describe('TargetaVideojoc', () => {
  let component: TargetaVideojoc;
  let fixture: ComponentFixture<TargetaVideojoc>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TargetaVideojoc],
    }).compileComponents();

    fixture = TestBed.createComponent(TargetaVideojoc);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
