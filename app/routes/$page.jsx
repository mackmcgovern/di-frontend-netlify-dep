import { useLoaderData, useCatch } from '@remix-run/react'
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
    },
  })

export async function loader(LoaderArgs) {
  const { params } = LoaderArgs
  const BASE_URL = `${process.env.BASE_URL}/api/pages`
  const res = await fetch(`${BASE_URL}?${QUERY(params.page)}`)
  const data = await res.json()
  const baseUrl = process.env.BASE_URL
  return { page: data, baseUrl }
}

export default function Page() {
  const { page, baseUrl } = useLoaderData()
  const pg = page?.data[0]?.attributes.Blocks

  return <main className='min-h-[50vh]'>{renderBlocks(pg, baseUrl)}</main>
}

export function ErrorBoundary({ error }) {
  console.log(error.message)

  return (
    <main className='flex justify-center items-center min-h-[67vh]'>
      <div className='bg-slate-100 py-16 px-24 w-fit flex flex-col items-center gap-2'>
        <p className='text-9xl font-bold text-heading-blue uppercase font-serif tracking-tight'>
          404
        </p>
        <p className='text-xl font-bold text-heading-blue text-center'>
          The requested page could not be found.
        </p>

        <a href='/'>
          <button className='btn btn-primary mt-16'>Go home</button>
        </a>
      </div>
    </main>
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
