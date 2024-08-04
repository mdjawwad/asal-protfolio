import { Component, OnDestroy, OnInit, Renderer2 } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LandingComponent } from './component/landing/landing.component';
import { ProjectsComponent } from './component/projects/projects.component';
import { ContactComponent } from './component/contact/contact.component';
import { CommonModule } from '@angular/common';
import { LoadingComponent } from './component/loading/loading.component';
import { SkillsComponent } from './component/skills/skills.component';
import AOS from 'aos';
import { SshhComponent } from './component/sshh/sshh.component';
import { CustomCursorComponent } from './component/custom-cursor/custom-cursor.component';
import { CustomBgComponent } from './component/custom-bg/custom-bg.component';
import { NoiseBackgroundService } from './service/noise-bg/noise-background.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    ProjectsComponent,
    SkillsComponent,
    ContactComponent,
    CustomCursorComponent,
    CustomBgComponent,
    CommonModule,
    LoadingComponent,
    LandingComponent,
    SshhComponent,
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'asal-design';

  constructor(
    private renderer: Renderer2,
    private noiseBackgroundService: NoiseBackgroundService
  ) {}

  ngOnInit(): void {
    this.noiseBackgroundService.init();

    AOS.init();

    // Loader logic
    document.addEventListener('DOMContentLoaded', function () {
      const loadingContainer = document.getElementById(
        'loading-container'
      ) as HTMLElement;
      const content = document.getElementById('content') as HTMLElement;
      setTimeout(() => {
        loadingContainer.classList.add('hidden');
        content.style.display = 'block';
      }, 4000);
    });

    // Dark mode toggle function
    const theme = localStorage.getItem('theme') || 'dark';
    if (theme === 'dark') {
      this.renderer.addClass(document.body, 'dark-mode');
    }
    document
      .getElementById('themeToggleBtn')
      ?.addEventListener('click', () => this.toggleTheme());
  }

  ngOnDestroy(): void {
    this.noiseBackgroundService.destroy();
  }

  toggleTheme() {
    const theme = document.body.classList.toggle('dark-mode')
      ? 'dark'
      : 'light';
    localStorage.setItem('theme', theme);
  }
}
