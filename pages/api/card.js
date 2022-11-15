import { ImageResponse } from '@vercel/og'
// import type { NextRequest } from 'next/server'

export const config = {
  runtime: 'experimental-edge',
}

/** @type {(buffer: ArrayBuffer) => string} */
function arrayBufferToBase64(buffer) {
  let binary = ''
  const bytes = new Uint8Array(buffer)
  for (let i = 0; i < bytes.byteLength; i++) {
    binary += String.fromCharCode(bytes[i])
  }
  return btoa(binary)
}

/* @type {(req: NextRequest) => Promise<ImageResponse>} */
export default async function (req) {
  const fontWhyteBook = await fetch(
    new URL('../../public/fonts/Whyte-Book.otf', import.meta.url).toString(),
  ).then(res => res.arrayBuffer())
  const fontWhyteBold = await fetch(
    new URL('../../public/fonts/Whyte-Bold.otf', import.meta.url).toString(),
  ).then(res => res.arrayBuffer())
  const fontWhyteInktrap = await fetch(
    new URL(
      '../../public/fonts/WhyteInktrap-Bold.otf',
      import.meta.url,
    ).toString(),
  ).then(res => res.arrayBuffer())
  const username = process.env.NEXT_PUBLIC_VERCEL_GIT_REPO_OWNER ?? 'lachlanjc'
  const avatarResponse = await fetch(`https://github.com/${username}.png`)
  const avatarImageType = avatarResponse.headers.get('content-type')
  const avatar = arrayBufferToBase64(await avatarResponse.arrayBuffer())

  try {
    const { searchParams } = new URL(req.url)

    const hasTitle = searchParams.has('title')
    const title = hasTitle
      ? searchParams.get('title').slice(0, 100)
      : 'Notebook'
    const theme = searchParams.has('theme')
      ? searchParams.get('theme')
      : 'light'
    const caption = searchParams.has('caption')
      ? searchParams.get('caption').slice(0, 100)
      : undefined
    const fontSize = searchParams.has('fontSize')
      ? Number(searchParams.get('fontSize').match(/\d+/))
      : 225

    let backgroundColor = '#ffeaeb'
    let radial = 'rgba(0,0,0,0.125)'

    if (theme === 'dark') {
      backgroundColor = '#121217'
      radial = '#273444'
    }

    return new ImageResponse(
      (
        <div
          style={{
            backgroundColor,
            backgroundImage: `radial-gradient(circle at 25px 25px, ${radial} 3%, transparent 0%),   
            radial-gradient(circle at 75px 75px, ${radial} 3%, transparent 0%)`,
            backgroundSize: '100px 100px',
            height: '100%',
            width: '100%',
            display: 'flex',
            textAlign: 'center',
            alignItems: 'center',
            flexDirection: 'column',
            flexWrap: 'nowrap',
            fontFamily: 'Whyte, system-ui, sans-serif',
            letterSpacing: '-.01em',
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              alignContent: 'center',
              justifyContent: 'center',
              justifyItems: 'center',
              fontSize: '105px',
              padding: '50px',
              marginTop: 25,
            }}
          >
            <img
              src={`data:${avatarImageType};base64,${avatar}`}
              width={125}
              height={125}
              style={{
                borderRadius: 75,
                margin: 0,
                marginRight: 35,
              }}
            />
            <span
              style={{
                color: '#8492a6',
              }}
            >
              {username}/
            </span>
            <strong
              style={{
                color: '#3b47a8',
                fontWeight: 'bold',
                marginLeft: '1ch',
              }}
            >
              notebook
            </strong>
          </div>
          <div
            style={{
              marginTop: 'auto',
              marginBottom: 'auto',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              alignContent: 'center',
              justifyContent: 'center',
              justifyItems: 'center',
            }}
          >
            <div
              style={{
                margin: '-0.25em 0.375em 0.25em',
                paddingBottom: 25,
                lineHeight: 1.125,
                whiteSpace: 'pre-wrap',
                fontFamily: 'WhyteInktrap',
                fontSize,
                color: title.toLowerCase().includes('music')
                  ? '#ff365d'
                  : theme === 'dark'
                  ? '#ff2467'
                  : '#3b47a8',
              }}
            >
              {title}
            </div>
            {caption && (
              <div
                style={{
                  textTransform: 'uppercase',
                  color: '#7a8c97',
                  letterSpacing: 0,
                  fontSize: fontSize * 0.375,
                }}
              >
                {caption}
              </div>
            )}
          </div>
        </div>
      ),
      {
        width: 2400,
        height: 1256,
        // debug: true,
        fonts: [
          {
            name: 'Whyte',
            data: fontWhyteBook,
            weight: 400,
            style: 'normal',
          },
          {
            name: 'Whyte',
            data: fontWhyteBold,
            weight: 700,
            style: 'normal',
          },
          {
            name: 'WhyteInktrap',
            data: fontWhyteInktrap,
            weight: 400,
            style: 'normal',
          },
        ],
      },
    )
  } catch (e) {
    return new Response(`Failed to generate the image: ${e.message}`, {
      status: 500,
    })
  }
}
