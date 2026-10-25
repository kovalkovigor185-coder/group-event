import type { Metadata } from 'next';
import './globals.scss';

export const metadata: Metadata = {
  title: 'Running for Change — Group Event',
  description: 'Stride together, shape tomorrow. A community running event supporting active transportation. Portfolio implementation of the Group Event Figma template.',
  robots: { index: false, follow: false },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
