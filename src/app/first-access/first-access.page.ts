import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/authentication/auth.service';

@Component({
  selector: 'app-first-access',
  templateUrl: './first-access.page.html',
  styleUrls: ['./first-access.page.scss'],
})
export class FirstAccessPage implements OnInit {
  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
  }

  logOut(): void {
    this.authService.logoutUser().then( () => {
      this.router.navigateByUrl('/');
    }

    )
  }

}
