import { Injectable } from '@angular/core';
import { Router, RouterLink, ActivatedRoute, ParamMap } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private THEME_LIGHT = 'light';
  private THEME_DARK = 'dark';
  public theme?: string;

  constructor(private route: ActivatedRoute) {
    /*
    this.theme =
      document.documentElement.getAttribute('data-theme') === this.THEME_LIGHT
        ? this.THEME_LIGHT
        : this.THEME_DARK;
    console.log('in constructor of ThemeService!');
    console.log(document.documentElement.getAttribute('data-theme'));
    console.log(this.theme);
    */
    console.log('in constructor of ThemeService!');

    //get query params
    //get 'theme' i sinó estableix 'light'
    this.route.queryParamMap.subscribe((params: any) => {
      const theme = params.get('theme');
      theme ? (this.theme = theme) : (this.theme = 'light');
      //console.log(`params.get('theme'): ${theme}`);
      //console.log(`this.theme: ${this.theme}`);

      //set theme
      this.theme === this.THEME_LIGHT
        ? this.setLightTheme()
        : this.setDarkTheme();
    });
  }

  public setLightTheme(): void {
    //document.documentElement = <html>
    document.documentElement.setAttribute('data-theme', this.THEME_LIGHT);
    console.log(this.theme);
  }
  public setDarkTheme(): void {
    //document.documentElement = <html>
    document.documentElement.setAttribute('data-theme', this.THEME_DARK);
    console.log(this.theme);
  }
}
