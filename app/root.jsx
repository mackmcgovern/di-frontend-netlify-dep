import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
  useCatch,
} from '@remix-run/react'
import qs from 'qs'

import stylesheet from '~/tailwind.css'
import Footer from '~/components/Footer'
import Navbar from '~/components/Navbar/desktopNav/Navbar'
import MobileNavbar from '~/components/Navbar/mobileNav/MobileNavBar'

export const meta = () => ({
  charset: 'utf-8',
  title: 'Duluth Institute',
  viewport: 'width=device-width,initial-scale=1,minimum-scale=1',
})

export default function App() {
  const { data } = useLoaderData()
  const envData = useLoaderData()
  const renderedLinks = data.data.map((link, i) => {
    const title = link.attributes.title
    const path = link.attributes.page.data.attributes.slug
    return { title, path }
  })

  return (
    <html lang='en'>
      <head>
        <Meta />
        <Links />
      </head>
      <body>
        <header className='desktop-nav'>
          <Navbar data={data} renderedLinks={renderedLinks} />
        </header>
        <header className='mobile-nav'>
          <MobileNavbar data={data} renderedLinks={renderedLinks} />
        </header>
        <Outlet />
        <script
          dangerouslySetInnerHTML={{
            __html: `window.ENV = ${JSON.stringify(envData.ENV)}`,
          }}
        />
        <Footer />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  )
}

export const links = () => [{ rel: 'stylesheet', href: stylesheet }]

const QUERY = () =>
  qs.stringify({
    populate: {
      page: {
        fields: ['slug'],
      },
      nestedNavLinks: {
        populate: {
          page: {
            field: ['slug'],
          },
          nestedNavLinks: {
            populate: {
              page: {
                field: ['slug'],
              },
            },
          },
        },
      },
    },
  })
//

export async function loader() {
  const BASE_URL_NAV = `${process.env.BASE_URL}/api/navigation-links`
  const res = await fetch(`${BASE_URL_NAV}?${QUERY()}`)
  const data = await res.json()

  return {
    data,
    ENV: {
      REACT_APP_SITE_KEY: process.env.REACT_APP_SITE_KEY,
    },
  }
}

export function CatchBoundary() {
  const caughtResponse = useCatch()

  const message = caughtResponse.data || 'Data not found.'
  const status = caughtResponse.status || 500
  const statusText = caughtResponse.statusText || 'Not Found'
  console.log(caughtResponse)

  return (
    <html lang='en'>
      <head>
        <Meta />
        <Links />
        <title>An Error Occurred</title>
      </head>
      <body>
        <header>
          <div className='container px-4 xl:px-8 md:flex justify-between items-center'>
            <a href='/'>
              <div className='flex items-center'>
                <p className='text-[2.5rem] text-slate-800 logo tracking-wide transition hover:drop-shadow-md leading-24 my-4 ml-4 pt-2'>
                  Duluth Institute
                </p>
              </div>
            </a>
          </div>
        </header>
        <main className='flex justify-center items-center min-h-[67vh]'>
          <div className='bg-slate-100 py-16 px-24 w-fit flex flex-col items-center'>
            <p className='text-9xl font-bold text-heading-blue uppercase font-serif tracking-tight leading-[0.8]'>
              {status}
            </p>
            <p className='text-3xl font-bold text-heading-blue text-center'>
              {statusText}
            </p>
            <p className='text-base font-bold text-heading-blue text-center mt-6'>
              {message}
            </p>

            <a href='/'>
              <button className='btn btn-primary mt-12'>Go home</button>
            </a>
          </div>
        </main>
        <Footer />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  )
}

export function ErrorBoundary({ error }) {
  // console.log(error.message)

  return (
    <html lang='en'>
      <head>
        <Meta />
        <Links />
        <title>An Error Occurred</title>
      </head>
      <body>
        <header>
          <div className='container px-4 xl:px-8 md:flex justify-between items-center'>
            <a href='/'>
              <div className='flex items-center'>
                <img
                  src='images/logo.png'
                  alt='logo'
                  className='py-2 w-14 h-auto brightness-95'
                />
                <p className='text-[2.5rem] text-slate-800 logo tracking-wide transition hover:drop-shadow-md leading-24 my-4 ml-4 pt-2'>
                  Duluth Institute
                </p>
              </div>
            </a>
          </div>
        </header>
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
        <Footer />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  )
}
