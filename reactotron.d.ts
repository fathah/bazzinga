declare global {
  interface Console {
    tron: {
      log: (tag: string, msg: unknown) => void;
      error: (tag: string, msg: unknown) => void;
      warn: (msg: string) => void;
    };
  }
}

export {};
