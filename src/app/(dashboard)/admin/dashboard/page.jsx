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

const Dashboard = () => {
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
                      <Link href={"/admin/dashboard"}>
                       Dashboard
                      </Link>
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

                   <CollapsibleContent>
                    <SidebarMenuSub>

                      <SidebarMenuSubItem>
                        <SidebarMenuButton asChild>
                          <Link href="/admin/dashboard/add-category">Add Category</Link>
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

export default Dashboard;
