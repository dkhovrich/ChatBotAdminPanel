import { Component, ViewEncapsulation, OnInit } from '@angular/core';
import { CacheService } from '../services/cache.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent implements OnInit {
  constructor(private cacheService: CacheService) { }

  ngOnInit(): void {
    this.cacheService.load();
  }
}
