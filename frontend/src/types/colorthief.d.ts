declare module 'colorthief' {
  export default class ColorThief {
    getColor(img: HTMLImageElement | HTMLCanvasElement): [number, number, number];
    getPalette(img: HTMLImageElement | HTMLCanvasElement, colorCount?: number): Array<[number, number, number]>;
  }
} 