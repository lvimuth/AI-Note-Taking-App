"use client";
import React from "react";
import SideBar from "./_components/SideBar";
import Header from "./_components/Header";
import { useUser } from "@clerk/nextjs";

function DashboardLayout({ children }) {
  const { user } = useUser();
  return (
    <div>
      <div className="md:w-64 h-screen fixed">
        <SideBar />
      </div>
      <div className="md:ml-64">
        <Header user={user} />
        <div className="p-10">{children}</div>
      </div>
    </div>
  );
}

export default DashboardLayout;
