import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JuegosInventarioComponent } from './juegos-inventario.component';

describe('JuegosInventarioComponent', () => {
  let component: JuegosInventarioComponent;
  let fixture: ComponentFixture<JuegosInventarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [JuegosInventarioComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(JuegosInventarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
