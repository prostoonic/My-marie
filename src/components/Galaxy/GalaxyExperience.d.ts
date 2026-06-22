export declare class GalaxyExperience {
  static instance: GalaxyExperience | null;
  constructor(options: { targetElement: HTMLElement });
  update(): void;
  resize(): void;
  destroy(): void;
}
