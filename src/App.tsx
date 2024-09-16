import { ToastContainer } from 'react-toastify'
import useRouteElements from 'src/useRouteElements'
import 'react-toastify/dist/ReactToastify.css'
import { useContext, useEffect } from 'react'
import { LocalStorageEventTarget } from 'src/utils/auth'
import { AppContext } from 'src/contexts/app.context'

function App() {
  const routeElements = useRouteElements()
  const { reset } = useContext(AppContext)
  useEffect(() => {
    LocalStorageEventTarget.addEventListener('clearLS', reset)
    return () => {
      LocalStorageEventTarget.removeEventListener('clearLS', reset)
    }
  }, [])

  return (
    <div>
      {routeElements}
      <ToastContainer />
    </div>
  )
}

export default App
