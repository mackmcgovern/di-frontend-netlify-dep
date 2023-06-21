import { Link } from '@remix-run/react'
import FaxIcon from './icons/FaxIcon'
import LocationIcon from './icons/LocationIcon'
import PhoneIcon from './icons/PhoneIcon'

const date = new Date()
const year = date.getFullYear()

export default function Footer() {
  return (
    <footer className='bg-footer-blue pt-12 pb-20 md:pb-22 relative'>
      <div className='container pl-8 pr-4 md:px-0'>
        <div className='flex flex-col md:flex-row gap-y-12 gap-x-1 justify-between px-4 lg:px-12'>
          <div>
            <p className='text-accent-gold w-max mb-2 text-xl uppercase tracking-widest'>
              <Link to='/contact'>Contact</Link>
            </p>
            <ul className='flex flex-col gap-y-2 opacity-80 font-light text-white'>
              <li>
                <PhoneIcon />
                <a href='tel:218-727-7353' className='font-sans opacity-100'>
                  (218) 727-7353
                </a>
              </li>
              <li>
                <FaxIcon />
                (218) 727-2646
              </li>
              <li>
                <LocationIcon />
                104 West Superior Street, Suite 200 Duluth, MN 55802
              </li>
            </ul>
          </div>

          <div>
            <p className='text-accent-gold font-serif opacity-80 uppercase max-w-fit text-xl mb-2 tracking-widest'>
              Clinic Hours
            </p>
            <ul className='flex flex-col gap-y-2 opacity-90 font-light text-white '>
              <li>Monday - Friday: 8:00 AM - 4:00 PM</li>
              <li>Saturday - Sunday: Closed</li>
            </ul>
          </div>
          <iframe
            src='https://www.google.com/maps/embed?pb=!1m13!1m8!1m3!1d1365.9707444587725!2d-92.0999879!3d46.7857573!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zNDbCsDQ3JzA4LjciTiA5MsKwMDUnNTguMiJX!5e0!3m2!1sen!2sus!4v1680734890224!5m2!1sen!2sus'
            width='230'
            height='150'
            style={{ border: 0 }}
            allowFullScreen=''
            loading='lazy'
            referrerPolicy='no-referrer-when-downgrade'
            title='map'></iframe>
        </div>
        <div className='absolute left-0 right-0 bottom-0 top-[90%] md:px-14 container flex items-center justify-center  pb-4'>
          <p className='text-sm text-white opacity-50 font-light'>
            {`Copyright © ${year}  Duluth Institute | All Rights Reserved`}
          </p>
        </div>
      </div>
    </footer>
  )
}
