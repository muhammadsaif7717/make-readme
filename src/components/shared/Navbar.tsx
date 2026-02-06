'use client';

import {
  Copy,
  Download,
  FileText,
  Check,
  Menu,
  X,
  Sparkles,
} from 'lucide-react';
import ThemeToggle from './ThemeToggle';
import { SidebarTrigger } from '../ui/sidebar';
import { useState } from 'react';

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      <nav className="fixed top-0 z-50 w-full border-b bg-white/80 shadow-sm backdrop-blur-md dark:bg-zinc-900/80">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            {/* Left Section - Logo & Sidebar */}
            <div className="flex items-center gap-3">
              <SidebarTrigger className="hover:bg-accent hover:text-accent-foreground rounded-md p-2 transition-colors" />

              <div className="flex items-center gap-3">
                <div className="rounded-xl bg-gradient-to-br from-blue-600 to-purple-600 p-2 shadow-lg">
                  <FileText size={20} className="text-white" />
                </div>
                <div className="hidden sm:block">
                  <h1 className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-lg font-bold text-transparent sm:text-xl">
                    EasyReadme
                  </h1>
                  <p className="text-muted-foreground hidden text-xs md:block">
                    Create beautiful READMEs
                  </p>
                </div>
                <h1 className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-lg font-bold text-transparent sm:hidden">
                  EasyReadme
                </h1>
              </div>
            </div>

            {/* Right Section - Actions */}
            <div className="hidden items-center gap-3 md:flex">
              <ThemeToggle />
            </div>

            {/* Mobile Menu Button */}
            <div className="flex items-center gap-2 md:hidden">
              <ThemeToggle />
            </div>
          </div>
        </div>
      </nav>

      {/* Spacer to prevent content from going under fixed navbar */}
      <div className="h-16" />
    </>
  );
};

export default Navbar;
