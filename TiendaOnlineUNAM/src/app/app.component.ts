import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from './modules/layout/component/footer/footer.component';
import { NavbarComponent } from './modules/layout/component/navbar/navbar.component';
import { ThemeSelectorComponent } from './modules/layout/component/theme-selector/theme-selector.component';
import { Navbar2Component } from './modules/layout/component/navbar2/navbar2.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FooterComponent, NavbarComponent, ThemeSelectorComponent, Navbar2Component],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'TiendaOnlineUNAM';
}
