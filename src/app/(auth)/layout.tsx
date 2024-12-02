import Header from '@/components/ui/header'

export default function AuthLayout({ children }: { children: React.ReactNode }): React.JSX.Element {
  return (
    <>
      <Header />

      <main className='grow'>
        <section>
          <div className='pt-32 pb-12 md:pt-40 md:pb-20'>
            <div className='px-4 sm:px-6'>{children}</div>
          </div>
        </section>
      </main>
    </>
  )
}
