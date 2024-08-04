import { Injectable, Renderer2, RendererFactory2 } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class NoiseBackgroundService {
  private renderer: Renderer2;
  private canvas!: HTMLCanvasElement;
  private ctx!: CanvasRenderingContext2D;
  private animationFrameId: number | undefined;

  constructor(rendererFactory: RendererFactory2) {
    this.renderer = rendererFactory.createRenderer(null, null);
  }

  public init(): void {
    this.initCanvas();
  }

  private initCanvas(): void {
    this.canvas = this.renderer.createElement('canvas');
    this.ctx = this.canvas.getContext('2d') as CanvasRenderingContext2D;
    this.renderer.setStyle(this.canvas, 'position', 'fixed');
    this.renderer.setStyle(this.canvas, 'background', 'blue');
    this.renderer.setStyle(this.canvas, 'opacity', '0.1');
    this.renderer.setStyle(this.canvas, 'top', '0');
    this.renderer.setStyle(this.canvas, 'left', '0');
    this.renderer.setStyle(this.canvas, 'width', '100vw');
    this.renderer.setStyle(this.canvas, 'height', '100vh');
    this.renderer.setStyle(this.canvas, 'pointer-events', 'none');
    this.renderer.setStyle(this.canvas, 'z-index', '1');
    document.body.appendChild(this.canvas);
    this.resizeCanvas();
    window.addEventListener('resize', this.resizeCanvas.bind(this));
    this.animate();
  }

  private resizeCanvas(): void {
    const devicePixelRatio = window.devicePixelRatio || 1;
    this.canvas.width = window.innerWidth * devicePixelRatio;
    this.canvas.height = window.innerHeight * devicePixelRatio;
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

  public destroy(): void {
    window.removeEventListener('resize', this.resizeCanvas.bind(this));
    if (this.animationFrameId) {
      cancelAnimationFrame(this.animationFrameId);
    }
    document.body.removeChild(this.canvas);
  }
}
