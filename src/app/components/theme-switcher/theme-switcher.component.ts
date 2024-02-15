import { Component, OnInit } from '@angular/core';
import { Router, RouterLink, ActivatedRoute } from '@angular/router';
import { ThemeService } from '../../services/theme.service';

@Component({
  selector: 'app-theme-switcher',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './theme-switcher.component.html',
  styleUrl: './theme-switcher.component.scss',
})
export class ThemeSwitcherComponent implements OnInit {
  public isLightTheme = true;
  iconLightTheme = 'light_mode';
  iconDarkTheme = 'dark_mode';

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private themeService: ThemeService
  ) {}

  ngOnInit(): void {
    this.getQueryParams();
  }

  getQueryParams(): void {
    //query params
    this.route.queryParamMap.subscribe((params: any) => {
      const theme = params.get('theme') ?? 'light';
      theme === 'light'
        ? (this.isLightTheme = true)
        : (this.isLightTheme = false);

      console.log('getQueryParams() in theme-switcher!');
      console.log(`theme = ${theme}`);
      console.log(`this.isLightTheme = ${this.isLightTheme}`);
    });
  }

  onThemeSwitchChange() {
    console.log('onThemeSwitchChange()!');
    this.isLightTheme = !this.isLightTheme;
    console.log(this.isLightTheme);

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
