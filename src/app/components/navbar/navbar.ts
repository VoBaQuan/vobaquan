import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar {
  links = [
    { label: 'Home',     path: '/' },
    { label: 'About',    path: '/about' },
    { label: 'Projects', path: '/projects' },
    { label: 'Contact',  path: '/contact' },
  ];
}
