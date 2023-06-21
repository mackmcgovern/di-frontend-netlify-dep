import { useLoaderData } from '@remix-run/react'

import qs from 'qs'
import renderBlocks from '~/utils/renderBlocks'

const QUERY = slug =>
  qs.stringify({
    filters: {
      slug: {
        $eq: slug,
      },
    },
    populate: {
      Header: {
        populate: '*',
      },
      Blocks: {
        populate: '*',
      },
      picture: {
        populate: '*',
      },
    },
  })

export async function loader() {
  const BASE_URL = `${process.env.BASE_URL}/api/pages`
  const res = await fetch(`${BASE_URL}?${QUERY('home')}`)
  const data = await res.json()
  const baseUrl = process.env.BASE_URL
  return { page: data, baseUrl }
}

export default function Index() {
  const { page, baseUrl } = useLoaderData()
  const pg = page.data[0].attributes.Blocks
  return (
    <div style={{ fontFamily: 'system-ui, sans-serif', lineHeight: '1.4' }}>
      <div className='min-h-[70vh]'>{renderBlocks(pg, baseUrl)}</div>
    </div>
  )
}
