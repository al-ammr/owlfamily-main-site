import { NextResponse } from 'next/server'
import crypto from 'crypto'

export async function POST(request: Request) {
  const body = await request.json()
  const { paramsToSign } = body

  const apiSecret = process.env.CLOUDINARY_API_SECRET

  if (!apiSecret) {
    return NextResponse.json({ error: 'Missing Cloudinary API Secret' }, { status: 500 })
  }

  try {
    // next-cloudinary typically passes paramsToSign as an object of params.
    // If it's an object, we must sort keys and concatenate them.
    // Let's handle both string and object just in case.
    let stringToSign = ''
    
    if (typeof paramsToSign === 'object') {
      const keys = Object.keys(paramsToSign).sort()
      stringToSign = keys
        .filter((key) => paramsToSign[key] !== undefined && paramsToSign[key] !== null)
        .map((key) => `${key}=${paramsToSign[key]}`)
        .join('&')
    } else if (typeof paramsToSign === 'string') {
      stringToSign = paramsToSign
    }

    const signature = crypto
      .createHash('sha1')
      .update(stringToSign + apiSecret)
      .digest('hex')

    return NextResponse.json({ signature })
  } catch (error) {
    console.error('Signature generation error:', error)
    return NextResponse.json({ error: 'Failed to generate signature' }, { status: 500 })
  }
}
