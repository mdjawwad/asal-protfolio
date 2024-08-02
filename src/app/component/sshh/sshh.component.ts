import { Component } from '@angular/core';

@Component({
  selector: 'app-sshh',
  standalone: true,
  imports: [],
  templateUrl: './sshh.component.html',
  styleUrl: './sshh.component.css'
})
export class SshhComponent {

  ngOnInit(): void {

 
    'use strict';

    // Adding scroll event listener
    document.addEventListener('scroll', horizontalScroll);

    //Selecting Elements
    let sticky  = document.querySelector('.sticky' ) as HTMLElement;
    let stickyParent: HTMLElement | null =
      document.querySelector('.sticky-parent');

    let scrollWidth: number = sticky?.scrollWidth || 0;
    let verticalScrollHeight: number =
      (stickyParent?.getBoundingClientRect().height || 0) -
      (sticky?.getBoundingClientRect().height || 0);

    //Scroll function
    function horizontalScroll(): void {
      //Checking whether the sticky element has entered into view or not
      let stickyPosition: number = sticky?.getBoundingClientRect().top || 0;
      if (stickyPosition > 1) {
        return;
      } else {
        let scrolled: number = stickyParent?.getBoundingClientRect().top || 0; //how much is scrolled?
        sticky.scrollLeft = (scrollWidth / verticalScrollHeight) * -scrolled * 0.95;
      }
    }
  }

}
