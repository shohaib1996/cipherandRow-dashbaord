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
import {
  Search,
  Plus,
  Eye,
  Pencil,
  Trash2,
  TrendingUp,
  Calendar,
} from "lucide-react";

const articles = [
  {
    id: 1,
    title: "How to Reset Your Password",
    badges: [
      { text: "password", bg: "#E0F7FA", color: "#0e7490" },
      { text: "security", bg: "#EDE7F6", color: "#7e22ce" },
      { text: "login", bg: "#FBE9E7", color: "#c2410c" },
    ],
    category: "Account",
    status: "published",
    uses: 245,
    lastUpdated: "1/10/2024",
  },
  {
    id: 2,
    title: "Shipping Information",
    badges: [
      { text: "shipping", bg: "#e0f2fe", color: "#0369a1" },
      { text: "delivery", bg: "#ffedd5", color: "#c2410c" },
      { text: "tracking", bg: "#dcfce7", color: "#15803d" },
    ],
    category: "Shipping",
    status: "published",
    uses: 189,
    lastUpdated: "1/12/2024",
  },
  {
    id: 3,
    title: "Return Policy",
    badges: [
      { text: "returns", bg: "#f3f4f6", color: "#374151" },
      { text: "refund", bg: "#fce7f3", color: "#be185d" },
      { text: "policy", bg: "#ccfbf1", color: "#0f766e" },
    ],
    category: "Returns",
    status: "published",
    uses: 156,
    lastUpdated: "1/8/2024",
  },
  {
    id: 4,
    title: "Order Tracking",
    badges: [
      { text: "tracking", bg: "#dcfce7", color: "#15803d" },
      { text: "orders", bg: "#f3f4f6", color: "#374151" },
      { text: "shipping", bg: "#e0f2fe", color: "#0369a1" },
    ],
    category: "Shipping",
    status: "published",
    uses: 198,
    lastUpdated: "1/11/2024",
  },
  {
    id: 5,
    title: "Contact Support",
    badges: [
      { text: "contact", bg: "#f3f4f6", color: "#374151" },
      { text: "support", bg: "#f3f4f6", color: "#374151" },
      { text: "help", bg: "#f3f4f6", color: "#374151" },
    ],
    category: "Support",
    status: "published",
    uses: 134,
    lastUpdated: "1/9/2024",
  },
];

import { useState } from "react";
import { ArticleViewDialog } from "./ArticleViewDialog";
import { toast } from "sonner";

const KBPage = () => {
  const [selectedArticle, setSelectedArticle] = useState<any>(null);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);

  const handleViewArticle = (article: any) => {
    setSelectedArticle(article);
    setIsViewDialogOpen(true);
  };

  const handleNewArticle = () => {
    toast.info("Coming Soon", {
      description: "Article creation feature will be available in v1.1",
    });
  };

  const handleEdit = () => {
    toast.info("Coming Soon", {
      description: "Article editing feature will be available in v1.1",
    });
  };

  const handleDelete = () => {
    toast.info("Coming Soon", {
      description: "Article deletion feature will be available in v1.1",
    });
  };

  return (
    <div className="px-4 sm:px-5 lg:px-8 pt-0 pb-4 sm:py-6 lg:py-8 mx-auto container space-y-4 sm:space-y-6 lg:space-y-8 font-sans">
      {/* Header */}
      <div className="space-y-1">
        <h1 className="text-xl sm:text-2xl font-semibold text-slate-900">
          Knowledge Base
        </h1>
        <p className="text-xs sm:text-sm text-slate-500">
          Manage your AI's knowledge and training data — 5 articles across 4
          categories
        </p>
      </div>

      {/* Controls */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4">
        <div className="relative flex-1 w-full">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <Input
            placeholder="Search articles..."
            className="pl-10 h-10 sm:h-11 bg-white border-slate-200"
          />
        </div>
        <Button
          onClick={handleNewArticle}
          className="bg-[#1a1a1a] hover:bg-black text-white h-10 sm:h-11 px-4 sm:px-6 rounded-sm whitespace-nowrap">
          <Plus className="mr-2 h-4 w-4" />
          New Article
        </Button>
      </div>

      {/* Desktop Table View - Hidden on Mobile */}
      <div className="hidden lg:block bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent border-slate-100">
              <TableHead className="px-6 py-4 w-[35%] text-slate-500 font-medium">
                Title
              </TableHead>
              <TableHead className="px-6 py-4 w-[15%] text-slate-500 font-medium">
                Category
              </TableHead>
              <TableHead className="px-6 py-4 w-[15%] text-slate-500 font-medium">
                Status
              </TableHead>
              <TableHead className="px-6 py-4 w-[10%] text-slate-500 font-medium">
                Uses
              </TableHead>
              <TableHead className="px-6 py-4 w-[15%] text-slate-500 font-medium">
                Last Updated
              </TableHead>
              <TableHead className="px-6 py-4 w-[10%] text-right text-slate-500 font-medium">
                Actions
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {articles.map((article) => (
              <TableRow
                key={article.id}
                className="hover:bg-slate-50/50 transition-colors border-slate-200"
              >
                <TableCell className="px-6 py-6">
                  <div className="space-y-2">
                    <div className="font-medium text-slate-900 text-base">
                      {article.title}
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {article.badges.map((badge, index) => (
                        <span
                          key={index}
                          className="px-2.5 py-0.5 rounded-[12px] text-xs font-medium"
                          style={{
                            backgroundColor: badge.bg,
                            color: badge.color,
                          }}
                        >
                          {badge.text}
                        </span>
                      ))}
                    </div>
                  </div>
                </TableCell>
                <TableCell className="px-6 py-6 text-slate-600 text-sm">
                  {article.category}
                </TableCell>
                <TableCell className="px-6 py-6">
                  <span
                    className="px-3 py-1 rounded-full text-sm font-medium inline-flex items-center"
                    style={{
                      backgroundColor: "#22c55e1a",
                      color: "#22C55E",
                    }}
                  >
                    {article.status}
                  </span>
                </TableCell>
                <TableCell className="px-6 py-6">
                  <div className="flex items-center gap-1.5 text-slate-600 font-medium">
                    <TrendingUp className="h-3.5 w-3.5 text-blue-500 text-sm" />
                    {article.uses}
                  </div>
                </TableCell>
                <TableCell className="px-6 py-6">
                  <div className="flex items-center gap-2 text-slate-700 text-sm">
                    <Calendar className="h-5 w-5" />
                    {article.lastUpdated}
                  </div>
                </TableCell>
                <TableCell className="px-6 py-6">
                  <div className="flex items-center justify-end gap-3">
                    <button
                      onClick={() => handleViewArticle(article)}
                      className="text-slate-800 hover:text-slate-600 transition-colors"
                    >
                      <Eye className="h-5 w-5" />
                    </button>
                    <button
                      onClick={handleEdit}
                      className="text-slate-800 hover:text-blue-600 transition-colors"
                    >
                      <Pencil className="h-5 w-5" />
                    </button>
                    <button
                      onClick={handleDelete}
                      className="text-red-400 hover:text-red-500 transition-colors"
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

      {/* Mobile Card View - Visible on Mobile/Tablet */}
      <div className="lg:hidden space-y-4">
        {articles.map((article) => (
          <div
            key={article.id}
            className="bg-white rounded-lg border border-slate-200 shadow-sm p-4 space-y-4"
          >
            {/* Title and Badges */}
            <div className="space-y-3">
              <h3 className="font-medium text-slate-900 text-base">
                {article.title}
              </h3>
              <div className="flex flex-wrap gap-2">
                {article.badges.map((badge, index) => (
                  <span
                    key={index}
                    className="px-2.5 py-0.5 rounded-[12px] text-xs font-medium"
                    style={{
                      backgroundColor: badge.bg,
                      color: badge.color,
                    }}
                  >
                    {badge.text}
                  </span>
                ))}
              </div>
            </div>

            {/* Info Grid */}
            <div className="grid grid-cols-2 gap-3 pt-3 border-t border-slate-100">
              <div>
                <div className="text-xs text-slate-500 mb-1">Category</div>
                <div className="text-sm text-slate-900">{article.category}</div>
              </div>
              <div>
                <div className="text-xs text-slate-500 mb-1">Status</div>
                <span
                  className="px-2 py-0.5 rounded-full text-xs font-medium inline-flex items-center"
                  style={{
                    backgroundColor: "#22c55e1a",
                    color: "#22C55E",
                  }}
                >
                  {article.status}
                </span>
              </div>
              <div>
                <div className="text-xs text-slate-500 mb-1">Uses</div>
                <div className="flex items-center gap-1.5 text-slate-600 font-medium text-sm">
                  <TrendingUp className="h-3.5 w-3.5 text-blue-500" />
                  {article.uses}
                </div>
              </div>
              <div>
                <div className="text-xs text-slate-500 mb-1">Last Updated</div>
                <div className="flex items-center gap-1.5 text-slate-700 text-sm">
                  <Calendar className="h-4 w-4" />
                  {article.lastUpdated}
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
                onClick={handleEdit}
                className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-blue-50 hover:bg-blue-100 text-blue-600 rounded-md transition-colors text-sm"
              >
                <Pencil className="h-4 w-4" />
                Edit
              </button>
              <button
                onClick={handleDelete}
                className="px-3 py-2 bg-red-50 hover:bg-red-100 text-red-500 rounded-md transition-colors"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      <ArticleViewDialog
        article={selectedArticle}
        open={isViewDialogOpen}
        onOpenChange={setIsViewDialogOpen}
      />
    </div>
  );
};

export default KBPage;
