import { Component, Input, ViewChild } from '@angular/core';

@Component({
  selector: 'app-g-button',
  standalone: true,
  imports: [],
  templateUrl: './g-button.component.html',
  styleUrl: './g-button.component.scss'
})
export class GButtonComponent {
  @ViewChild('myInput') input: any;
  @Input() btnText = ""; 
  @Input() btnLink = ""; 
}
