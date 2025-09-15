import React from 'react'
import Dashboard from './page'
import { SidebarProvider } from '@/components/ui/sidebar'

const layout = ({children}) => {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen">
        <Dashboard />
        <main className="flex-1 p-6">{children}</main>
      </div>
    </SidebarProvider>
  )
}

export default layout
