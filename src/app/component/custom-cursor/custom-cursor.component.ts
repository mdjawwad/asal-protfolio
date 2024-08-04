import { Component, HostListener, OnInit } from '@angular/core';

@Component({
  selector: 'app-custom-cursor',
  standalone: true,
  imports: [],
  templateUrl: './custom-cursor.component.html',
  styleUrl: './custom-cursor.component.css',
})
export class CustomCursorComponent implements OnInit {
  mouseX = 0;
  mouseY = 0;
  cursorX = 0;
  cursorY = 0;
  cursor!: HTMLElement;
  hoverButton!: HTMLElement;

  ngOnInit(): void {
    this.cursor = document.querySelector('.cursor') as HTMLElement;
    this.updateCursor();
  }

  @HostListener('document:mousemove', ['$event'])
  onMouseMove(event: MouseEvent): void {
    this.mouseX = event.clientX;
    this.mouseY = event.clientY;
  }

  updateCursor(): void {
    const ease = 0.5;
    const deltaX = this.mouseX - this.cursorX;
    const deltaY = this.mouseY - this.cursorY;
    this.cursorX += deltaX * ease;
    this.cursorY += deltaY * ease;
    this.cursor.style.transform = `translate3d(${this.cursorX}px, ${this.cursorY}px, 2px)`;
    requestAnimationFrame(() => this.updateCursor());
  }
}
