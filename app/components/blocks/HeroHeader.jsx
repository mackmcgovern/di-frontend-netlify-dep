import { Link } from '@remix-run/react'

export default function HeroHeader({ data, baseUrl }) {
  const { heading, subheading, link, headerImage } = data
  const imageUrl =
    headerImage?.data?.attributes?.url ?? '/images/duluth-downtown.jpg'

  return (
    <div className='relative mt-20 md:mt-0'>
      <div
        className={`headerImg min-h-[95vh] md:min-h-[85vh]  bg-center bg-cover brightness-[0.2] bg-no-repeat`}
        style={{
          backgroundImage: `url(${baseUrl}${imageUrl})`,
        }}></div>

      <div className='px-4 absolute top-0 left-0 right-0 bottom-0 font-sans w-full flex bg-md-blue bg-opacity-[45%] items-center justify-center'>
        <div className='flex flex-col justify-evenly container gap-y-12 items-center max-w-4xl'>
          <div className='text-center'>
            <h1 className='text-white text-[3rem] md:text-[5rem] leading-[1] font-serif z-5 drop-shadow-sm mb-2'>
              {heading}
            </h1>
            <p className='text-white text-base px-12 md:text-lg tracking-widest drop-shadow-sm'>
              {subheading}
            </p>
          </div>
          <div>
            {link && (
              <button className='btn btn-light h-max w-max mt-2'>
                <Link to={link[0].linkPath}>{link[0].linkText}</Link>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
