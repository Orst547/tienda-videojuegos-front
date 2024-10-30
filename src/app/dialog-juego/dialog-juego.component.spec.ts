import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogJuegoComponent } from './dialog-juego.component';

describe('DialogJuegoComponent', () => {
  let component: DialogJuegoComponent;
  let fixture: ComponentFixture<DialogJuegoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DialogJuegoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DialogJuegoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
