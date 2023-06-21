import CardVarient from '~/components/CardVarient'
import { Link, useCatch } from '@remix-run/react'

export default function CardsBlock({ data, baseUrl }) {
  const { link, photoCard, photos, heading, padding } = data
  const paddingTop = `${padding?.top ? padding.top : 2}`
  const paddingBottom = `${padding?.bottom ? padding.bottom : 2}`

  const dynamicPadding = {
    paddingTop: `calc(${paddingTop}rem + 1.6625vw)`,
    paddingBottom: `calc(${paddingBottom}rem + 1.6625vw)`,
  }

  return (
    <section style={dynamicPadding}>
      <div className='container px-4 flex flex-col items-center gap-y-8'>
        {heading && <h2 className='text-center mb-4'>{heading}</h2>}
        <div className={`grid grid-cols-1 lg:grid-cols-2 gap-10 my-2`}>
          {photoCard.map((card, i) => (
            <CardVarient
              key={i}
              cardData={card}
              cardImage={photos.data.filter(
                photo => photo.attributes.name === card.photoName
              )}
              baseUrl={baseUrl}
            />
          ))}
        </div>
        {link &&
          link.map((el, i) => (
            <span key={i}>
              <Link to={el.linkPath}>
                <button className='btn btn-primary w-fit my-8'>
                  {el.linkText}
                </button>
              </Link>
            </span>
          ))}
      </div>
    </section>
  )
}

export function ErrorBoundary({ error }) {
  return (
    <div className='flex justify-center items-center min-h-[67vh]'>
      <div className='bg-slate-100 py-16 px-24 w-fit flex flex-col items-center gap-2'>
        <p className='text-xl font-bold text-heading-blue text-center'>
          Error loading data
        </p>
      </div>
    </div>
  )
}

export function CatchBoundary() {
  const caughtResponse = useCatch()

  const message = caughtResponse.data?.message || 'Data not found.'

  return (
    <div className='flex justify-center items-center'>
      <div className='bg-slate-100 p-24 w-fit flex flex-col items-center gap-6'>
        <p className='text-5xl font-bold text-heading-blue uppercase'>
          An Error Occured
        </p>
        <p className='text-xl font-bold text-heading-blue'>{message}</p>

        <a href='/'>
          <button className='btn btn-primary mt-12'>Go home</button>
        </a>
      </div>
    </div>
  )
}
