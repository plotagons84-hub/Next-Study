import { BRAND } from '../data/constants'

export default function Hero() {
  return (
    <div className="flex flex-col items-center text-center animate-fade-in-up">
      {/* Logo: gently bounces, with a slow-spinning ring orbiting around it */}
      <div className="relative h-28 w-28 sm:h-32 sm:w-32 mb-6">
        <div
          className="absolute inset-[-10px] rounded-full animate-spin-slow"
          style={{
            background:
              'conic-gradient(from 0deg, rgba(249,115,22,0) 0%, rgba(251,191,36,0.9) 15%, rgba(249,115,22,0) 35%)',
            WebkitMask: 'radial-gradient(farthest-side, transparent calc(100% - 3px), #000 calc(100% - 3px))',
            mask: 'radial-gradient(farthest-side, transparent calc(100% - 3px), #000 calc(100% - 3px))',
          }}
        />
        <div className="absolute inset-0 rounded-full ring-1 ring-white/10" />
        <div className="absolute inset-0 animate-bounce-y">
          <div className="h-full w-full rounded-full overflow-hidden bg-white shadow-glow">
            <img src="/logos/ns-icon.png" alt={BRAND.name} className="h-full w-full object-cover" />
          </div>
        </div>
      </div>

      <p className="text-xs sm:text-sm font-mono uppercase tracking-[0.35em] text-orange-400">
        Premium Ecosystem
      </p>
      <h1 className="font-display font-extrabold text-4xl sm:text-5xl text-white mt-2">Choose Platform</h1>
    </div>
  )
}
