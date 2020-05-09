declare module 'imageEyes' {
  interface EyeDropper {
    image: object | undefined;
    getColorModel: (x: number, y: number) => string | undefined;
    getPixelColor: (x: number, y: number) => number[] | undefined;
    getDropColor: (x: number, y: number, d: number) => number[] | undefined;
    memoryUsage: () => number;
    purgeCache: () => void;
  }

  export default function imageEyes(url: string): Promise<EyeDropper>;
}
