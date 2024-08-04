import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { AfterViewInit, Component } from '@angular/core';

@Component({
  selector: 'app-sshh',
  standalone: true,
  imports: [],
  templateUrl: './sshh.component.html',
  styleUrl: './sshh.component.css'
})
export class SshhComponent implements AfterViewInit {
 
constructor(){
    
  gsap.registerPlugin(ScrollTrigger);
}
ngAfterViewInit(): void {


  
  gsap.to(".c1 h1", {
    duration: 1,
    ease: "expo.in",
    transform: "translateX(-100%)",
    scrollTrigger: {
      trigger: ".c1",
      scroller: "body",
      markers: true,
      start: "top 0%",
      end: "top -150%",
      scrub: 2,
      pin: true
    }
  });
}

}
