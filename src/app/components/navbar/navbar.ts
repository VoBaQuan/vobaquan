import { Component, signal, HostListener } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar {
  menuOpen = signal(false);

  links = [
    { label: 'Home',     path: '/' },
    { label: 'About',    path: '/about' },
    { label: 'Projects', path: '/projects' },
    { label: 'Contact',  path: '/contact' },
  ];

  toggleMenu() {
    this.menuOpen.update((v) => !v);
  }

  closeMenu() {
    this.menuOpen.set(false);
  }

  // Đóng menu khi resize lên desktop
  @HostListener('window:resize', ['$event'])
  onResize(e: Event) {
    if ((e.target as Window).innerWidth >= 768) {
      this.menuOpen.set(false);
    }
  }
}
