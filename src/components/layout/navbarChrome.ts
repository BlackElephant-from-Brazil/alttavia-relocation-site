export function getNavbarChromeClass(isOverHero: boolean) {
  return isOverHero
    ? 'border-white/45 bg-white/15 shadow-glass backdrop-blur-2xl backdrop-saturate-150'
    : 'border-white/35 bg-white/10 shadow-glass backdrop-blur-2xl backdrop-saturate-150'
}
