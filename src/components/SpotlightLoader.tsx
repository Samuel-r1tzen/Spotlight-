import React, { useEffect, useRef, useState } from 'react';
import './SpotlightLoader.css';

type SpotlightLoaderProps = {
  onComplete: () => void;
};

const stages = [
  { at: 0, text: 'Calibrating lenses' },
  { at: 22, text: 'Focusing spotlights' },
  { at: 44, text: 'Rolling film' },
  { at: 62, text: 'Cueing the orchestra' },
  { at: 78, text: 'Opening curtains' },
  { at: 94, text: 'Almost there' },
  { at: 100, text: 'Welcome' },
];

const ringStops = [
  { at: 0, color: [61, 8, 16] },
  { at: 5, color: [122, 21, 34] },
  { at: 10, color: [179, 35, 53] },
  { at: 25, color: [24, 119, 242] },
  { at: 32, color: [74, 151, 255] },
  { at: 42, color: [131, 58, 180] },
  { at: 52, color: [225, 48, 108] },
  { at: 65, color: [247, 119, 55] },
  { at: 75, color: [252, 175, 69] },
  { at: 85, color: [255, 217, 122] },
  { at: 92, color: [232, 196, 115] },
  { at: 97, color: [201, 147, 47] },
  { at: 100, color: [61, 8, 16] },
];

function getRingColor(progress: number): string {
  const value = Math.max(0, Math.min(100, progress));

  for (let i = 0; i < ringStops.length - 1; i++) {
    const a = ringStops[i];
    const b = ringStops[i + 1];

    if (value >= a.at && value <= b.at) {
      const t = (value - a.at) / (b.at - a.at);
      const rgb = a.color.map((channel, index) =>
        Math.round(channel + (b.color[index] - channel) * t),
      );

      return `rgb(${rgb.join(', ')})`;
    }
  }

  return 'rgb(255, 217, 122)';
}

function BrandStar() {
  return (
    <svg viewBox="0 0 200 200" aria-hidden="true">
      <path
        d="M100 62 L107.55 85.60 L132.34 86.15 L112.24 101.15 L119.22 125.10 L100 111.2 L80.78 125.10 L87.76 101.15 L67.66 86.15 L92.45 85.60 Z"
        fill="url(#spotlightStarGrad)"
      />
    </svg>
  );
}

export const SpotlightLoader: React.FC<SpotlightLoaderProps> = ({
  onComplete,
}) => {
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState(stages[0].text);
  const [complete, setComplete] = useState(false);
  const [flash, setFlash] = useState(false);
  const [exiting, setExiting] = useState(false);

  const frameRef = useRef<number | null>(null);
  const timeoutRefs = useRef<ReturnType<typeof setTimeout>[]>([]);
  const onCompleteRef = useRef(onComplete);

  useEffect(() => {
    onCompleteRef.current = onComplete;
  }, [onComplete]);

  useEffect(() => {
    const reducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches;

    const duration = reducedMotion ? 700 : 6800;
    const startTime = performance.now();

    let currentProgress = 0;
    let displayProgress = 0;
    let finished = false;

    const schedule = (callback: () => void, delay: number) => {
      const timer = setTimeout(callback, delay);
      timeoutRefs.current.push(timer);
    };

    const finish = () => {
      if (finished) return;
      finished = true;

      if (frameRef.current !== null) {
        cancelAnimationFrame(frameRef.current);
        frameRef.current = null;
      }

      setProgress(100);
      setStatus('Welcome');
      setComplete(true);

      schedule(() => {
        setFlash(true);

        schedule(() => {
          setExiting(true);

          schedule(() => {
            onCompleteRef.current();
          }, reducedMotion ? 50 : 1100);
        }, reducedMotion ? 30 : 280);
      }, reducedMotion ? 100 : 850);
    };

    const tick = (now: number) => {
      if (finished) return;

      const t = Math.min((now - startTime) / duration, 1);
      let target: number;

      if (t < 0.15) {
        target = (t / 0.15) * 18;
      } else if (t < 0.35) {
        target = 18 + ((t - 0.15) / 0.2) * 34;
      } else if (t < 0.43) {
        target = 52;
      } else if (t < 0.72) {
        target = 52 + ((t - 0.43) / 0.29) * 36;
      } else if (t < 0.8) {
        target = 88;
      } else {
        target = 88 + ((t - 0.8) / 0.2) * 12;
      }

      currentProgress += (target - currentProgress) * 0.18;
      displayProgress += (currentProgress - displayProgress) * 0.3;

      if (t >= 1) {
        currentProgress = 100;
        displayProgress = 100;
      }

      displayProgress = Math.min(100, displayProgress);
      setProgress(displayProgress);

      let activeStage = stages[0];

      for (const stage of stages) {
        if (displayProgress >= stage.at) {
          activeStage = stage;
        }
      }

      setStatus(activeStage.text);

      if (t >= 1) {
        finish();
        return;
      }

      frameRef.current = requestAnimationFrame(tick);
    };

    frameRef.current = requestAnimationFrame(tick);

    return () => {
      if (frameRef.current !== null) {
        cancelAnimationFrame(frameRef.current);
        frameRef.current = null;
      }

      timeoutRefs.current.forEach(clearTimeout);
      timeoutRefs.current = [];
    };
  }, []);

  const ringColor = getRingColor(progress);

  const progressStyle = {
    '--progress': progress / 100,
    '--dot-color': ringColor,
  } as React.CSSProperties;

  return (
    <div
      className={`spotlight-loader${complete ? ' complete' : ''}${exiting ? ' done' : ''}`}
      role="progressbar"
      aria-label="Loading Spotlight"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={Math.floor(progress)}
    >
      <svg className="spotlight-defs" aria-hidden="true">
        <defs>
          <linearGradient
            id="spotlightStarGrad"
            x1="0"
            y1="0"
            x2="0"
            y2="1"
          >
            <stop offset="0%" stopColor="#FFF6D8" />
            <stop offset="45%" stopColor="#FFD97A" />
            <stop offset="85%" stopColor="#E8A33F" />
            <stop offset="100%" stopColor="#B8462A" />
          </linearGradient>
        </defs>
      </svg>

      <div className="sl-bg" aria-hidden="true" />
      <div className="sl-grain" aria-hidden="true" />

      <div className="sl-frame" aria-hidden="true">
        <span className="sl-corner tl" />
        <span className="sl-corner tr" />
        <span className="sl-corner bl" />
        <span className="sl-corner br" />
      </div>

      <header className="sl-top">
        <span className="sl-brand">
          <BrandStar />
          <span>Spotlight</span>
        </span>

        <span className="sl-rec">
          <span className="sl-rec-dot" />
          REC
        </span>
      </header>

      <section className="sl-stage">
        <div className="sl-rays" aria-hidden="true" />

        <div className="sl-aperture">
          <svg className="sl-svg" viewBox="0 0 200 200" aria-hidden="true">
            <circle className="sl-ring r1" cx="100" cy="100" r="94" />
            <circle className="sl-ring r2" cx="100" cy="100" r="88" />
            <circle className="sl-ring r3" cx="100" cy="100" r="82" />

            <g className="sl-blades">
              {Array.from({ length: 6 }, (_, index) => (
                <path
                  key={index}
                  className="sl-blade"
                  d="M100 35 A65 65 0 0 1 153.25 62.72 L132.77 77.06 A40 40 0 0 0 100 60 Z"
                  transform={`rotate(${index * 60} 100 100)`}
                />
              ))}
            </g>

            <g className="sl-star">
              <BrandStar />
            </g>
          </svg>

          <div className="sl-ring-track" aria-hidden="true" />

          <div
            className="sl-progress-ring"
            style={progressStyle}
            aria-hidden="true"
          >
            <div className="sl-ring-mask">
              <div className="sl-ring-color" />
            </div>
          </div>

          <div
            className="sl-ring-dot"
            style={progressStyle}
            aria-hidden="true"
          />
        </div>

        <div className="sl-info" aria-live="polite">
          <div className="sl-status">
            <span className="sl-status-dot" />
            <span className="sl-status-text">{status}</span>
          </div>
        </div>
      </section>

      <footer className="sl-bottom">
        <span>
          Film · <span className="gold">01 of 01</span>
        </span>
        <span>
          Loading the <span className="blue">marquee</span> in{' '}
          <span className="red">velvet</span>
        </span>
        <span>
          Est. <span className="red">MMXXV</span>
        </span>
      </footer>

      <div
        className={`sl-flash${flash ? ' active' : ''}`}
        aria-hidden="true"
      />
    </div>
  );
};