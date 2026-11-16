
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TargetaVideojoc } from './targeta-videojoc.component';
import { Element } from '../../models/element.model';

describe('TargetaVideojoc', () => {
  let component: TargetaVideojoc;
  let fixture: ComponentFixture<TargetaVideojoc>;

  // Videojoc de prova per proporcionar dades al component
  const videojocProva: Element = {
    id: '1',
    titol: 'Super Mario Bros',
    descripcio: 'Videojoc de prova',
    categoria: 'plataformes',
    plataforma: 'nes',
    dataLlancament: '1985-09-13',
    valoracio: 9.5,
    destacat: true
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TargetaVideojoc],
    }).compileComponents();

    fixture = TestBed.createComponent(TargetaVideojoc);
    component = fixture.componentInstance;

    // Assignem el videojoc abans que Angular renderitzi la plantilla
    fixture.componentRef.setInput('videojoc', videojocProva);

    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
