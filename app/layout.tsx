import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: '3DORAMA - Immersive 3D Experiences',
  description: 'Ψηφιακές δημιουργίες, 3D περιηγήσεις & interactive web experiences.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="el">
      <body>{children}</body>
    </html>
  );
}
