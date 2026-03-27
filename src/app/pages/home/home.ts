import { Component, OnInit, ElementRef, QueryList, ViewChildren } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home implements OnInit {
  @ViewChildren('reveal') revealEls!: QueryList<ElementRef>;

  ngOnInit() {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
          }
        });
      },
      { threshold: 0.12 }
    );

    // Observe after view init
    setTimeout(() => {
      this.revealEls.forEach((el) => observer.observe(el.nativeElement));
    });
  }
}
