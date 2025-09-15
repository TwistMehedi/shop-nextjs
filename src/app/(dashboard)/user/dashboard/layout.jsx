import React from 'react'
import { SidebarProvider } from '@/components/ui/sidebar'
import UserDashboard from './page';

const UserDashboardLayout = ({children}) => {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen">
        <UserDashboard />
        <main className="flex-1 p-6">{children}</main>
      </div>
    </SidebarProvider>
  )
}

export default UserDashboardLayout;
