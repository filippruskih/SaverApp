import CRUD_RT from './components/CRUD_RT'
import Home from './components/Home';
import About from './components/About';
import Service from './components/Service';
import Facts from './components/Facts';
import Blog from './components/Blog';
import Contact from './components/Contact';
import MapMarker from './components/MapMarker';

//layout of the home page of the app
const Layout = ({ children }) => {
  return (
    <>
      <main>{children}</main>
      <Home />
      <CRUD_RT className={'App ${theme}'}/>
      <About />
      <Service />
      <Blog />
      <Facts />
      <Contact />
      <MapMarker />
    </>
  )
}

export default Layout
