import { Link } from '@remix-run/react'
import { marked } from 'marked'

export default function InfoTextBlock({ data }) {
  const { heading, text, link, colorTheme, padding } = data

  const paddingTop = `${padding?.top ? padding.top : 4}`
  const paddingBottom = `${padding?.bottom ? padding.bottom : 4}`

  const dynamicPadding = {
    paddingTop: `calc(${paddingTop}rem + 1.7625vw)`,
    paddingBottom: `calc(${paddingBottom}rem + 1.7625vw)`,
  }

  let html
  if (text) {
    html = marked(text)
  }

  let headingColor, bgColor, textColor, btnType

  switch (colorTheme) {
    case 'light blue':
      headingColor = 'heading-blue'
      textColor = 'text-off-black'
      bgColor = 'bg-sky-100'
      btnType = 'btn-primary'
      break
    case 'dark blue':
      headingColor = 'text-light-blue-notif'
      bgColor = 'bg-heading-blue'
      textColor = 'text-white'
      btnType = 'btn-primary-dark'
      break
    case 'grey' || 'gray':
      headingColor = 'text-heading-bluet'
      bgColor = 'bg-light-grey'
      textColor = 'text-dark-blue'
      btnType = 'btn-primary-dark'
      break
    case 'white':
      headingColor = 'text-heading-blue'
      bgColor = 'bg-white'
      textColor = 'text-off-black'
      btnType = 'btn-primary'
      break
    default:
      headingColor = 'text-heading-blue'
      bgColor = 'bg-white'
      textColor = 'text-off-black'
      btnType = 'btn-primary'
  }

  return (
    <section className={`${bgColor}`} style={dynamicPadding}>
      <div className='container px-4 md:px-8 flex flex-col items-center gap-y-5 md:gap-y-8'>
        {heading && <h2 className={`${headingColor}`}>{heading}</h2>}
        {text && (
          <div
            className={`${textColor} w-full max-w-5xl markdown-content`}
            dangerouslySetInnerHTML={{ __html: html }}></div>
        )}

        {link && (
          <button className={`btn ${btnType} mt-4`}>
            <Link to={link.linkPath}>{link.linkText}</Link>
          </button>
        )}
      </div>
    </section>
  )
}
