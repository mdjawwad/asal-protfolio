import {   AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
 


@Component({
  selector: 'app-custom-bg',
  standalone: true,
  imports: [],
  templateUrl: './custom-bg.component.html',
  styleUrl: './custom-bg.component.css'
})
export class CustomBgComponent  implements OnInit, AfterViewInit, OnDestroy {
  private canvas!: HTMLCanvasElement;
  private ctx!: CanvasRenderingContext2D;
  private animationFrameId: number | undefined;

  constructor() {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.initCanvas();
    this.animate();
  }

  ngOnDestroy(): void {
    window.removeEventListener('resize', this.resizeCanvas);
    if (this.animationFrameId) {
      cancelAnimationFrame(this.animationFrameId);
    }
  }

  private initCanvas(): void {
    this.canvas = document.getElementById('noise-canvas') as HTMLCanvasElement;
    this.ctx = this.canvas.getContext('2d') as CanvasRenderingContext2D;
    this.resizeCanvas();
    window.addEventListener('resize', this.resizeCanvas.bind(this));
  }

  private resizeCanvas(): void {
    const devicePixelRatio = window.devicePixelRatio || 1;
    this.canvas.width = window.innerWidth * devicePixelRatio;
    this.canvas.height = window.innerHeight * devicePixelRatio;
    this.canvas.style.width = `${window.innerWidth}px`;
    this.canvas.style.height = `${window.innerHeight}px`;
    this.ctx.scale(devicePixelRatio, devicePixelRatio);
  }

  private generateNoise(): void {
    const width = this.canvas.width;
    const height = this.canvas.height;
    const imageData = this.ctx.createImageData(width, height);
    const buffer32 = new Uint32Array(imageData.data.buffer);
    const length = buffer32.length;

    for (let i = 0; i < length; i++) {
      buffer32[i] = Math.random() < 0.5 ? 0xffffffff : 0;
    }

    this.ctx.putImageData(imageData, 0, 0);
  }

  private animate(): void {
    this.generateNoise();
    this.animationFrameId = requestAnimationFrame(this.animate.bind(this));
  }
}