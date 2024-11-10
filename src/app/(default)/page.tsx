import PageHeader from '@/components/page-header'
import SubscribeForm from '@/components/subscribe-form'

export default function Home() {
  return (
    <section>
      <div className='pt-32 pb-12 md:pt-44 md:pb-20'>
        <div className='px-4 sm:px-6'>
          <PageHeader
            className='mb-12'
            title='The user manager that makes your life easier'
            description='You can sing in by using the default email and password in the log in page, or you can create an accout to play with the app.'>
            User Manager <span className='text-gray-300 mx-1'>·</span> Sing In to Use
          </PageHeader>

          <SubscribeForm />
        </div>
      </div>
    </section>
  )
}
