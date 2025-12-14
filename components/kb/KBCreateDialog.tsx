"use client";

import { useState, useRef, useCallback } from "react";
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
import { Upload, FileText, X, CheckCircle2, AlertCircle } from "lucide-react";
import { kbApi } from "@/lib/kbApi";
import { toast } from "sonner";

interface KBCreateDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: { title: string; text: string }) => Promise<void>;
  onSuccess?: () => void;
}

type TabType = "manual" | "csv";

export function KBCreateDialog({
  open,
  onOpenChange,
  onSubmit,
  onSuccess,
}: KBCreateDialogProps) {
  const [activeTab, setActiveTab] = useState<TabType>("manual");
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // CSV Upload states
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [uploadStatus, setUploadStatus] = useState<"idle" | "uploading" | "success" | "error">("idle");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleManualSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !text.trim()) return;

    setIsLoading(true);
    try {
      await onSubmit({ title, text });
      setTitle("");
      setText("");
      onOpenChange(false);
      onSuccess?.();
    } catch (error) {
      console.error("Error creating article:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleFileSelect = (file: File) => {
    if (file.type !== "text/csv" && !file.name.endsWith(".csv")) {
      toast.error("Invalid file type", {
        description: "Please upload a CSV file",
      });
      return;
    }
    setSelectedFile(file);
    setUploadStatus("idle");
  };

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);

    const files = e.dataTransfer.files;
    if (files.length > 0) {
      handleFileSelect(files[0]);
    }
  }, []);

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      handleFileSelect(files[0]);
    }
  };

  const handleCSVUpload = async () => {
    if (!selectedFile) return;

    setIsLoading(true);
    setUploadStatus("uploading");

    try {
      await kbApi.importCSV(selectedFile);
      setUploadStatus("success");
      toast.success("CSV imported successfully", {
        description: "Your knowledge base articles have been added",
      });

      // Reset and close after a short delay
      setTimeout(() => {
        setSelectedFile(null);
        setUploadStatus("idle");
        onOpenChange(false);
        onSuccess?.();
      }, 1500);
    } catch (error) {
      setUploadStatus("error");
      toast.error("Failed to import CSV", {
        description: error instanceof Error ? error.message : "Unknown error",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const removeFile = () => {
    setSelectedFile(null);
    setUploadStatus("idle");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const resetForm = () => {
    setTitle("");
    setText("");
    setSelectedFile(null);
    setUploadStatus("idle");
    setActiveTab("manual");
  };

  const handleDialogClose = (open: boolean) => {
    if (!open) {
      resetForm();
    }
    onOpenChange(open);
  };

  return (
    <Dialog open={open} onOpenChange={handleDialogClose}>
      <DialogContent className="max-w-[95vw] sm:max-w-2xl p-0 gap-0 overflow-hidden">
        <DialogHeader className="px-6 pt-6 pb-4">
          <DialogTitle className="text-xl font-semibold">
            Create New Article
          </DialogTitle>
        </DialogHeader>

        {/* Tabs */}
        <div className="border-b border-slate-200 px-6">
          <div className="flex gap-1">
            <button
              type="button"
              onClick={() => setActiveTab("manual")}
              className={`relative px-4 py-2.5 text-sm font-medium transition-all duration-200 ${
                activeTab === "manual"
                  ? "text-slate-900"
                  : "text-slate-500 hover:text-slate-700"
              }`}
            >
              Manual Entry
              {activeTab === "manual" && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-slate-900 animate-in slide-in-from-left duration-200" />
              )}
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("csv")}
              className={`relative px-4 py-2.5 text-sm font-medium transition-all duration-200 ${
                activeTab === "csv"
                  ? "text-slate-900"
                  : "text-slate-500 hover:text-slate-700"
              }`}
            >
              CSV Upload
              {activeTab === "csv" && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-slate-900 animate-in slide-in-from-right duration-200" />
              )}
            </button>
          </div>
        </div>

        {/* Tab Content */}
        <div className="px-6 py-4">
          {activeTab === "manual" ? (
            <form onSubmit={handleManualSubmit} className="space-y-4 animate-in fade-in duration-300">
              <div className="space-y-2">
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  placeholder="Enter article title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                  disabled={isLoading}
                  className="transition-all duration-200 focus:ring-2 focus:ring-slate-900"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="text">Content</Label>
                <Textarea
                  id="text"
                  placeholder="Enter article content"
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  required
                  disabled={isLoading}
                  rows={10}
                  className="resize-none transition-all duration-200 focus:ring-2 focus:ring-slate-900"
                />
              </div>

              <DialogFooter className="pt-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => handleDialogClose(false)}
                  disabled={isLoading}
                  className="transition-all duration-200"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  disabled={isLoading || !title.trim() || !text.trim()}
                  className="bg-[#1a1a1a] hover:bg-black transition-all duration-200"
                >
                  {isLoading ? "Creating..." : "Create Article"}
                </Button>
              </DialogFooter>
            </form>
          ) : (
            <div className="space-y-4 animate-in fade-in duration-300">
              {/* Instructions */}
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <p className="text-sm text-blue-900 font-medium mb-2">CSV Format Requirements:</p>
                <ul className="text-sm text-blue-800 space-y-1">
                  <li>• <strong>text</strong> (required): Article content</li>
                  <li>• <strong>title</strong> (optional): Article title</li>
                  <li>• <strong>type</strong> (optional): Article type</li>
                </ul>
              </div>

              {/* Drag & Drop Area */}
              <div
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                className={`relative border-2 border-dashed rounded-lg p-8 transition-all duration-300 ${
                  isDragging
                    ? "border-slate-900 bg-slate-50 scale-[1.02]"
                    : uploadStatus === "success"
                    ? "border-green-400 bg-green-50"
                    : uploadStatus === "error"
                    ? "border-red-400 bg-red-50"
                    : "border-slate-300 hover:border-slate-400 hover:bg-slate-50"
                }`}
              >
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".csv,text/csv"
                  onChange={handleFileInputChange}
                  className="hidden"
                />

                {!selectedFile ? (
                  <div className="text-center space-y-4">
                    <div className="flex justify-center">
                      <div className={`p-4 rounded-full transition-all duration-300 ${
                        isDragging ? "bg-slate-900 scale-110" : "bg-slate-100"
                      }`}>
                        <Upload className={`h-8 w-8 transition-colors duration-300 ${
                          isDragging ? "text-white" : "text-slate-600"
                        }`} />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <p className="text-sm font-medium text-slate-900">
                        {isDragging ? "Drop your CSV file here" : "Drag & drop your CSV file here"}
                      </p>
                      <p className="text-xs text-slate-500">or</p>
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => fileInputRef.current?.click()}
                        className="transition-all duration-200 hover:border-slate-900"
                      >
                        Browse Files
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className={`flex items-center gap-3 p-4 rounded-lg border transition-all duration-300 ${
                      uploadStatus === "success"
                        ? "bg-green-50 border-green-200"
                        : uploadStatus === "error"
                        ? "bg-red-50 border-red-200"
                        : "bg-white border-slate-200"
                    }`}>
                      <div className={`p-2 rounded transition-all duration-300 ${
                        uploadStatus === "success"
                          ? "bg-green-100"
                          : uploadStatus === "error"
                          ? "bg-red-100"
                          : "bg-slate-100"
                      }`}>
                        {uploadStatus === "success" ? (
                          <CheckCircle2 className="h-5 w-5 text-green-600 animate-in zoom-in duration-300" />
                        ) : uploadStatus === "error" ? (
                          <AlertCircle className="h-5 w-5 text-red-600 animate-in zoom-in duration-300" />
                        ) : (
                          <FileText className="h-5 w-5 text-slate-600" />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-slate-900 truncate">
                          {selectedFile.name}
                        </p>
                        <p className="text-xs text-slate-500">
                          {(selectedFile.size / 1024).toFixed(2)} KB
                        </p>
                      </div>
                      {uploadStatus !== "uploading" && uploadStatus !== "success" && (
                        <button
                          type="button"
                          onClick={removeFile}
                          className="p-1 hover:bg-slate-200 rounded transition-colors duration-200"
                        >
                          <X className="h-4 w-4 text-slate-500" />
                        </button>
                      )}
                    </div>

                    {uploadStatus === "uploading" && (
                      <div className="space-y-2 animate-in fade-in duration-300">
                        <div className="h-2 bg-slate-200 rounded-full overflow-hidden">
                          <div className="h-full bg-slate-900 rounded-full animate-[progress_1.5s_ease-in-out_infinite]"
                               style={{ width: "100%", transformOrigin: "left" }} />
                        </div>
                        <p className="text-xs text-center text-slate-600">Uploading...</p>
                      </div>
                    )}

                    {uploadStatus === "success" && (
                      <p className="text-sm text-center text-green-600 font-medium animate-in fade-in duration-300">
                        Upload successful! Closing...
                      </p>
                    )}

                    {uploadStatus === "error" && (
                      <p className="text-sm text-center text-red-600 font-medium animate-in fade-in duration-300">
                        Upload failed. Please try again.
                      </p>
                    )}
                  </div>
                )}
              </div>

              <DialogFooter className="pt-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => handleDialogClose(false)}
                  disabled={isLoading}
                  className="transition-all duration-200"
                >
                  Cancel
                </Button>
                <Button
                  type="button"
                  onClick={handleCSVUpload}
                  disabled={!selectedFile || isLoading || uploadStatus === "success"}
                  className="bg-[#1a1a1a] hover:bg-black transition-all duration-200"
                >
                  {uploadStatus === "uploading" ? "Uploading..." : "Upload CSV"}
                </Button>
              </DialogFooter>
            </div>
          )}
        </div>

        <style jsx global>{`
          @keyframes progress {
            0% {
              transform: scaleX(0);
            }
            50% {
              transform: scaleX(0.7);
            }
            100% {
              transform: scaleX(1);
            }
          }
        `}</style>
      </DialogContent>
    </Dialog>
  );
}
