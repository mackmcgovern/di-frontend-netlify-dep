import { redirect } from '@remix-run/node'
import {
  useLoaderData,
  Link,
  useActionData,
  useSubmit,
  useNavigation,
} from '@remix-run/react'
import qs from 'qs'
import renderBlocks from '../utils/renderBlocks'
import nodemailer from '~/utils/nodemailer.server'
import { validateFormData } from '~/utils/validation.server'

import { useEffect, useRef } from 'react'
import ReCAPTCHA from 'react-google-recaptcha'

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
  const BASE_URL = `${process.env.BASE_URL}/api/pages`
  const res = await fetch(`${BASE_URL}?${QUERY('contact')}`)
  const data = await res.json()
  const siteKey = process.env.REACT_APP_SITE_KEY

  return {
    page: data,
    siteKey,
  }
}

export async function action({ request }) {
  const form = await request.formData()
  const formData = Object.fromEntries(form)
  const secret = process.env.REACT_APP_SECRET_KEY

  const human = await validateHuman(formData.token)
  if (!human) {
    return null
  }

  async function validateHuman(token) {
    const response = await fetch(
      `https://www.google.com/recaptcha/api/siteverify?secret=${secret}&response=${token}`,
      { method: 'POST' }
    )
    const data = await response.json()
    return data.success
  }

  try {
    validateFormData(formData)
  } catch (error) {
    return error
  }

  if (formData.honeypot !== '') {
    return redirect('/contact-success')
  }

  const html = `
  <p style="color:#65748c;">You received a new message from your contact form.</p>
  <hr style="height:0.5px; border:none; color:#ddd; background-color:#ddd;">
  <p style="font-size:1rem;color:#444"><span style="color:#113b80;font-size:1.2rem;">Name:</span> ${formData.name}</p>
  <hr style="height:0.5px; border:none; color:#ddd; background-color:#ddd;">
  <p style="font-size:1rem;color:#444"><span style="color:#113b80;font-size:1.2rem;">Email:</span> ${formData.email}</p>
  <hr style="height:0.5px; border:none; color:#ddd; background-color:#ddd;">
  <p style="font-size:1rem;color:#444"><span style="color:#113b80;font-size:1.2rem;">Message:</span> ${formData.message}</p>
  <hr style="height:0.5px; border:none; color:#ddd; background-color:#ddd;">
  `

  const email = process.env.EMAIL
  const pass = process.env.EMAIL_PASS
  const receivingEmail = process.env.RECEIVING_CONTACT_EMAIL

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    port: 587,
    auth: {
      user: email,
      pass,
    },
  })

  const mailOptions = {
    from: {
      name: formData.name,
      address: formData.email,
    },
    to: receivingEmail,
    subject: formData.subject,
    replyTo: formData.email,
  }

  try {
    let info = await transporter.sendMail({
      ...mailOptions,
      html,
    })
    console.log(info, 'INFÖ')

    if (info.rejected.length > 0) {
      return { error: 'Error sending message.' }
    }
    return redirect('/contact-success')
  } catch (error) {
    throw new Error(error.message)
  }
}

export default function ContactPage() {
  const message = useActionData()
  const submit = useSubmit()
  message && console.log(message)

  const { page, siteKey } = useLoaderData()
  const pg = page.data[0].attributes.Blocks

  const validationErrors = useActionData()
  const navigation = useNavigation()
  const isSubmitting = navigation.state === 'submitting'
  const formRef = useRef()
  const captchaRef = useRef(null)

  useEffect(() => {
    if (!isSubmitting) {
      formRef.current.reset()
    }
  }, [isSubmitting])

  const handleSubmit = async e => {
    e.preventDefault()
    let $form = e.currentTarget
    let formData = new FormData($form)
    let token = await captchaRef.current.executeAsync()
    captchaRef.current.reset()

    formData.set('token', token)
    submit(formData, {
      method: $form.getAttribute('method') ?? $form.method,
    })
  }

  return (
    <div>
      <div>{renderBlocks(pg)}</div>

      <div className='mt-2 mb-20 md:mb-32'>
        <form method='post' ref={formRef} onSubmit={handleSubmit}>
          <div className='flex flex-col gap-2 justify-center items-center contact'>
            <div className='flex flex-col'>
              <label
                htmlFor='name'
                className={
                  validationErrors && validationErrors.name ? 'error' : ''
                }>
                Name:
              </label>
              <input
                type='text'
                name='name'
                id='name'
                required
                className={
                  validationErrors && validationErrors.name ? 'error' : ''
                }
              />
              <span className='error'>
                {validationErrors && validationErrors.name
                  ? validationErrors.name
                  : ''}
              </span>
            </div>
            <div className='flex flex-col'>
              <label
                htmlFor='subject'
                className={
                  validationErrors && validationErrors.subject ? 'error' : ''
                }>
                Subject:
              </label>
              <input
                type='text'
                name='subject'
                id='subject'
                required
                className={
                  validationErrors && validationErrors.subject ? 'error' : ''
                }
              />
              <span className='error'>
                {validationErrors && validationErrors.subject
                  ? validationErrors.subject
                  : ''}
              </span>
            </div>
            {/* Antispam honeypot */}
            <input type='text' name='honeypot' className='hidden' />
            <div className='flex flex-col'>
              <label
                htmlFor='email'
                className={
                  validationErrors && validationErrors.email ? 'error' : ''
                }>
                Email:
              </label>
              <input
                type='email'
                name='email'
                id='email'
                required
                className={
                  validationErrors && validationErrors.email ? 'error' : ''
                }
              />
              <span className='error'>
                {validationErrors && validationErrors.email
                  ? validationErrors.email
                  : ''}
              </span>
            </div>
            <div className='flex flex-col'>
              <label
                htmlFor='message'
                className={
                  validationErrors && validationErrors.message ? 'error' : ''
                }>
                Message:
              </label>
              <textarea
                name='message'
                id='message'
                cols='30'
                rows='10'
                required
                className={
                  validationErrors && validationErrors.message ? 'error' : ''
                }></textarea>
              <span className='error'>
                {validationErrors && validationErrors.message
                  ? validationErrors.message
                  : ''}
              </span>
            </div>
            <ReCAPTCHA sitekey={siteKey} ref={captchaRef} size='invisible' />
            <button
              type='submit'
              disabled={isSubmitting}
              className='btn btn-primary disabled:opacity-80 mt-6'>
              {isSubmitting ? 'Sending' : 'Send'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export function ErrorBoundary({ error }) {
  return (
    <div className='text-center p-12 min-h-[60vh] flex items-center justify-center text-heading-blue'>
      <div className='border border-slate-200 rounded-sm p-10 w-fit'>
        <h1 className='text-5xl font-bold text-center mb-4'>Error</h1>
        <p className='text-base max-w-4xl text-center text-heading-blue'>
          Error sending message
        </p>
        <Link to='/contact'>
          <button className='btn btn-primary mt-6'>Go Back</button>
        </Link>
      </div>
    </div>
  )
}
