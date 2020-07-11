import { Component, ViewChild, AfterViewInit, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { take } from 'rxjs/operators';
@Component({
  selector: 'app-notFound',
  template: `
    <h2>
      Page Not Found
    </h2>
  `,
  
})
export class PageNotFoundComponent implements OnInit {
  path: string;
  constructor(private route: ActivatedRoute) {}
  ngOnInit() {
  }
}