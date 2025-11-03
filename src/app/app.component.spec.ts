// app.component.spec.ts
import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-vehiculo',
  template: '',
})
class VehiculoStubComponent {
  @Output() marcasSumaTotal = new EventEmitter<Map<string, number>>();
}

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        VehiculoStubComponent, 
      ],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'evaluacion-angular-german'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('evaluacion-angular-german');
  });

  it('should render TuSegundazo.com title', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h2')?.textContent).toContain('TuSegundazo.com');
  });
});
