import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'evaluacion-angular-german';

  totalMarcasPadre: Map<string, number> = new Map();

  onMarcasSumaTotal(totals: Map<string, number>) {
    this.totalMarcasPadre = totals;
  }
}
