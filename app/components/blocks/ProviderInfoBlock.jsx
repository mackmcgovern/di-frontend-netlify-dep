export default function ProviderInfoBlock({ data, baseUrl }) {
  const { image, name, title, credentials, specialties } = data
  const imageUrl = image?.data?.attributes.url
    ? `${baseUrl}${image?.data?.attributes?.url}`
    : '/images/person-placeholder.png'

  return (
    <section className='flex flex-col lg:flex-row gap-x-10 lg:gap-6 pt-8 lg:pt-16 container px-4 md:px-8 justify-center text-center max-w-7xl'>
      <img
        src={imageUrl}
        alt={image?.data?.attributes.alternativeText || 'provider'}
        className='object-cover object-center aspect-[4/3]  rounded-sm mx-auto w-[85%] max-w-lg relative top-6 lg:static shadow-md'
      />
      <div className='bg-slate-100 shadow-sm p-2 sm:p-6 pt-8 lg:pt-6 box-border w-full flex flex-col justify-between divide-y divide-btn-primary-blue gap-6 min-w-min mx-auto lg:mx-0'>
        <div className='mt-4'>
          {name && (
            <p className='text-4xl text-heading-blue font-bold'>{name}</p>
          )}
          {title && <p className='text-xl my-2'>{title}</p>}
          {credentials && <p>{credentials}</p>}
        </div>
        {specialties.length > 1 && (
          <div className='pt-6 min-h-[50%]'>
            <p className='text-2xl font-bold mb-4 text-heading-blue'>
              Specialties
            </p>
            <ul className='grid grid-cols-2 md:grid-cols-3 gap-y-4 leading-[1.3] gap-x-6 text-left px-2'>
              {specialties.map(item => (
                <li key={item.id}>
                  <span className='opacity-80 text-heading-blue'>◆ </span>
                  {item.specialty}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </section>
  )
}
