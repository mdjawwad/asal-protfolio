import { Component, HostListener, Renderer2 } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LandingComponent } from './component/landing/landing.component';
import { ProjectsComponent } from './component/projects/projects.component';
import { ContactComponent } from './component/contact/contact.component';
import { CommonModule } from '@angular/common';
import { LoadingComponent } from './component/loading/loading.component';
import { SkillsComponent } from './component/skills/skills.component';
import AOS from 'aos';
import { SshhComponent } from "./component/sshh/sshh.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    ProjectsComponent,
    SkillsComponent,
    ContactComponent,
    CommonModule,
    LoadingComponent,
    LandingComponent,
    SshhComponent
],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'asal-design';

  constructor(private renderer: Renderer2) {}

  ngOnInit(): void {
    AOS.init();
    //loader logic
    document.addEventListener('DOMContentLoaded', function () {
      const loadingContainer = document.getElementById(
        'loading-container'
      ) as HTMLElement;
      const content = document.getElementById('content') as HTMLElement;
      setTimeout(() => {
        loadingContainer.classList.add('hidden');
        content.style.display = 'block';
      }, 5000);
    });

    // dark mode toggle function
    const theme = localStorage.getItem('theme') || 'dark';
    if (theme === 'dark') {
      this.renderer.addClass(document.body, 'dark-mode');
    }
    document
      .getElementById('themeToggleBtn')
      ?.addEventListener('click', () => this.toggleTheme());

    // noise bg canvas logic
    const canvas = document.querySelector('canvas') as HTMLCanvasElement,
      ctx = canvas.getContext('2d');

    canvas.width = canvas.height = 128;

    resize();
    window.onresize = resize;

    function resize() {
      canvas.width = (window.innerWidth * window.devicePixelRatio) / 1;
      canvas.height = (window.innerHeight * window.devicePixelRatio) / 1;
      canvas.style.width = window.innerWidth + 'px';
      canvas.style.height = window.innerHeight + 'px';
    }

    function noise(ctx: any) {
      const w = ctx.canvas.width,
        h = ctx.canvas.height,
        iData = ctx.createImageData(w, h),
        buffer32 = new Uint32Array(iData.data.buffer),
        len = buffer32.length;
      let i = 1;

      for (; i < len; i++) if (Math.random() < 0.5) buffer32[i] = 0xffffffff;

      ctx.putImageData(iData, 0, 0);
    }

    (function loop() {
      noise(ctx);
      requestAnimationFrame(loop);
    })();

    // cursor logic

    let mouseX = 0;
    let mouseY = 0;
    const cursor = document.querySelector('.cursor') as HTMLElement;

    document.addEventListener('mousemove', (e) => {
      mouseX = e.pageX;
      mouseY = e.pageY;
    });

    function updateCursor() {
      const delay = 0;
      const ease = 0.9;

      const deltaX = mouseX - cursor.offsetLeft;
      const deltaY = mouseY - cursor.offsetTop;

      cursor.style.left = `${cursor.offsetLeft + deltaX * ease}px`;
      cursor.style.top = `${cursor.offsetTop + deltaY * ease}px`;

      requestAnimationFrame(updateCursor);
    }

    updateCursor();
  }

  toggleTheme() {
    const theme = document.body.classList.toggle('dark-mode')
      ? 'dark'
      : 'light';
    localStorage.setItem('theme', theme);
  }
}
