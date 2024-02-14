import { Component } from '@angular/core';
import { Router, RouterLink, ActivatedRoute, ParamMap } from '@angular/router';
import { ThemeService } from '../../services/theme.service';

@Component({
  selector: 'app-theme-switcher',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './theme-switcher.component.html',
  styleUrl: './theme-switcher.component.scss',
})
export class ThemeSwitcherComponent {
  public isLightTheme = true;
  iconLightTheme = 'light_mode';
  iconDarkTheme = 'dark_mode';

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private themeService: ThemeService
  ) {}

  onThemeSwitchChange() {
    console.log('onThemeSwitchChange()!');
    this.isLightTheme = !this.isLightTheme;

    this.isLightTheme
      ? this.themeService.setLightTheme()
      : this.themeService.setDarkTheme();

    //set url relativa, no passem url, per evitar problemes de "/" a la url
    this.router.navigate([], {
      queryParams: { theme: this.isLightTheme ? 'light' : 'dark' },
      queryParamsHandling: 'merge',
      relativeTo: this.route,
    });
  }
}
