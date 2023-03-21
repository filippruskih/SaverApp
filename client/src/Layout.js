import Footer from './components/Footer'
import Navbar from './components/Navbar'
import Logout from './components/Logout'
import CRUDdata from './components/CRUDdata'

const Layout = ({ children }) => {
  return (
    <>
      <CRUDdata />
      <main>{children}</main>
      <Logout />
      <Footer />
    </>
  )
}

export default Layout
