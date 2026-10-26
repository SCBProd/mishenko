import "./globals.css";

export const metadata = {
  title: "Портфоліо — Krystyna Mishchenko",
  description: "Портфоліо Krystyna Mishchenko: кераміка, живопис, графіка, виставки та творчий шлях.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="uk">
      <body>{children}</body>
    </html>
  );
}
