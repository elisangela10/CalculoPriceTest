import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  editTabTitle: boolean[] = [false, false];
  tabTitles: string[] = ['Cadastro', 'Cálculo de Preços'];
}
