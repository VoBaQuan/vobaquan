import { Component, OnInit, signal, WritableSignal } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home implements OnInit {
  greeting = signal('');
  name     = signal('');
  // 'greeting' → đang gõ greeting | 'name' → đang gõ name | 'done' → xong
  phase = signal<'greeting' | 'name' | 'done'>('greeting');

  ngOnInit() {
    // Delay nhỏ trước khi bắt đầu gõ
    setTimeout(() => {
      this.type("Hi, I'm", this.greeting, 80, () => {
        // Dừng 500ms rồi bắt đầu gõ tên
        setTimeout(() => {
          this.phase.set('name');
          this.type('Vo Ba Quan.', this.name, 110, () => {
            this.phase.set('done');
          });
        }, 500);
      });
    }, 400);
  }

  private type(
    text: string,
    target: WritableSignal<string>,
    speed: number,
    onDone?: () => void
  ) {
    let i = 0;
    const tick = () => {
      if (i < text.length) {
        target.update((v) => v + text[i]);
        i++;
        setTimeout(tick, speed + Math.random() * 40); // jitter tự nhiên
      } else {
        onDone?.();
      }
    };
    tick();
  }
}
