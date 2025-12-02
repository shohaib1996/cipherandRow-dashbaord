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
      <DialogContent className="min-w-4xl p-0 gap-0 overflow-hidden rounded-sm">
        <DialogHeader className="p-6 pb-4 space-y-2">
          <div className="flex items-start justify-between">
            <DialogTitle className="text-2xl font-semibold text-slate-900">
              {article.title}
            </DialogTitle>
          </div>
          <div className="flex items-center gap-2 text-md text-slate-500">
            <span>{article.category}</span>
            <span>•</span>
            <span className="text-blue-500">{article.uses} uses</span>
            <span>•</span>
            <span>Updated {article.lastUpdated}</span>
          </div>
        </DialogHeader>

        <div className="px-6 py-5 border-t border-slate-200 border-b">
          <div className="space-y-4 text-base text-slate-600 leading-relaxed">
            <p>To reset your password:</p>
            <ol className="list-decimal pl-4 space-y-1">
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

        <div className="p-6 pt-6 flex gap-2">
          {article.badges.map((badge, index) => (
            <span
              key={index}
              className="px-3 py-1 rounded-[12px] text-sm font-medium"
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
