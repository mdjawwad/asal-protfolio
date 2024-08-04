import { Component } from '@angular/core';
import { GButtonComponent } from '../g-button/g-button.component';
import { SshhComponent } from '../sshh/sshh.component';

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [GButtonComponent,SshhComponent],
  templateUrl: './landing.component.html',
  styleUrl: './landing.component.css',
})
export class LandingComponent {
  ngOnInit(): void {
    const theme = document.body.classList.toggle('dark-mode')
 
    const sun = document.querySelector('.sun') as HTMLElement;
    const moon = document.querySelector('.moon') as HTMLElement;
    const button = document.querySelector('.toggle-container') as HTMLElement;
    button.addEventListener('click', () => {

 
  moon.classList.toggle('visible');
  
 
  sun.classList.toggle('visible');
  


    });
  }
}
