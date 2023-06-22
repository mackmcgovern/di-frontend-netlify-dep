import { Link, useCatch } from '@remix-run/react'

export default function CardVarient({ cardData, cardImage, baseUrl }) {
  const { linkText, linkPath, cardHeading, cardText } = cardData
  const imageUrl = cardImage[0]?.attributes?.url
    ? `${baseUrl}${cardImage[0]?.attributes?.url}`
    : '/images/photo-placeholder.png'

  const altTxt = cardImage[0]?.attributes.alternativeText ?? 'service'

  return (
    <Link to={linkPath}>
      <div className='mx-auto shadow-md rounded-sm overflow-hidden max-w-[34rem]'>
        <div className='relative'>
          <div>
            {imageUrl && (
              <div className='relative'>
                <img
                  src={`${imageUrl}`}
                  alt={`${altTxt}`}
                  className='w-full brightness-90 aspect-[4/2.5] object-cover'
                />
                <div className='bg-md-blue opacity-40 absolute top-0 bottom-0 right-0 left-0'></div>
              </div>
            )}
            <div className='absolute bottom-0 right-0 left-0 hover:text-8xl transition duration-75'>
              <p className='text-white text-2xl md:text-5xl font-serif font-[300] drop-shadow-sm px-8 mb-[10%] text-center leading-[0.9]'>
                {cardHeading}
              </p>
            </div>
          </div>

          <div className='opacity-0 hover:opacity-100 transition ease duration-[450ms] absolute top-0 left-0 right-0 bottom-0 bg-darkest-blue bg-opacity-[100%]'>
            <div className='flex flex-col items-center justify-evenly p-4 h-full'>
              <p className='text-2xl md:text-4xl font-serif text-white text-center mx-1  leading-[1]'>
                {cardHeading}
              </p>
              <p className='text-white text-center font-light text-base md:text-lg tracking-wide px-4'>
                {cardText}
              </p>
              <button className='btn btn-light'>{linkText}</button>
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
}

export function CatchBoundary() {
  const caughtResponse = useCatch()

  const message = caughtResponse.data?.message || 'Data not found.'

  return (
    <main className='flex justify-center items-center'>
      <div className='bg-slate-100 p-24 w-fit flex flex-col items-center gap-6'>
        <p className='text-5xl font-bold text-heading-blue uppercase'>
          An Error Occured
        </p>
        <p className='text-xl font-bold text-heading-blue'>{message}</p>

        <a href='/'>
          <button className='btn btn-primary mt-12'>Go home</button>
        </a>
      </div>
    </main>
  )
}

export function ErrorBoundary({ error }) {
  return (
    <div className='flex justify-center items-center min-h-[67vh]'>
      <div className='bg-slate-100 py-16 px-24 w-fit flex flex-col items-center gap-2'>
        <p className='text-9xl font-bold text-heading-blue uppercase font-serif tracking-tight'>
          404
        </p>
        <p className='text-xl font-bold text-heading-blue text-center'>
          Error loading data
        </p>
      </div>
    </div>
  )
}
