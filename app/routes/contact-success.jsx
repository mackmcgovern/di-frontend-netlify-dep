import { Link } from '@remix-run/react'
import PageHeader from '~/components/blocks/PageHeader'

const headerData = {
  heading: 'Contact',
  colorTheme: 'dark blue',
}

export default function ContactSuccessPage() {
  return (
    <>
      <PageHeader data={headerData} />
      <div className='text-center p-12 min-h-[50vh] flex items-center justify-center text-heading-blue'>
        <div className='border border-slate-200 rounded-sm py-10 px-14 w-fit'>
          <h1 className='text-3xl font-bold text-center mb-4'>Thank you</h1>
          <p className='text-base max-w-4xl text-center text-heading-blue'>
            Your message was sent successfully.
          </p>
          <Link to='/contact'>
            <button className='btn btn-primary mt-6'>Go Back</button>
          </Link>
        </div>
      </div>
    </>
  )
}
