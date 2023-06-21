export default function PageHeader({ data }) {
  const { heading, subheading, colorTheme } = data

  let textColor, bgColor, borderColor

  switch (colorTheme) {
    case 'light blue':
      textColor = 'heading-blue'
      bgColor = 'bg-sky-100'
      borderColor = 'border-heading-blue'
      break
    case 'dark blue':
      textColor = 'white'
      bgColor = 'bg-heading-blue'
      borderColor = 'border-white'
      break
    case 'grey' || 'gray':
      textColor = 'heading-blue'
      bgColor = 'bg-slate-200'
      borderColor = 'border-heading-blue'
      break
    case 'white':
      textColor = 'heading-blue'
      bgColor = 'bg-white'
      break
    default:
      textColor = 'heading-blue'
      bgColor = 'bg-light-blue-notif'
      borderColor = 'border-heading-blue'
  }

  return (
    <div className={bgColor}>
      <div className='container px-4 md:px-14 h-40 md:h-44 flex justify-center items-center box-border'>
        <div className='flex flex-col max-w-fit gap-y-4 items-center'>
          {heading && (
            <h1
              className={`page-heading text-${textColor} tracking-wide font-sans text-[2rem] md:text-5xl text-center leading-8`}>
              {heading}
            </h1>
          )}
          {subheading && (
            <p
              className={`text-${textColor} border-t ${borderColor} border-opacity-40 opacity-40 uppercase px-7 pt-1 pb-2 w-max tracking-[0.3rem] font-thin`}>
              {subheading}
            </p>
          )}
        </div>
      </div>
    </div>
  )
}
