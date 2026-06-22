import React, { useEffect, useRef } from 'react';

const loadGalaxy = () => import('./GalaxyExperience.js');

export const Galaxy: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let stopped = false;
    const containerElement = containerRef.current;
    if (!containerElement) return;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let experienceInstance: any = null;

    const init = async () => {
      const module = await loadGalaxy();
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const GalaxyExperienceClass = (module as any).GalaxyExperience;

      if (stopped) return;

      // Reset singleton so a fresh instance is created with the correct target element
      GalaxyExperienceClass.instance = null;

      // GalaxyExperience manages its own requestAnimationFrame loop internally
      experienceInstance = new GalaxyExperienceClass({ targetElement: containerElement });
    };

    init();

    return () => {
      stopped = true;

      if (experienceInstance) {
        // Stop the internal RAF loop: replacing update with a no-op prevents
        // the already-scheduled frame from queuing another one
        experienceInstance.update = () => {};

        // Remove canvas from DOM
        const canvas = containerElement.querySelector('canvas');
        if (canvas) canvas.remove();

        // Reset singleton so remount creates a fresh instance
        if (experienceInstance.constructor) {
          experienceInstance.constructor.instance = null;
        }

        experienceInstance = null;
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="experience"
      style={{ width: '100%', height: '100%', position: 'relative' }}
    />
  );
};
