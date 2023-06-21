import { marked } from 'marked'

export default function TextBlock({ data }) {
  const { text, colorTheme, padding } = data

  const paddingTop = `${padding?.top ? padding.top : 4}`
  const paddingBottom = `${padding?.bottom ? padding.bottom : 4}`

  const dynamicPadding = {
    paddingTop: `calc(${paddingTop}rem + 1.6625vw)`,
    paddingBottom: `calc(${paddingBottom}rem + 1.6625vw)`,
  }

  const html = marked(text)

  // get color theme
  let textColor

  switch (colorTheme) {
    case 'light blue':
      textColor = 'text-off-black'
      break
    case 'dark blue':
      textColor = 'text-white'
      break
    case 'grey' || 'gray':
      textColor = 'text-dark-blue'
      break
    case 'white':
      textColor = 'text-off-black'
      break
    default:
      textColor = 'text-off-black'
  }

  return (
    <section style={dynamicPadding}>
      <div className='container px-4 md:px-8 max-w-6xl'>
        <div
          className={`${textColor} w-full mx-auto markdown-content`}
          dangerouslySetInnerHTML={{ __html: html }}></div>
      </div>
    </section>
  )
}
