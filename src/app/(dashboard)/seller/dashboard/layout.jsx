import React from 'react'
import { SidebarProvider } from '@/components/ui/sidebar'
import SellerDashboard from './page';
 
const SellerDashboardLayout = ({children}) => {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen">
        <SellerDashboard />
        <main className="flex-1 p-6">{children}</main>
      </div>
    </SidebarProvider>
  )
}

export default SellerDashboardLayout;
