'use client'

import { Button } from '%/buttons'
import { Form } from '%/form'
import { Input, Select } from '%/inputs'
import Link from 'next/link'
import { useState } from 'react'
import {
  type SubmissionStatus,
  type SelectSettings,
  type Styles,
  type FormData,
  type RequestConfig,
  type SelectOption
} from '%/types'
import { countries } from '%/constants'

export default function LogInPage() {
  const [modalOpen, setModalOpen] = useState(false)
  const [response, setResponse] = useState<string | null>(null)
  const [error, setError] = useState(false)

  const requestConfig: RequestConfig = {
    fetchConfig: { method: 'POST' },
    url: '/api/agency/messages'
  }

  const styles: Styles = {
    inputStyles: {
      generalStyles: 'form-input text-sm w-full',
      nonErrorStyles: 'bg-white dark:bg-slate-800 border-gray-200 text-gray-600 dark:text-gray-300',
      errorStyles: 'bg-rose-200 dark:placeholder-gray-600 dark:bg-rose-300 border-red-400 text-gray-800'
    },
    selectStyles: {
      generalStyles: 'form-input text-sm',
      nonErrorStyles: 'bg-white dark:bg-slate-800 border-gray-200 text-gray-600 dark:text-gray-300',
      errorStyles: 'bg-rose-200 dark:placeholder-gray-600 dark:bg-rose-300 border-red-400 text-gray-800'
    }
  }

  const findGB = (countries: SelectOption[]) => {
    const indexArray = countries.findIndex(obj => obj.image?.alt === 'GB')

    let topCountries: SelectOption[] = []
    let updatedCountries: SelectOption[] = [...countries]

    if (indexArray !== -1) {
      topCountries = updatedCountries.splice(indexArray, 1)
    }

    return {
      updatedCountries,
      topCountries
    }
  }

  const { updatedCountries, topCountries } = findGB(countries)

  const selectCountrySettings: SelectSettings = {
    name: 'Countries',
    topOptions: topCountries,
    options: updatedCountries
  }

  const onSubmit = (data: FormData, status: SubmissionStatus) => {
    setResponse(status.message)
    setError(status.error)
    setModalOpen(true)

    console.log(data)
  }

  return (
    <>
      {/* Page header */}
      <div className='max-w-3xl mx-auto text-center pb-12 md:pb-16'>
        <h1 className='font-inter-tight text-5xl md:text-6xl font-bold text-gray-800 dark:text-transparent dark:bg-clip-text dark:bg-gradient-to-b dark:from-orange-200 dark:to-gray-200 pb-4'>
          Log in to the user manager
        </h1>
        <p className='text-lg text-gray-700 dark:text-gray-400'>
          You can log in using the default values in the form. Just{' '}
          <strong className='font-bold underline'>click the log in button</strong> and you're ready to go.
        </p>
      </div>

      {/* Form */}
      <div className='relative flex items-center justify-center gap-10 before:h-px before:w-full before:border-b before:[border-image:linear-gradient(to_right,transparent,theme(colors.orange.300/.8),transparent)1] dark:before:[border-image:linear-gradient(to_right,transparent,theme(colors.orange.300/.16),transparent)1] before:shadow-sm before:shadow-white/20 dark:before:shadow-none after:h-px after:w-full after:border-b after:[border-image:linear-gradient(to_right,transparent,theme(colors.orange.300/.8),transparent)1] dark:after:[border-image:linear-gradient(to_right,transparent,theme(colors.orange.300/.16),transparent)1] after:shadow-sm after:shadow-white/20 dark:after:shadow-none mb-11'>
        <div className='w-full max-w-xs mx-auto shrink-0'>
          <div className='relative'>
            {/* Border with dots in corners */}
            <div
              className='absolute -inset-3 bg-orange-500/15 dark:bg-transparent dark:bg-gradient-to-b dark:from-gray-800/80 dark:to-gray-800/70 rounded-lg -z-10 before:absolute before:inset-y-0 before:left-0 before:w-[15px] before:bg-[length:15px_15px] before:[background-position:top_center,bottom_center] before:bg-no-repeat before:[background-image:radial-gradient(circle_at_center,theme(colors.orange.500/.56)_1.5px,transparent_1.5px),radial-gradient(circle_at_center,theme(colors.orange.500/.56)_1.5px,transparent_1.5px)] dark:before:[background-image:radial-gradient(circle_at_center,theme(colors.gray.600)_1.5px,transparent_1.5px),radial-gradient(circle_at_center,theme(colors.gray.600)_1.5px,transparent_1.5px)] after:absolute after:inset-y-0 after:right-0 after:w-[15px] after:bg-[length:15px_15px] after:[background-position:top_center,bottom_center] after:bg-no-repeat after:[background-image:radial-gradient(circle_at_center,theme(colors.orange.500/.56)_1.5px,transparent_1.5px),radial-gradient(circle_at_center,theme(colors.orange.500/.56)_1.5px,transparent_1.5px)] dark:after:[background-image:radial-gradient(circle_at_center,theme(colors.gray.600)_1.5px,transparent_1.5px),radial-gradient(circle_at_center,theme(colors.gray.600)_1.5px,transparent_1.5px)]'
              aria-hidden='true'
            />
            <Form onSubmit={onSubmit} styles={styles} requestConfig={requestConfig}>
              <div className='space-y-4'>
                <Input
                  label='Email'
                  labelClass='block text-sm text-gray-800 dark:text-gray-300 font-medium mb-2'
                  name='email'
                  id='email'
                  type='email'
                  placeholder='jhon@metacorp.com'
                  required
                  symbolRequired=''
                />
                <Input
                  label='Phone Number'
                  labelClass='block text-sm text-gray-800 dark:text-gray-300 font-medium mb-2'
                  name='tel'
                  id='tel'
                  type='tel'
                  placeholder='xxx-xxx-xxxx'
                  required
                  symbolRequired=''
                />
                <Input
                  required
                  id='phone'
                  name='phone'
                  label='Phone Number'
                  placeholder='(xxx) xxx-xxxx'
                  prefix={
                    <Select
                      asPrefix
                      required
                      id='countryCode'
                      name='countryCode'
                      placeholder='Country'
                      settings={selectCountrySettings}
                    />
                  }
                />
                <Input
                  label='Password'
                  labelClass='block text-sm text-gray-800 dark:text-gray-300 font-medium mb-2'
                  name='password'
                  id='password'
                  type='password'
                  recover='Forgot?'
                  recoverLink='/reset-password'
                  placeholder='************'
                  required
                  symbolRequired=''
                />
                <Input
                  label='Repeat Password'
                  labelClass='block text-sm text-gray-800 dark:text-gray-300 font-medium mb-2'
                  name='confirmPassword'
                  id='confirmPassword'
                  type='password'
                  placeholder='************'
                  required
                  symbolRequired=''
                />
                <div>
                  <div className='flex justify-between'>
                    <label
                      className='block text-sm text-gray-800 dark:text-gray-300 font-medium mb-2'
                      htmlFor='password'>
                      Password
                    </label>
                    <Link
                      className='text-sm font-medium text-gray-700 dark:text-gray-400 underline hover:no-underline ml-2'
                      href='/reset-password'>
                      Forgot?
                    </Link>
                  </div>
                  <input
                    id='password'
                    className='form-input text-sm w-full'
                    type='password'
                    placeholder='************'
                    defaultValue='k23?4djQ1L%4$'
                    required
                  />
                </div>
              </div>
              <div className='mt-5'>
                <Button
                  preserveStyles={false}
                  placeholder='Log In'
                  className='btn text-gray-100 bg-gray-900 hover:bg-gray-800 dark:text-gray-800 dark:bg-orange-300 dark:hover:bg-orange-200 w-full shadow'
                />
              </div>
            </Form>
            {/* Divider */}
            <div className='flex items-center my-5 before:border-t before:border-gray-600 before:dark:border-gray-300 before:grow before:mr-3 after:border-t after:border-gray-600 after:dark:border-gray-300 after:grow after:ml-3'>
              <div className='text-xs italic'>Or</div>
            </div>
            {/* Social login */}
            <button className='btn text-gray-600 bg-white hover:text-gray-900 w-full shadow group relative flex after:flex-1'>
              <div className='flex-1 flex items-center'>
                <svg
                  className='w-4 h-4 fill-gray-300 group-hover:fill-rose-500 shrink-0 transition'
                  viewBox='0 0 16 16'
                  xmlns='http://www.w3.org/2000/svg'>
                  <path d='M15.679 6.545H8.043v3.273h4.328c-.692 2.182-2.401 2.91-4.363 2.91a4.727 4.727 0 1 1 3.035-8.347l2.378-2.265A8 8 0 1 0 8.008 16c4.41 0 8.4-2.909 7.67-9.455Z' />
                </svg>
              </div>
              <span className='flex-auto pl-3'>Continue With Google</span>
            </button>
            <div className='text-center mt-6'>
              <div className='text-xs text-gray-600 dark:text-gray-300'>
                By loggin in you agree with our{' '}
                <a className='underline hover:no-underline' href='#0'>
                  Terms
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
