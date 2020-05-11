declare module 'imageEyes' {
  interface EyeDropper {

    image: object | undefined;
    getColorModel: () => string | undefined;
    getMetaData: (query: object) => object;
    getPixelColor: (x: number, y: number) => number[] | undefined;
    getDropColor: (x: number, y: number, d: number) => number[] | undefined;
    imageMemoryUsage: () => string;
    memoryUsage: () => string;
    purgeCache: () => void;
  }

  export default function imageEyes(url: string): Promise<EyeDropper>;
}
