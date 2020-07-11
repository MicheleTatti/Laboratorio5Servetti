import { Component, ViewChild, OnInit, ChangeDetectionStrategy, AfterViewInit } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { MatDialog } from '@angular/material/dialog';
import { LoginDialogComponent } from './auth/login-dialog.component';
import { ActivatedRoute, RouteConfigLoadEnd, ParamMap, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from './auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {


  course = 'Applicazioni Internet'

  opened: boolean;
  email: string;
  loggedIn: boolean = false;
  logged: Subscription

  constructor(public dialog: MatDialog, public route: ActivatedRoute, private authService: AuthService, private router: Router) {
    this.loggedIn = authService.isLoggedIn();
  }

  ngOnInit() {
    this.logged = this.route.queryParams.subscribe(params => {
      var log = params['doLogin'];
      if (log)
        this.openDialog()
    });
  }

  @ViewChild('sidenav') sidenav: MatSidenav

  toggleForMenuClick(event: Event) {
    this.sidenav.toggle()
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(LoginDialogComponent, {
      width: '300px',
      data: { error: false }
    });

    dialogRef.afterClosed().subscribe(result => {
     
      if(result === undefined)
       this.router.navigate(['/home'])
      else 
       this.loggedIn = result;
    })
  }

  ngOnDestroy() {
    this.logged.unsubscribe()
  }

  logout() {
    this.authService.logout();
    this.loggedIn = false;
    this.router.navigate(['/home'])
  }
}
