import Link from 'next/link'

export default function Footer(): React.JSX.Element {
  return (
    <footer className='border-t [border-image:linear-gradient(to_right,transparent,theme(colors.orange.300/.4),transparent)1] dark:[border-image:linear-gradient(to_right,transparent,theme(colors.orange.300/.16),transparent)1] shadow-[0_1px_0_0_theme(colors.white/.2)] dark:shadow-none'>
      <div className='px-4 sm:px-6'>
        <div className='max-w-3xl mx-auto'>
          <div className='text-center py-8'>
            <p className='text-sm text-gray-700 dark:text-gray-400'>
              © User Manager - A more meaningful home for your team. Built by{' '}
              <Link
                className='font-medium text-orange-400 hover:underline'
                href='https://jesusavilx.com'
                target='_blank'>
                Jesús Avila
              </Link>
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
