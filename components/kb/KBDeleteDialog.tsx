"use client";

import { useState } from "react";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";
import { KBArticle } from "@/lib/kbApi";

interface KBDeleteDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  article: KBArticle | null;
  onConfirm: (id: string) => Promise<void>;
}

export function KBDeleteDialog({
  open,
  onOpenChange,
  article,
  onConfirm,
}: KBDeleteDialogProps) {
  const [isLoading, setIsLoading] = useState(false);

  const handleConfirm = async () => {
    if (!article) return;

    setIsLoading(true);
    try {
      await onConfirm(article.id);
      onOpenChange(false);
    } catch (error) {
      console.error("Error deleting article:", error);
    } finally {
      setIsLoading(false);
    }
  };

  if (!article) return null;

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This will permanently delete the article &quot;{article.title}&quot;. This
            action cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={isLoading}>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={handleConfirm}
            disabled={isLoading}
            className="bg-red-600 hover:bg-red-700"
          >
            {isLoading ? "Deleting..." : "Delete"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
