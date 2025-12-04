import React from "react";
import Link from "next/link";

export function DashboardFooter() {
  return (
    <footer className="w-full py-8 px-8 border-t border-[#000000]/6 dark:border-[#FFFFFF]/6 mt-auto bg-transparent">
      <div className="flex flex-col md:flex-row items-center justify-between gap-6 md:gap-4 text-[11px] tracking-wide text-[#989898] font-medium">
        <div className="flex flex-col md:flex-row items-center gap-4 md:gap-8">
          <span className="text-[#C3C3C3]">
            &copy; 2025 Cipher & Row LLC. All rights reserved.
          </span>
          <div className="flex items-center gap-6">
            <Link
              href="/privacy"
              className="hover:text-[#666666] transition-colors duration-200"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms"
              className="hover:text-[#666666] transition-colors duration-200"
            >
              Terms of Service
            </Link>
            <Link
              href="/refund"
              className="hover:text-[#666666] transition-colors duration-200"
            >
              Refund Policy
            </Link>
            <Link
              href="#"
              className="hover:text-[#666666] transition-colors duration-200"
            >
              Security Practices
            </Link>
            <Link
              href="#"
              className="hover:text-[#666666] transition-colors duration-200"
            >
              Status
            </Link>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <a
            href="mailto:support@cipherandrow.com"
            className="hover:text-[#666666] transition-colors duration-200"
          >
            support@cipherandrow.com
          </a>
        </div>
      </div>
    </footer>
  );
}
