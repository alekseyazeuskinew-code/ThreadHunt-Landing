import { ImageResponse } from 'next/og';

// Apple touch icon (180×180) для варианта /d — фирменный знак «нити» в ФИОЛЕТОВОМ.
export const size = { width: 180, height: 180 };
export const contentType = 'image/png';
export const dynamic = 'force-static';

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          background: '#0B0B0F',
          borderRadius: 40,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 14,
        }}
      >
        <div style={{ width: 30, height: 104, background: '#8B7CFF', transform: 'skewX(-18deg)', display: 'flex' }} />
        <div style={{ width: 30, height: 104, background: '#8B7CFF', transform: 'skewX(-18deg)', display: 'flex' }} />
      </div>
    ),
    { ...size },
  );
}
