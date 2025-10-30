import localFont from "next/font/local";

export const redHatDisplay = localFont({
  src: [
    { path: "./RedHatDisplay/RedHatDisplay-Light.ttf", weight: "300", style: "normal" },
    { path: "./RedHatDisplay/RedHatDisplay-LightItalic.ttf", weight: "300", style: "italic" },
    { path: "./RedHatDisplay/RedHatDisplay-Regular.ttf", weight: "400", style: "normal" },
    { path: "./RedHatDisplay/RedHatDisplay-Italic.ttf", weight: "400", style: "italic" },
    { path: "./RedHatDisplay/RedHatDisplay-Medium.ttf", weight: "500", style: "normal" },
    { path: "./RedHatDisplay/RedHatDisplay-MediumItalic.ttf", weight: "500", style: "italic" },
    { path: "./RedHatDisplay/RedHatDisplay-SemiBold.ttf", weight: "600", style: "normal" },
    { path: "./RedHatDisplay/RedHatDisplay-SemiBoldItalic.ttf", weight: "600", style: "italic" },
    { path: "./RedHatDisplay/RedHatDisplay-Bold.ttf", weight: "700", style: "normal" },
    { path: "./RedHatDisplay/RedHatDisplay-BoldItalic.ttf", weight: "700", style: "italic" },
    { path: "./RedHatDisplay/RedHatDisplay-ExtraBold.ttf", weight: "800", style: "normal" },
    { path: "./RedHatDisplay/RedHatDisplay-ExtraBoldItalic.ttf", weight: "800", style: "italic" },
    { path: "./RedHatDisplay/RedHatDisplay-Black.ttf", weight: "900", style: "normal" },
    { path: "./RedHatDisplay/RedHatDisplay-BlackItalic.ttf", weight: "900", style: "italic" },
  ],
  variable: "--font-redhat-display",
});
