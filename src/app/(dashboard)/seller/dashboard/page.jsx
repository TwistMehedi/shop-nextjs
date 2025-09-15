"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarMenuSub,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";

import {
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent,
} from "@/components/ui/collapsible";

import { ChevronDown, ChevronRight } from "lucide-react";
import { useState } from "react";
import Link from "next/link";

const SellerDashboard = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Sidebar className="pt-15">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {/* Dashboard Menu */}
              <Collapsible>
                <SidebarMenuItem>
                  <CollapsibleTrigger asChild>
                    <SidebarMenuButton className="flex justify-between items-center">
                      <Link href={"/seller/dashboard"}>Dashboard</Link>
                    </SidebarMenuButton>
                  </CollapsibleTrigger>
                </SidebarMenuItem>
              </Collapsible>

              {/* Products Menu */}
              <Collapsible
                open={isOpen}
                onOpenChange={(open) => setIsOpen(open)}
                className="group/collapsible"
              >
                <SidebarMenuItem>
                  <CollapsibleTrigger asChild>
                    <SidebarMenuButton className="flex justify-between items-center">
                      Products
                      {isOpen ? (
                        <ChevronDown className="w-4 h-4" />
                      ) : (
                        <ChevronRight className="w-4 h-4" />
                      )}
                    </SidebarMenuButton>
                  </CollapsibleTrigger>

                  {/* ✅ Single CollapsibleContent for all sub-items */}
                  <CollapsibleContent>
                    <SidebarMenuSub>
                      <SidebarMenuSubItem>
                        <SidebarMenuButton asChild>
                          <Link href="/seller/dashboard/add-product/">
                            Add Product
                          </Link>
                        </SidebarMenuButton>
                      </SidebarMenuSubItem>

                      <SidebarMenuSubItem>
                        <SidebarMenuButton asChild>
                          <Link href="/seller/dashboard/all-products">All Products</Link>
                        </SidebarMenuButton>
                      </SidebarMenuSubItem>
                    </SidebarMenuSub>
                  </CollapsibleContent>
                </SidebarMenuItem>
              </Collapsible>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
};

export default SellerDashboard;
