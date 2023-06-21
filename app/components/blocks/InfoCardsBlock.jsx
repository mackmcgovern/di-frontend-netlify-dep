import InfoCard from '~/components/InfoCard'

export default function InfoCardsBlock({ data, baseUrl }) {
  const { providerCard, image, padding } = data

  const paddingTop = `${padding?.top ? padding.top : 4}`
  const paddingBottom = `${padding?.bottom ? padding.bottom : 4}`

  const dynamicPadding = {
    paddingTop: `calc(${paddingTop}rem + 1.5625vw)`,
    paddingBottom: `calc(${paddingBottom}rem + 1.5625vw)`,
  }

  return (
    <section className='container px-4'>
      <div
        className='flex flex-wrap justify-center gap-12 max-w-6xl mx-auto'
        style={dynamicPadding}>
        {providerCard.map((card, i) => {
          return (
            <InfoCard
              cardData={card}
              key={i}
              baseUrl={baseUrl}
              image={image.data.filter(
                img => img.attributes.name === card.imageName
              )}
            />
          )
        })}
      </div>
    </section>
  )
}
