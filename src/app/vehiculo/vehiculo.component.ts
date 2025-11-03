import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Vehiculo } from './vehiculo';
import { VehiculoService } from './vehiculo.service';

@Component({
  selector: 'app-vehiculo',
  templateUrl: './vehiculo.component.html',
  styleUrls: ['./vehiculo.component.css']
})
export class VehiculoComponent implements OnInit {
  vehiculos: Vehiculo[] = [];
  mapaCarros = new Map<string, number>();

  @Output() marcasSumaTotal = new EventEmitter<Map<string, number>>();

  constructor(private vehiculoService: VehiculoService) {}

  ngOnInit() {
    this.getVehiculos();
  }

  getVehiculos() {
    this.vehiculoService.getVehiculos().subscribe(data => {
      this.vehiculos = data;
      this.countVehiculos();    
    });
  }

  countVehiculos() {
    this.mapaCarros = new Map<string, number>();
    for (const v of this.vehiculos) {
      this.mapaCarros.set(v.marca, (this.mapaCarros.get(v.marca) || 0) + 1);
    }
    this.marcasSumaTotal.emit(this.mapaCarros);
  }
}
