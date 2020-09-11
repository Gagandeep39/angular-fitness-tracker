import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Subscription, Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import * as fromRoot from '../../app.reducer';
import { ThemeService } from 'src/app/services/theme.service';
import { Option } from 'src/app/models/option.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  @Output()
  toggleSideNav = new EventEmitter<void>();
  isAuth$: Observable<boolean>;
  options$: Observable<Array<Option>> = this.themeService.getThemeOptions();

  constructor(
    private authService: AuthService,
    private store: Store<fromRoot.State>,
    private themeService: ThemeService
  ) {}

  ngOnInit(): void {
    this.isAuth$ = this.store.select(fromRoot.getIsAuthenticated);
  }

  onToggleSideNav() {
    this.toggleSideNav.emit();
  }

  onLogout() {
    this.authService.logout();
  }

  themeChangeHandler(themeToSet: string) {
    this.themeService.setTheme(themeToSet);
  }
}
