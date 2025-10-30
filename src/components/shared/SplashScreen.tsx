export function SplashScreen() {
  return (
    <div className="absolute inset-0 flex items-center justify-center z-20 transition-opacity duration-1000 opacity-100">
      <img src="/svgs/red-screen-left.svg" alt="Decor Top Left" className="absolute top-0 left-0 w-32 sm:w-48 md:w-64" />
      <img src="/svgs/megamind-logo-black.svg" alt="megamind logo" className="w-32 sm:w-48 md:w-64 mx-auto" />
      <img src="/svgs/red-screen-right.svg" alt="Decor Bottom Right" className="absolute bottom-0 right-0 w-32 sm:w-48 md:w-64" />
    </div>
  );
}
