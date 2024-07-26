import { Component } from '@angular/core';
import { LoadingService } from './services/loading.service';  // Adjust the path if necessary

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'your-app-name';

  constructor(public loadingService: LoadingService) {}
}
