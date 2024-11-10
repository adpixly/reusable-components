'use client'

import VerticalLines from '@/components/vertical-lines'
import Header from '@/components/ui/header'
import Footer from '@/components/ui/footer'

export default function DefaultLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <VerticalLines />
      {/* <BgShapes /> */}
      <Header />

      <main className='grow'>{children}</main>

      <Footer />
    </>
  )
}
