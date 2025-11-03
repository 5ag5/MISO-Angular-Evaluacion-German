/* tslint:disable:no-unused-variable */

import { ComponentFixture, TestBed, async, inject } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { VehiculoService } from './vehiculo.service';
import { faker } from '@faker-js/faker';
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { VehiculoComponent } from './vehiculo.component';
import { AppComponent } from '../app.component';
import { RouterTestingModule } from '@angular/router/testing';
import { Vehiculo } from './vehiculo';


describe('Service: Vehiculo', () => {
  let component: VehiculoComponent;
 let fixture: ComponentFixture<VehiculoComponent>;
 let debug: DebugElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [VehiculoService],
      imports: [HttpClientTestingModule],
      declarations: [
       AppComponent, VehiculoComponent
     ],
    });
  });

   beforeEach(() => {
   fixture = TestBed.createComponent(VehiculoComponent);
   component = fixture.componentInstance;
   component.vehiculos = [
     new Vehiculo(faker.number.int(), faker.lorem.sentence(), faker.lorem.sentence(), faker.lorem.sentence(), faker.number.int(), faker.number.int(), faker.color.human(), faker.image.url())
   ]

   fixture.detectChanges();
   debug = fixture.debugElement;
 });


  it('should ...', inject([VehiculoService], (service: VehiculoService) => {
    expect(service).toBeTruthy();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'German Evaluacion Angular'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('German Evaluacion Angular');
  });
});
