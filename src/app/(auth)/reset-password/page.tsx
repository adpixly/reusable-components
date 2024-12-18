export default function ResetPassword(): React.JSX.Element {
  return (
    <>
      {/* Page header */}
      <div className='max-w-3xl mx-auto text-center pb-12 md:pb-16'>
        <h1 className='font-inter-tight text-5xl md:text-6xl font-bold text-gray-800 dark:text-transparent dark:bg-clip-text dark:bg-gradient-to-b dark:from-orange-200 dark:to-gray-200 pb-4'>
          Reset your password
        </h1>
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
            <form>
              <div className='space-y-4'>
                <div>
                  <label className='block text-sm text-gray-800 dark:text-gray-300 font-medium mb-2' htmlFor='email'>
                    Email
                  </label>
                  <input
                    id='email'
                    className='form-input text-sm w-full'
                    type='email'
                    placeholder='jhon@metacorp.com'
                    required
                    defaultValue='jhon@metacorp.com'
                  />
                </div>
              </div>
              <div className='mt-5'>
                <button className='btn text-gray-100 bg-gray-900 hover:bg-gray-800 dark:text-gray-800 dark:bg-orange-300 dark:hover:bg-orange-200 w-full shadow'>
                  Reset Password
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}
