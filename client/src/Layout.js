import Footer from './components/Footer'
import Navbar from './components/Navbar'
import Logout from './components/Logout'
import CRUDdata from './components/CRUDdata'
import CRUDtestWithPie from './components/CRUDtestWithPie'
import CRUD_RT from './components/CRUD_RT'

const Layout = ({ children }) => {
  return (
    <>
      <main>{children}</main>
      <CRUD_RT />
      <Logout />
      <Footer />
    </>
  )
}

export default Layout
