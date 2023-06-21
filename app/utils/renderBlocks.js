import InfoBlockSmall from '~/components/blocks/InfoBlockSmall'
import InfoTextBlock from '~/components/blocks/InfoTextBlock'
import PageHeader from '~/components/blocks/PageHeader'
import HeroHeader from '~/components/blocks/HeroHeader'
import CardsBlock from '~/components/blocks/CardsBlock'
import TextBlock from '~/components/blocks/TextBlock'
import InfoCardsBlock from '~/components/blocks/InfoCardsBlock'
import ProviderInfoBlock from '~/components/blocks/ProviderInfoBlock'

export default function renderBlocks(blocks, baseUrl) {
  return blocks.map((block, index) => {
    switch (block.__component) {
      case 'page.call-to-action':
        return <HeroHeader data={block} key={index} baseUrl={baseUrl} />
      case 'page.page-header': {
        return <PageHeader data={block} key={index} />
      }
      case 'page.info-link-block':
        return <InfoBlockSmall data={block} key={index} />
      case 'page.info-text-block':
        return <InfoTextBlock data={block} key={index} />
      case 'page.card-block':
        return <CardsBlock data={block} key={index} baseUrl={baseUrl} />
      case 'page.text-block':
        return <TextBlock data={block} key={index} />
      case 'page.provider-card-block':
        return <InfoCardsBlock data={block} key={index} baseUrl={baseUrl} />
      case 'page.provider-info':
        return <ProviderInfoBlock data={block} key={index} baseUrl={baseUrl} />
      default:
        return null
    }
  })
}
