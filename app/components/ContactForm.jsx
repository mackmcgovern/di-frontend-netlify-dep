import { Form, useNavigation, useActionData } from '@remix-run/react'
import { useEffect, useRef } from 'react'
import ReCAPTCHA from 'react-google-recaptcha'

export default function ContactForm({ siteKey }) {
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

  return (
    <div className='mt-2 mb-20 md:mb-32'>
      <Form method='post' ref={formRef}>
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
          <ReCAPTCHA sitekey={siteKey} ref={captchaRef} />
          <button
            type='submit'
            disabled={isSubmitting}
            className='btn btn-primary disabled:opacity-80 mt-6'>
            {isSubmitting ? 'Sending' : 'Send'}
          </button>
        </div>
      </Form>
    </div>
  )
}
