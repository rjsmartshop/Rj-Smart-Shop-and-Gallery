import React from 'react';

interface DeviceVisualProps {
  type: string;
  className?: string;
  colorHex?: string;
  imageUrl?: string;
  alt?: string;
}

export const DeviceVisual: React.FC<DeviceVisualProps> = ({
  type,
  className = 'w-36 h-36',
  colorHex,
  imageUrl,
  alt,
}) => {
  const [hasError, setHasError] = React.useState(false);

  if (imageUrl && !hasError) {
    return (
      <div className={`relative flex items-center justify-center p-2 select-none overflow-hidden group ${className}`}>
        <img
          src={imageUrl}
          alt={alt || 'Official Product'}
          className="w-full h-full max-h-full object-contain rounded-xl drop-shadow-xl transition-transform duration-300 group-hover:scale-105"
          loading="lazy"
          onError={() => setHasError(true)}
        />
      </div>
    );
  }

  switch (type) {
    case 'iphone16promax':
    case 'iphone16':
    case 'iphone15':
      return (
        <div className={`relative flex items-center justify-center p-3 select-none ${className}`}>
          {/* Subtle phone body */}
          <div
            className="w-28 h-48 rounded-[28px] border-4 border-zinc-700/80 shadow-2xl relative flex flex-col items-center justify-between p-2 overflow-hidden"
            style={{
              background: colorHex || (type === 'iphone16promax' ? 'linear-gradient(145deg, #2b2520, #141312)' : 'linear-gradient(145deg, #1e2638, #0e121a)'),
              boxShadow: '0 12px 30px -5px rgba(0,0,0,0.7), inset 0 1px 2px rgba(255,255,255,0.25)',
            }}
          >
            {/* Dynamic Island */}
            <div className="w-8 h-2.5 bg-black rounded-full shadow-inner mt-1 flex items-center justify-end px-1">
              <div className="w-1.5 h-1.5 rounded-full bg-blue-900/60"></div>
            </div>

            {/* Screen Wallpaper / Glow */}
            <div className="w-full flex-1 my-1.5 rounded-[18px] bg-gradient-to-b from-amber-500/10 via-zinc-900 to-black/60 border border-white/5 flex flex-col items-center justify-center relative p-2 text-center">
              <span className="text-[9px] font-mono tracking-widest text-amber-300/80 uppercase font-semibold">
                {type === 'iphone16promax' ? 'A18 PRO' : 'IPHONE'}
              </span>
              <div className="w-8 h-8 my-1 rounded-full bg-amber-500/10 flex items-center justify-center border border-amber-500/20">
                <svg className="w-4 h-4 text-amber-400" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.38c.62-.75 1.04-1.8 0.93-2.85-.9.04-1.99.6-2.63 1.35-.57.65-.99 1.7-0.87 2.73.99.08 2.02-.48 2.57-1.23z" />
                </svg>
              </div>
              <span className="text-[8px] text-zinc-400 tracking-wider">Super Retina XDR</span>
            </div>

            {/* Bottom Bar indicator */}
            <div className="w-10 h-0.5 bg-zinc-500 rounded-full mb-0.5"></div>

            {/* Side Camera Control indicator */}
            <div className="absolute right-[-4px] top-28 w-1 h-4 bg-amber-400/90 rounded-l"></div>
          </div>
        </div>
      );

    case 's24ultra':
    case 's24plus':
      return (
        <div className={`relative flex items-center justify-center p-3 select-none ${className}`}>
          <div
            className="w-28 h-48 rounded-[12px] border-4 border-zinc-600/90 shadow-2xl relative flex flex-col items-center justify-between p-2 overflow-hidden"
            style={{
              background: colorHex || 'linear-gradient(145deg, #27282b, #151618)',
              boxShadow: '0 12px 30px -5px rgba(0,0,0,0.7), inset 0 1px 2px rgba(255,255,255,0.2)',
            }}
          >
            {/* Punch hole camera */}
            <div className="w-2.5 h-2.5 bg-black rounded-full shadow-inner mt-0.5 border border-zinc-700/50"></div>

            {/* Screen Wallpaper */}
            <div className="w-full flex-1 my-1.5 rounded-[6px] bg-gradient-to-b from-blue-900/20 via-zinc-900 to-black/80 border border-white/5 flex flex-col items-center justify-center relative p-2 text-center">
              <span className="text-[9px] font-bold tracking-wider text-blue-400">GALAXY AI</span>
              <div className="w-9 h-9 my-1 rounded-lg bg-blue-500/10 flex items-center justify-center border border-blue-500/20">
                <svg className="w-5 h-5 text-blue-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 2v20M2 12h20M4.93 4.93l14.14 14.14M4.93 19.07l14.14-14.14" />
                </svg>
              </div>
              <span className="text-[8px] text-zinc-400">200MP Quad Cam</span>
            </div>

            {/* S-Pen stylus tip peek bottom right */}
            <div className="w-full flex justify-between items-center px-1">
              <div className="w-8 h-0.5 bg-zinc-500 rounded-full mx-auto"></div>
              <div className="w-1.5 h-1.5 rounded-full bg-blue-400/80"></div>
            </div>
          </div>
        </div>
      );

    case 'pixel9pro':
    case 'pixel9':
      return (
        <div className={`relative flex items-center justify-center p-3 select-none ${className}`}>
          <div
            className="w-28 h-48 rounded-[24px] border-4 border-zinc-600/90 shadow-2xl relative flex flex-col items-center justify-between p-2 overflow-hidden"
            style={{
              background: colorHex || 'linear-gradient(145deg, #303236, #1b1c1d)',
            }}
          >
            {/* Punch hole */}
            <div className="w-2 h-2 bg-black rounded-full mt-0.5"></div>

            {/* Screen */}
            <div className="w-full flex-1 my-1.5 rounded-[16px] bg-gradient-to-b from-purple-900/20 via-zinc-900 to-black/80 border border-white/5 flex flex-col items-center justify-center p-2 text-center">
              <span className="text-[9px] font-bold text-emerald-400 tracking-wider">GEMINI AI</span>
              <div className="w-8 h-8 my-1 rounded-full bg-emerald-500/10 flex items-center justify-center border border-emerald-500/20">
                <span className="text-xs font-black text-emerald-400">G</span>
              </div>
              <span className="text-[8px] text-zinc-400">Tensor G4</span>
            </div>

            <div className="w-10 h-0.5 bg-zinc-500 rounded-full mb-0.5"></div>
          </div>
        </div>
      );

    case 'watchultra':
    case 'watchs10':
      return (
        <div className={`relative flex items-center justify-center p-3 select-none ${className}`}>
          <div className="flex flex-col items-center">
            {/* Top strap */}
            <div className="w-10 h-4 bg-orange-700/80 rounded-t-md"></div>
            {/* Watch Case */}
            <div
              className="w-24 h-28 rounded-[26px] border-4 border-zinc-600/80 shadow-2xl relative flex flex-col items-center justify-center p-2"
              style={{
                background: colorHex || 'linear-gradient(145deg, #2b2b2b, #121212)',
              }}
            >
              {/* Crown */}
              <div className="absolute right-[-6px] top-6 w-1.5 h-6 bg-orange-500 rounded-r"></div>
              {/* Screen */}
              <div className="w-full h-full rounded-[18px] bg-black border border-white/10 flex flex-col items-center justify-center p-1 text-center">
                <span className="text-xs font-mono font-bold text-amber-400">10:09</span>
                <span className="text-[8px] text-orange-400 font-semibold mt-0.5">74 BPM</span>
                <div className="w-5 h-5 rounded-full border border-orange-500/50 flex items-center justify-center mt-1">
                  <span className="text-[8px] text-zinc-300">⚡</span>
                </div>
              </div>
            </div>
            {/* Bottom strap */}
            <div className="w-10 h-4 bg-orange-700/80 rounded-b-md"></div>
          </div>
        </div>
      );

    case 'airpodspro':
      return (
        <div className={`relative flex items-center justify-center p-3 select-none ${className}`}>
          <div className="w-28 h-20 rounded-[24px] bg-gradient-to-b from-zinc-200 via-white to-zinc-300 shadow-2xl relative flex flex-col items-center justify-between p-2 border border-zinc-400/50">
            {/* Hinge Line */}
            <div className="w-full h-0.5 bg-zinc-300/80 mt-4"></div>
            {/* Status LED */}
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse shadow-sm"></div>
            <div className="text-[8px] font-semibold text-zinc-600 tracking-wider">MAGSAFE</div>
          </div>
        </div>
      );

    case 'macbook':
      return (
        <div className={`relative flex items-center justify-center p-3 select-none ${className}`}>
          <div className="flex flex-col items-center">
            {/* Screen lid */}
            <div className="w-36 h-24 rounded-t-lg bg-zinc-900 border-2 border-zinc-700 p-1 flex flex-col items-center justify-center relative shadow-xl">
              <div className="w-full h-full rounded bg-gradient-to-tr from-indigo-950 via-zinc-900 to-amber-950/40 flex flex-col items-center justify-center">
                <svg className="w-5 h-5 text-zinc-300" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.38c.62-.75 1.04-1.8 0.93-2.85-.9.04-1.99.6-2.63 1.35-.57.65-.99 1.7-0.87 2.73.99.08 2.02-.48 2.57-1.23z" />
                </svg>
                <span className="text-[8px] font-mono text-zinc-400 mt-1">M3 CHIP</span>
              </div>
            </div>
            {/* Keyboard base */}
            <div className="w-40 h-2 bg-zinc-600 rounded-b-md shadow-md flex justify-center items-center">
              <div className="w-8 h-0.5 bg-zinc-800 rounded"></div>
            </div>
          </div>
        </div>
      );

    case 'charger':
      return (
        <div className={`relative flex items-center justify-center p-3 select-none ${className}`}>
          <div className="w-16 h-20 rounded-xl bg-white border border-zinc-200 shadow-xl flex flex-col items-center justify-between p-2">
            <div className="w-4 h-1.5 bg-zinc-300 rounded-sm"></div>
            <div className="w-5 h-2 bg-zinc-200 rounded border border-zinc-300 flex items-center justify-center">
              <div className="w-2 h-0.5 bg-zinc-400"></div>
            </div>
            <span className="text-[8px] font-bold text-zinc-600">20W</span>
          </div>
        </div>
      );

    default:
      return (
        <div className={`relative flex items-center justify-center p-3 select-none ${className}`}>
          <div className="w-24 h-40 rounded-2xl bg-zinc-800 border-2 border-zinc-700 shadow-xl flex flex-col items-center justify-center p-2">
            <div className="w-8 h-8 rounded-full bg-zinc-700 flex items-center justify-center text-amber-400">
              📱
            </div>
            <span className="text-[9px] font-medium text-zinc-300 mt-2 text-center">RJ Official</span>
          </div>
        </div>
      );
  }
};
