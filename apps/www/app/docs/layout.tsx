"use client";

import { siteConfig } from "@/config/site";
import { Menu } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import SidebarNav from "@/components/docs/sidebar-nav";

interface DocsLayoutProps {
  children: React.ReactNode;
}

export default function DocsLayout({ children }: DocsLayoutProps) {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="flex h-screen flex-col overflow-hidden bg-background selection:bg-muted">
      <header className="z-50 flex h-14 shrink-0 items-center gap-4 px-4 md:px-6">
        <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
          <SheetTrigger className="md:hidden flex items-center justify-center rounded-md p-2 text-muted-foreground hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary">
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle Menu</span>
          </SheetTrigger>
          <SheetContent side="left" className="w-72 pr-0">
            <SheetHeader className="px-2 text-left">
              <SheetTitle className="text-xl font-bold">
                {siteConfig.name}
              </SheetTitle>
            </SheetHeader>
            <div className="overflow-y-auto h-full p-2 pt-0 pl-1">
              <SidebarNav
                pathname={pathname}
                onLinkClick={() => setIsMobileMenuOpen(false)}
              />
            </div>
          </SheetContent>
        </Sheet>

        <Link href="/" className="text-xl font-bold hidden md:block">
          {siteConfig.name}
        </Link>

        <nav className="ml-auto flex items-center gap-6 text-sm font-medium">
          <Link
            href={siteConfig.links.githubRepo}
            target="_blank"
            className="text-muted-foreground hover:text-foreground border px-3 py-1.5 rounded-md hover:bg-muted/50 transition-all duration-300"
          >
            GitHub
          </Link>
        </nav>
      </header>

      <div className="flex flex-1 overflow-hidden">
        <aside className="hidden md:block w-64 shrink-0 overflow-y-auto px-2 py-8">
          <SidebarNav pathname={pathname} />
        </aside>

        <main className="flex-1 overflow-y-hidden h-full p-2 pt-0 rounded">
          {children}
        </main>
      </div>
    </div>
  );
}
