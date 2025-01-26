"use client";

import Breadcrumb from "@/components/layout/breadcrumb/Breadcrumb";
import AppSiderbar from "@/components/layout/sidebar/AppSidebar";
import usePageTitle from "@/hooks/usePageTitle";
import { usePathname } from "next/navigation";
import React from "react";

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  const { title, breadcrumbs } = usePageTitle();

  return (
    <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-10">
      <div className="col-span-1 md:col-span-4 lg:col-span-3">
        <AppSiderbar />
      </div>

      <div className="col-span-1 md:col-span-8 lg:col-span-9">
        <Breadcrumb title={title} breadcrumbs={breadcrumbs} />
        {children}
      </div>
    </div>
  );
};

export default AdminLayout;
