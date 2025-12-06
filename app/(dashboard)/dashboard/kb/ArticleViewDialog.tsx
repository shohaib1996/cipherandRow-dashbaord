"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface Badge {
  text: string;
  bg: string;
  color: string;
}

interface Article {
  id: number;
  title: string;
  badges: Badge[];
  category: string;
  status: string;
  uses: number;
  lastUpdated: string;
}

interface ArticleViewDialogProps {
  article: Article | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ArticleViewDialog({
  article,
  open,
  onOpenChange,
}: ArticleViewDialogProps) {
  if (!article) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[95vw] sm:max-w-3xl lg:max-w-4xl p-0 gap-0 overflow-hidden rounded-sm max-h-[90vh] overflow-y-auto">
        <DialogHeader className="p-4 sm:p-6 pb-3 sm:pb-4 space-y-2">
          <div className="flex items-start justify-between">
            <DialogTitle className="text-lg sm:text-xl lg:text-2xl font-semibold text-slate-900 pr-8">
              {article.title}
            </DialogTitle>
          </div>
          <div className="flex flex-wrap items-center gap-2 text-xs sm:text-sm text-slate-500">
            <span>{article.category}</span>
            <span className="hidden sm:inline">•</span>
            <span className="text-blue-500">{article.uses} uses</span>
            <span className="hidden sm:inline">•</span>
            <span className="text-xs sm:text-sm">Updated {article.lastUpdated}</span>
          </div>
        </DialogHeader>

        <div className="px-4 sm:px-6 py-4 sm:py-5 border-t border-slate-200 border-b">
          <div className="space-y-3 sm:space-y-4 text-sm sm:text-base text-slate-600 leading-relaxed">
            <p>To reset your password:</p>
            <ol className="list-decimal pl-4 sm:pl-5 space-y-1 sm:space-y-1.5">
              <li>Go to the login page</li>
              <li>Click "Forgot Password"</li>
              <li>Enter your email address</li>
              <li>Check your email for the reset link</li>
              <li>Follow the link and create a new password</li>
            </ol>
            <p className="pt-2">
              If you don't receive the email within 5 minutes, check your spam
              folder.
            </p>
          </div>
        </div>

        <div className="p-4 sm:p-6 pt-4 sm:pt-6 flex flex-wrap gap-2">
          {article.badges.map((badge, index) => (
            <span
              key={index}
              className="px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-[12px] text-xs sm:text-sm font-medium"
              style={{
                backgroundColor: badge.bg,
                color: badge.color,
              }}
            >
              {badge.text}
            </span>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
}
