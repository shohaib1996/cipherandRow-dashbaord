"use client";

import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { KBArticle } from "@/lib/kbApi";

interface KBEditDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  article: KBArticle | null;
  onSubmit: (data: { id: string; title: string; text: string }) => Promise<void>;
}

export function KBEditDialog({
  open,
  onOpenChange,
  article,
  onSubmit,
}: KBEditDialogProps) {
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (article) {
      setTitle(article.title);
      setText(article.text);
    }
  }, [article]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!article || !title.trim() || !text.trim()) return;

    setIsLoading(true);
    try {
      await onSubmit({ id: article.id, title, text });
      onOpenChange(false);
    } catch (error) {
      console.error("Error updating article:", error);
    } finally {
      setIsLoading(false);
    }
  };

  if (!article) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[95vw] sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">
            Edit Article
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="edit-title">Title</Label>
            <Input
              id="edit-title"
              placeholder="Enter article title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              disabled={isLoading}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="edit-text">Content</Label>
            <Textarea
              id="edit-text"
              placeholder="Enter article content"
              value={text}
              onChange={(e) => setText(e.target.value)}
              required
              disabled={isLoading}
              rows={10}
              className="resize-none"
            />
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={isLoading}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isLoading || !title.trim() || !text.trim()}
              className="bg-[#1a1a1a] hover:bg-black"
            >
              {isLoading ? "Updating..." : "Update Article"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
