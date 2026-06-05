import { ImageResponse } from 'next/og';
import { readFileSync } from 'fs';
import { join } from 'path';

// Кастомная OG-картинка (1200×630) — генерится на сборке через Satori.
export const alt = 'Threadhunt — наём через Threads на автопилоте';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';
export const dynamic = 'force-static';

const reg = readFileSync(join(process.cwd(), 'app/_og/NotoSans-Regular.ttf'));
const bold = readFileSync(join(process.cwd(), 'app/_og/NotoSans-Bold.ttf'));

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          background: '#0b0b0f',
          padding: '72px 80px',
          position: 'relative',
          fontFamily: 'Noto',
        }}
      >
        <div
          style={{
            position: 'absolute',
            top: -220,
            left: 280,
            width: 640,
            height: 420,
            display: 'flex',
            background: 'radial-gradient(closest-side, rgba(198,242,78,0.25), rgba(11,11,15,0))',
          }}
        />
        <div style={{ display: 'flex', alignItems: 'center', fontSize: 30, fontWeight: 700, color: '#ededf2' }}>
          <span style={{ color: '#c6f24e', marginRight: 14 }}>//</span> threadhunt
        </div>
        <div
          style={{
            display: 'flex',
            alignSelf: 'flex-start',
            marginTop: 28,
            padding: '10px 18px',
            borderRadius: 999,
            background: 'rgba(198,242,78,0.12)',
            border: '1px solid rgba(198,242,78,0.4)',
            color: '#c6f24e',
            fontSize: 20,
          }}
        >
          #1 · авто-ответы в директе Threads
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', marginTop: 34 }}>
          <div style={{ fontSize: 82, fontWeight: 700, color: '#ededf2', lineHeight: 1.05 }}>Лента Threads —</div>
          <div style={{ fontSize: 82, fontWeight: 700, color: '#c6f24e', lineHeight: 1.05 }}>поток кандидатов</div>
        </div>
        <div style={{ display: 'flex', marginTop: 30, fontSize: 27, color: '#8a8a99' }}>
          Авто-постинг приманок · авто-отбивка в директе · CRM-воронка найма
        </div>
        <div style={{ display: 'flex', marginTop: 22, fontSize: 20, color: '#8a8a99' }}>
          без Meta API · работает в твоём браузере · анти-бан лимиты
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: 'Noto', data: reg, weight: 400, style: 'normal' },
        { name: 'Noto', data: bold, weight: 700, style: 'normal' },
      ],
    },
  );
}
