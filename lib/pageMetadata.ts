import type { Metadata } from "next";

export function publicPageMetadata(
  path: string,
  title: string,
  description: string
): Metadata {
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      title,
      description,
      url: path,
      siteName: "Asko Cafe",
      type: "website",
      locale: "de_DE",
      images: [
        {
          url: "/asko-cafe-banner.png",
          width: 960,
          height: 540,
          alt: "Asko Cafe Discord Server Liste",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["/asko-cafe-banner.png"],
    },
  };
}
