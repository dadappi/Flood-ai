import './globals.css';

export const metadata = {
  title: 'PJOK Interaktif',
  description: 'Latihan soal PJOK sesuai kisi-kisi',
};

export default function RootLayout({ children }) {
  return (
    <html lang="id">
      <body>{children}</body>
    </html>
  );
}
