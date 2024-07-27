import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { SharedService } from '../../services/shared.service';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  searchControl = new FormControl('');

  constructor(private sharedService: SharedService) {
    this.searchControl.valueChanges.pipe(
      debounceTime(300) // Optional: add debounce time to reduce the number of calls
    ).subscribe(value => {
      console.log(value);
      
      this.sharedService.setSearchTerm(value || '');
    });
  }
}
