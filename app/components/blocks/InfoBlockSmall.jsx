import { Link } from '@remix-run/react'

export default function InfoBlockSmall({ data }) {
  const { heading, subheading, link, padding } = data

  const paddingTop = `${padding?.top ? padding.top : 3}`
  const paddingBottom = `${padding?.bottom ? padding.bottom : 3}`

  const dynamicPadding = {
    paddingTop: `calc(${paddingTop}rem + 1.5625vw)`,
    paddingBottom: `calc(${paddingBottom}rem + 1.5625vw)`,
  }

  return (
    <div className='px-6 bg-light-grey' style={dynamicPadding}>
      <div className='container flex flex-col items-center gap-y-6 lg:flex-row justify-around'>
        <div className='text-center lg:text-left'>
          {heading && (
            <p className='info-block-heading py-4 lg:py-0 font-sans text-heading-blue text-3xl md:text-4xl'>
              {heading}
            </p>
          )}
          {subheading && (
            <p className='text-heading-blue max-w-2xl'>{subheading}</p>
          )}
        </div>
        {link && (
          <button className='btn btn-primary h-max w-max shrink-0'>
            <Link to={link.linkPath}>{link.linkText}</Link>
          </button>
        )}
      </div>
    </div>
  )
}
