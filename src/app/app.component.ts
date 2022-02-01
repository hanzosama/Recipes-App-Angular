import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  loadfeature = 'recipe';

  onNavigate(feature: string) {
    this.loadfeature = feature;
  }
}
