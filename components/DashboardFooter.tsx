import React from "react";
import Link from "next/link";

export function DashboardFooter() {
  return (
    <footer className="w-full py-6 px-8 border-t border-slate-200/60 mt-auto bg-transparent">
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-500">
        <div className="flex flex-col md:flex-row items-center gap-4">
          <span>&copy; 2025 Cipher & Row LLC. All rights reserved.</span>
          <span className="hidden md:inline text-slate-300">|</span>
          <div className="flex items-center gap-4">
            <Link href="#" className="hover:text-slate-800 transition-colors">
              Privacy Policy
            </Link>
            <Link href="#" className="hover:text-slate-800 transition-colors">
              Terms of Service
            </Link>
            <Link href="#" className="hover:text-slate-800 transition-colors">
              Security Practices
            </Link>
            <Link href="#" className="hover:text-slate-800 transition-colors">
              Status
            </Link>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <a
            href="mailto:support@cipherandrow.com"
            className="hover:text-slate-800 transition-colors"
          >
            support@cipherandrow.com
          </a>
        </div>
      </div>
    </footer>
  );
}
