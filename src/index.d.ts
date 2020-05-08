declare module 'imageEyes' {

  interface EyeDropper {
    image: string | undefined;
    getPixelColor: (x: number, y: number) => number[];
    getDropColor: (x: number, y: number, d: number) => number[];
    memoryUsage: () => string;
    purgeCache: () => void;
  }

  export default function imageEyes(url: string): Promise<EyeDropper>;
}
