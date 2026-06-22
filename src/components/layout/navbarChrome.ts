export function getNavbarChromeClass(isOverHero: boolean) {
  return isOverHero
    ? 'border-white/20 bg-white/80 shadow-glass backdrop-blur-2xl backdrop-saturate-150'
    : 'border-white/15 bg-white/10 shadow-glass backdrop-blur-2xl backdrop-saturate-150'
}
