import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FabricanteService {
  private fabricantes: string[] = [];
  fabricanteAdded = new Subject<void>();

  adicionarFabricante(fabricante: string): void {
    if (!this.fabricantes.includes(fabricante)) {
      this.fabricantes.push(fabricante);
      this.fabricanteAdded.next();
    }
  }

  getFabricantes(): string[] {
    return this.fabricantes;
  }
}
