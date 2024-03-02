import React from 'react'
import AppBarElement from './AppBarElement'

function Layout({children}) {
  return (
    <div>
      <AppBarElement></AppBarElement>
      {children}
    </div>
  )
}

export default Layout
