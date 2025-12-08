"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { KBArticle } from "@/lib/kbApi";

interface KBViewDialogProps {
  article: KBArticle | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function KBViewDialog({
  article,
  open,
  onOpenChange,
}: KBViewDialogProps) {
  if (!article) return null;

  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString("en-US", {
        month: "numeric",
        day: "numeric",
        year: "numeric",
      });
    } catch {
      return dateString;
    }
  };

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
            <span className="capitalize">{article.type}</span>
            <span className="hidden sm:inline">•</span>
            <span className="text-xs sm:text-sm">
              Created {formatDate(article.created_at)}
            </span>
          </div>
        </DialogHeader>

        <div className="px-4 sm:px-6 py-4 sm:py-5 border-t border-slate-200">
          <div className="space-y-3 sm:space-y-4 text-sm sm:text-base text-slate-600 leading-relaxed whitespace-pre-wrap">
            {article.text}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
