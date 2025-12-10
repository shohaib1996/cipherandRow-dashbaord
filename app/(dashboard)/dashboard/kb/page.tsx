"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Search, Plus, Eye, Pencil, Trash2, Calendar } from "lucide-react";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { kbApi, KBArticle } from "@/lib/kbApi";
import { KBViewDialog } from "@/components/kb/KBViewDialog";
import { KBCreateDialog } from "@/components/kb/KBCreateDialog";
import { KBEditDialog } from "@/components/kb/KBEditDialog";
import { KBDeleteDialog } from "@/components/kb/KBDeleteDialog";

const KBPage = () => {
  const [articles, setArticles] = useState<KBArticle[]>([]);
  const [filteredArticles, setFilteredArticles] = useState<KBArticle[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedArticle, setSelectedArticle] = useState<KBArticle | null>(
    null
  );
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchArticles();
  }, []);

  useEffect(() => {
    if (searchQuery.trim() === "") {
      setFilteredArticles(articles);
    } else {
      const query = searchQuery.toLowerCase();
      setFilteredArticles(
        articles.filter(
          (article) =>
            article.title.toLowerCase().includes(query) ||
            article.text.toLowerCase().includes(query)
        )
      );
    }
  }, [searchQuery, articles]);

  const fetchArticles = async () => {
    try {
      setIsLoading(true);
      const data = await kbApi.getAllArticles();
      setArticles(data);
      setFilteredArticles(data);
    } catch (error) {
      toast.error("Failed to load articles", {
        description: error instanceof Error ? error.message : "Unknown error",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleViewArticle = (article: KBArticle) => {
    setSelectedArticle(article);
    setIsViewDialogOpen(true);
  };

  const handleEditArticle = (article: KBArticle) => {
    setSelectedArticle(article);
    setIsEditDialogOpen(true);
  };

  const handleDeleteArticle = (article: KBArticle) => {
    setSelectedArticle(article);
    setIsDeleteDialogOpen(true);
  };

  const handleCreateSubmit = async (data: { title: string; text: string }) => {
    try {
      await kbApi.createArticle({ ...data, type: "manual" });
      toast.success("Article created successfully");
      fetchArticles();
    } catch (error) {
      toast.error("Failed to create article", {
        description: error instanceof Error ? error.message : "Unknown error",
      });
      throw error;
    }
  };

  const handleEditSubmit = async (data: {
    id: string;
    title: string;
    text: string;
  }) => {
    try {
      await kbApi.updateArticle({ ...data, type: "manual" });
      toast.success("Article updated successfully");
      fetchArticles();
    } catch (error) {
      toast.error("Failed to update article", {
        description: error instanceof Error ? error.message : "Unknown error",
      });
      throw error;
    }
  };

  const handleDeleteConfirm = async (id: string) => {
    try {
      await kbApi.deleteArticle(id);
      toast.success("Article deleted successfully");
      fetchArticles();
    } catch (error) {
      toast.error("Failed to delete article", {
        description: error instanceof Error ? error.message : "Unknown error",
      });
      throw error;
    }
  };

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
    <div className="px-4 sm:px-5 lg:px-8 pt-0 pb-4 sm:py-6 lg:py-8 mx-auto container space-y-4 sm:space-y-6 lg:space-y-8 font-sans">
      {/* Header */}
      <div className="space-y-1">
        <h1 className="text-xl sm:text-2xl font-semibold text-slate-900">
          Knowledge Base
        </h1>
        <p className="text-xs sm:text-sm text-slate-500">
          Manage your AI&apos;s knowledge and training data —{" "}
          {filteredArticles.length}{" "}
          {filteredArticles.length === 1 ? "article" : "articles"}
        </p>
      </div>

      {/* Controls */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4">
        <div className="relative flex-1 w-full">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <Input
            placeholder="Search articles..."
            className="pl-10 h-10 sm:h-11 bg-white border-slate-200"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Button
          onClick={() => setIsCreateDialogOpen(true)}
          className="bg-[#1a1a1a] hover:bg-black text-white h-10 sm:h-11 px-4 sm:px-6 rounded-sm whitespace-nowrap"
        >
          <Plus className="mr-2 h-4 w-4" />
          New Article
        </Button>
      </div>

      {/* Loading State */}
      {isLoading && (
        <div className="text-center py-12 text-slate-500">
          Loading articles...
        </div>
      )}

      {/* Empty State */}
      {!isLoading && filteredArticles.length === 0 && (
        <div className="text-center py-12 text-slate-500">
          {searchQuery
            ? "No articles found matching your search"
            : "No articles yet. Create your first article!"}
        </div>
      )}

      {/* Desktop Table View - Hidden on Mobile */}
      {!isLoading && filteredArticles.length > 0 && (
        <div className="hidden lg:block bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
          <Table className="table-fixed">
            <TableHeader>
              <TableRow className="hover:bg-transparent border-slate-100">
                <TableHead className="px-6 py-4 w-[50%] text-slate-500 font-medium">
                  Title
                </TableHead>
                <TableHead className="px-6 py-4 w-[15%] text-slate-500 font-medium">
                  Type
                </TableHead>
                <TableHead className="px-6 py-4 w-[20%] text-slate-500 font-medium">
                  Created At
                </TableHead>
                <TableHead className="px-6 py-4 w-[15%] text-right text-slate-500 font-medium">
                  Actions
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredArticles.map((article) => (
                <TableRow
                  key={article.id}
                  className="hover:bg-slate-50/50 transition-colors border-slate-200"
                >
                  <TableCell className="px-6 py-6 overflow-hidden">
                    <div className="space-y-1 max-w-full">
                      <div
                        className="font-medium text-slate-900 text-base truncate"
                        title={article.title}
                      >
                        {article.title}
                      </div>
                      <div className="text-sm text-slate-500 line-clamp-1">
                        {article.text.slice(0, 75) + "..."}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="px-6 py-6">
                    <span className="px-2.5 py-1 rounded-full text-xs font-medium capitalize bg-slate-100 text-slate-700">
                      {article.type}
                    </span>
                  </TableCell>
                  <TableCell className="px-6 py-6">
                    <div className="flex items-center gap-2 text-slate-700 text-sm">
                      <Calendar className="h-4 w-4" />
                      {formatDate(article.created_at)}
                    </div>
                  </TableCell>
                  <TableCell className="px-6 py-6">
                    <div className="flex items-center justify-end gap-3">
                      <button
                        onClick={() => handleViewArticle(article)}
                        className="text-slate-800 hover:text-slate-600 transition-colors"
                        title="View article"
                      >
                        <Eye className="h-5 w-5" />
                      </button>
                      <button
                        onClick={() => handleEditArticle(article)}
                        className="text-slate-800 hover:text-blue-600 transition-colors"
                        title="Edit article"
                      >
                        <Pencil className="h-5 w-5" />
                      </button>
                      <button
                        onClick={() => handleDeleteArticle(article)}
                        className="text-red-400 hover:text-red-500 transition-colors"
                        title="Delete article"
                      >
                        <Trash2 className="h-5 w-5" />
                      </button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}

      {/* Mobile Card View - Visible on Mobile/Tablet */}
      {!isLoading && filteredArticles.length > 0 && (
        <div className="lg:hidden space-y-4">
          {filteredArticles.map((article) => (
            <div
              key={article.id}
              className="bg-white rounded-lg border border-slate-200 shadow-sm p-4 space-y-4"
            >
              {/* Title */}
              <div className="space-y-2">
                <h3 className="font-medium text-slate-900 text-base">
                  {article.title}
                </h3>
                <p className="text-sm text-slate-500 line-clamp-2">
                  {article.text}
                </p>
              </div>

              {/* Info Grid */}
              <div className="grid grid-cols-2 gap-3 pt-3 border-t border-slate-100">
                <div>
                  <div className="text-xs text-slate-500 mb-1">Type</div>
                  <span className="px-2 py-0.5 rounded-full text-xs font-medium capitalize bg-slate-100 text-slate-700">
                    {article.type}
                  </span>
                </div>
                <div>
                  <div className="text-xs text-slate-500 mb-1">Created At</div>
                  <div className="flex items-center gap-1.5 text-slate-700 text-sm">
                    <Calendar className="h-4 w-4" />
                    {formatDate(article.created_at)}
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-2 pt-3 border-t border-slate-100">
                <button
                  onClick={() => handleViewArticle(article)}
                  className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-md transition-colors text-sm"
                >
                  <Eye className="h-4 w-4" />
                  View
                </button>
                <button
                  onClick={() => handleEditArticle(article)}
                  className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-blue-50 hover:bg-blue-100 text-blue-600 rounded-md transition-colors text-sm"
                >
                  <Pencil className="h-4 w-4" />
                  Edit
                </button>
                <button
                  onClick={() => handleDeleteArticle(article)}
                  className="px-3 py-2 bg-red-50 hover:bg-red-100 text-red-500 rounded-md transition-colors"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Dialogs */}
      <KBViewDialog
        article={selectedArticle}
        open={isViewDialogOpen}
        onOpenChange={setIsViewDialogOpen}
      />
      <KBCreateDialog
        open={isCreateDialogOpen}
        onOpenChange={setIsCreateDialogOpen}
        onSubmit={handleCreateSubmit}
      />
      <KBEditDialog
        open={isEditDialogOpen}
        onOpenChange={setIsEditDialogOpen}
        article={selectedArticle}
        onSubmit={handleEditSubmit}
      />
      <KBDeleteDialog
        open={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
        article={selectedArticle}
        onConfirm={handleDeleteConfirm}
      />
    </div>
  );
};

export default KBPage;
