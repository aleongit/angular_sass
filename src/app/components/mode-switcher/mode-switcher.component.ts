import { Component } from '@angular/core';
import { Router, RouterLink, ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-mode-switcher',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './mode-switcher.component.html',
  styleUrl: './mode-switcher.component.scss',
})
export class ModeSwitcherComponent {
  public isLightTheme = true;
  iconLightTheme = 'light_mode';
  iconDarkTheme = 'dark_mode';

  onThemeSwitchChange() {
    console.log('onThemeSwitchChange()!');
    this.isLightTheme = !this.isLightTheme;

    //document.documentElement = <html>
    document.documentElement.setAttribute(
      'data-theme',
      this.isLightTheme ? 'light' : 'dark'
    );
  }
}
