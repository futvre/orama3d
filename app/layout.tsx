import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'orama3D | Premium 3D Printing & CAD Services',
  description: 'Επαγγελματικές υπηρεσίες 3D εκτύπωσης, μοντελοποίησης & e-shop προϊόντων στη Θεσσαλονίκη.',
  openGraph: {
    title: 'orama3D - 3D Printing & Design',
    description: 'Από την ιδέα στην πραγματικότητα με 3D εκτυπώσεις υψηλής ακρίβειας.',
    url: 'https://orama3d-lilac.vercel.app',
    siteName: 'orama3D',
    locale: 'el_GR',
    type: 'website',
  },
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
