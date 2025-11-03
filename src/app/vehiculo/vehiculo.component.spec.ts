/* vehiculo.component.spec.ts */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { of } from 'rxjs';
import { faker } from '@faker-js/faker';

import { VehiculoComponent } from './vehiculo.component';
import { VehiculoService } from './vehiculo.service';
import { Vehiculo } from './vehiculo';

describe('VehiculoComponent', () => {
  let fixture: ComponentFixture<VehiculoComponent>;
  let component: VehiculoComponent;
  let service: VehiculoService;

  const fakeVehiculos: Vehiculo[] = Array.from({ length: 3 }).map(() => new Vehiculo(
    faker.number.int(),
    faker.vehicle.manufacturer(), 
    faker.vehicle.model(),        
    faker.vehicle.type(),         
    faker.number.int({ min: 2000, max: 2025 }), 
    faker.number.int({ min: 1000, max: 4000 }), 
    faker.color.human(),          
    faker.lorem.sentence() 
  ));

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommonModule, HttpClientTestingModule],
      declarations: [VehiculoComponent],
      providers: [VehiculoService],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VehiculoComponent);
    component = fixture.componentInstance;
    service = TestBed.inject(VehiculoService);

    spyOn(service, 'getVehiculos').and.returnValue(of(fakeVehiculos));

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render one row per vehicle', () => {
    const rows = fixture.debugElement.queryAll(By.css('tbody tr'));
    expect(rows.length).toBe(fakeVehiculos.length);
  });

  it('should display the brand of the first vehicle', () => {
    const firstRow = fixture.debugElement.query(By.css('tbody tr'));
    const firstTd = firstRow.query(By.css('td'));
    expect(firstTd.nativeElement.textContent.trim())
      .toContain(fakeVehiculos[0].marca);
  });

  it('should emit the map of brands in the @Output', (done) => {
    component.marcasSumaTotal.subscribe((mapa: Map<string, number>) => {
      const esperado = new Map<string, number>();
      for (const v of fakeVehiculos) {
        esperado.set(v.marca, (esperado.get(v.marca) || 0) + 1);
      }
      expect(JSON.stringify([...mapa.entries()]))
        .toBe(JSON.stringify([...esperado.entries()]));
      done();
    });

    component.countVehiculos();
  });

   it('should display the table header', () => {
    const thead = fixture.nativeElement.querySelector('thead');
    expect(thead).withContext('falta <thead>').toBeTruthy();

    const headers = Array.from(
      fixture.nativeElement.querySelectorAll('thead th')
    ).map(th => (th as HTMLElement).textContent?.trim());
    expect(headers.length).toBeGreaterThan(0);
  });

  it('should render exactly 3 rows in the table body', () => {
    const rows = fixture.nativeElement.querySelectorAll('tbody tr');
    expect(rows.length).toBe(3);
  });
});
