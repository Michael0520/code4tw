import {ImageResponse} from 'next/og';

export const runtime = 'edge';

export const alt = 'Code for Taiwan';
export const size = {
  width: 1200,
  height: 630
};

export const contentType = 'image/png';

export default async function Image() {
  return new ImageResponse(
    <div
      style={{
        fontSize: 128,
        background: 'linear-gradient(to bottom right, #000095, #0000CC)',
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'white'
      }}
    >
      <div
        style={{
          fontSize: 180,
          fontWeight: 'bold',
          marginBottom: 20,
          textShadow: '0 4px 6px rgba(0, 0, 0, 0.3)'
        }}
      >
        C4
      </div>
      <div
        style={{
          fontSize: 60,
          fontWeight: 600,
          letterSpacing: '-0.02em'
        }}
      >
        Code for Taiwan
      </div>
      <div
        style={{
          fontSize: 32,
          marginTop: 20,
          opacity: 0.9
        }}
      >
        Building a better Taiwan through technology
      </div>
    </div>,
    {
      ...size
    }
  );
}
