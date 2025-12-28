import localFont from "next/font/local"

export const degular = localFont({
  src: [
    { path: "../public/fonts/degular/DegularDisplayDemo-Thin.otf", weight: "100", style: "normal" },
    { path: "../public/fonts/degular/DegularDisplayDemo-ThinItalic.otf", weight: "100", style: "italic" },

    { path: "../public/fonts/degular/DegularDisplayDemo-Light.otf", weight: "300", style: "normal" },
    { path: "../public/fonts/degular/DegularDisplayDemo-LightItalic.otf", weight: "300", style: "italic" },

    { path: "../public/fonts/degular/DegularDisplayDemo-Regular.otf", weight: "400", style: "normal" },
    { path: "../public/fonts/degular/DegularDisplayDemo-Italic.otf", weight: "400", style: "italic" },

    { path: "../public/fonts/degular/DegularDisplayDemo-Medium.otf", weight: "500", style: "normal" },
    { path: "../public/fonts/degular/DegularDisplayDemo-MediumItalic.otf", weight: "500", style: "italic" },

    { path: "../public/fonts/degular/DegularDisplayDemo-Semibold.otf", weight: "600", style: "normal" },
    { path: "../public/fonts/degular/DegularDisplayDemo-SemiboldItalic.otf", weight: "600", style: "italic" },

    { path: "../public/fonts/degular/DegularDisplayDemo-Bold.otf", weight: "700", style: "normal" },
    { path: "../public/fonts/degular/DegularDisplayDemo-BoldItalic.otf", weight: "700", style: "italic" },

    { path: "../public/fonts/degular/DegularDisplayDemo-Black.otf", weight: "900", style: "normal" },
    { path: "../public/fonts/degular/DegularDisplayDemo-BlackItalic.otf", weight: "900", style: "italic" },
  ],
  variable: "--font-degular",
  display: "swap",
})
