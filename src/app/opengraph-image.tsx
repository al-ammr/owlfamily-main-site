import { ImageResponse } from 'next/og';

export const runtime = 'edge';

export const alt = 'OWL FAMILY — Wear The Culture';
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = 'image/png';

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: 'linear-gradient(to bottom right, #0D0D0D, #1A1A1A)',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: 'sans-serif',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            fontSize: 120,
            fontWeight: 800,
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            color: '#F5F0E8', // Cream
          }}
        >
          OWL <span style={{ color: '#C4622D', marginLeft: 24 }}>FAMILY</span>
        </div>
        
        <div
          style={{
            marginTop: 40,
            fontSize: 48,
            fontStyle: 'italic',
            color: '#B8962E', // Gold
            fontWeight: 400,
          }}
        >
          Wear the culture. Own the look.
        </div>

        <div
          style={{
            position: 'absolute',
            bottom: 40,
            display: 'flex',
            alignItems: 'center',
            gap: 24,
          }}
        >
          <div
            style={{
              padding: '12px 32px',
              border: '2px solid #C4622D',
              color: '#F5F0E8',
              fontSize: 24,
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
            }}
          >
            Streetwear
          </div>
          <div
            style={{
              padding: '12px 32px',
              border: '2px solid #D8D0C0',
              color: '#F5F0E8',
              fontSize: 24,
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
            }}
          >
            Smart Casual
          </div>
          <div
            style={{
              padding: '12px 32px',
              border: '2px solid #D8D0C0',
              color: '#F5F0E8',
              fontSize: 24,
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
            }}
          >
            Corporate
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
