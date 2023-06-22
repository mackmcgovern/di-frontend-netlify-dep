import { Link } from '@remix-run/react'

// PROVIDER CARDS
export default function InfoCard({ cardData, image, baseUrl }) {
  const { linkPath, name, credentials, title } = cardData
  const imageUrl = image[0]?.attributes.url
    ? `${baseUrl}${image[0].attributes.formats.medium.url}`
    : 'images/person-placeholder.png'

  return (
    <Link to={linkPath}>
      <div className='w-[18rem] h-[27rem]  md-w-[20rem] md-h-[30rem] shadow-md rounded-sm pb-12 overflow-hidden hover:scale-[1.02] hover:shadow-lg transitions ease duration-500'>
        <div className='flex flex-col items-center gap-y-8'>
          <div className='w-[18rem] md-w-[20rem] rounded-t-sm overflow-clip'>
            <img
              src={imageUrl}
              alt=''
              className='w-full aspect-square  object-cover object-center brightness-95'
            />
          </div>

          <div className='text-center flex flex-col gap-2'>
            <p className='font-bold text-2xl text-dark-blue'>{name}</p>
            {credentials && <p className='text-base'>{credentials}</p>}
            {title && <p className='text-xl'>{title}</p>}
          </div>
        </div>
      </div>
    </Link>
  )
}
