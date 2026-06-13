'use client';

import {
  Library,
  Sparkles,
  Link2,
  BookOpen,
  Calendar,
  ChevronRight,
  ExternalLink,
  Search,
  Trash2,
  Compass,
  CheckCircle2,
  Loader2,
  PenTool,
  Scroll,
  Layers,
  Heart,
  Edit3
} from 'lucide-react';
import React, { useState, useEffect, useRef } from 'react';
import ReactMarkdown from 'react-markdown';
import { toast } from 'sonner';

import { useSound } from '@/contexts';
import { useLanguage } from '@/contexts/LanguageContext';
import { ForgeEditor } from '@/shared/components/editor/ForgeEditor';
import { Button, GlassCard, Input, Modal, Label } from '@/shared/components/ui';
import { cn } from '@/shared/lib/utils';
import { useAuthStore } from '@/shared/store/authStore';
import type { KnowledgeConcept } from '@/shared/types';

import { useConcepts, useSaveConcept, useDeleteConcept, useUpdateConcept } from '../hooks/useKnowledge';
import { scrapeUrl } from '../services/knowledgeService';


export function LibraryDashboard() {
  const { language } = useLanguage();
  const { playSound } = useSound();
  const { user } = useAuthStore();

  // Data hooks
  const { data: concepts = [], isLoading: isLoadingConcepts, refetch } = useConcepts();
  const saveConceptMutation = useSaveConcept();
  const deleteConceptMutation = useDeleteConcept();
  const updateConceptMutation = useUpdateConcept();

  // Filter lists to only show WEB_ARTICLE, CODEX_BOOK, or PERSONAL_NOTE for this long-form library
  const libraryConcepts = concepts.filter(c =>
    c.url || // has url
    concepts.some(original => original.id === c.id) // fallback
  );

  // States
  const [selectedConcept, setSelectedConcept] = useState<KnowledgeConcept | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  // Modals
  const [isScrapeModalOpen, setIsScrapeModalOpen] = useState(false);
  const [isAiModalOpen, setIsAiModalOpen] = useState(false);

  // Scraping state
  const [scrapeUrlInput, setScrapeUrlInput] = useState('');
  const [isScraping, setIsScraping] = useState(false);

  // Custom writing state
  const [isWriteModalOpen, setIsWriteModalOpen] = useState(false);
  const [writeTitle, setWriteTitle] = useState('');
  const [writeContent, setWriteContent] = useState('');
  const [isSavingCustom, setIsSavingCustom] = useState(false);

  // Edit states
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editTitle, setEditTitle] = useState('');
  const [editContent, setEditContent] = useState('');
  const [isSavingEdit, setIsSavingEdit] = useState(false);

  // AI generation states
  const [aiTopic, setAiTopic] = useState('');
  const [aiStyle, setAiStyle] = useState('stoicism'); // stoicism, alchemy, science, wisdom
  const [isGenerating, setIsGenerating] = useState(false);
  const [streamedContent, setStreamedContent] = useState('');
  const abortControllerRef = useRef<AbortController | null>(null);
  const streamEndRef = useRef<HTMLDivElement | null>(null);

  const hasInitializedRef = useRef(false);

  // Set initial selected concept when data loads or when selectedConcept is no longer in the list
  useEffect(() => {
    if (libraryConcepts.length > 0) {
      if (!selectedConcept || !libraryConcepts.some(c => c.id === selectedConcept.id)) {
        setSelectedConcept(libraryConcepts[0]);
      }
    } else {
      setSelectedConcept(null);
    }
  }, [libraryConcepts]);

  // Auto-scroll to bottom of AI stream
  useEffect(() => {
    if (streamEndRef.current) {
      streamEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [streamedContent]);

  const handleSelectConcept = (concept: KnowledgeConcept) => {
    playSound('click');
    setSelectedConcept(concept);
  };

  const handleDeleteConcept = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    playSound('error');
    
    toast.custom((t) => (
      <div className="flex flex-col gap-2 rounded-2xl border border-red-500/20 bg-black/90 p-4 text-xs text-white shadow-xl backdrop-blur-md">
        <p className="font-bold font-mono tracking-wider uppercase text-red-400">
          {language === 'vi' ? 'XÓA BÀI VIẾT NÀY?' : 'DELETE CHRONICLE?'}
        </p>
        <p className="text-gray-400 font-light">
          {language === 'vi' ? 'Hành động này sẽ xóa vĩnh viễn bài luận này khỏi thư viện.' : 'This action will permanently delete this essay.'}
        </p>
        <div className="mt-2 flex gap-2 justify-end">
          <Button
            variant="outline"
            size="sm"
            className="rounded-xl font-mono text-[10px] uppercase"
            onClick={() => toast.dismiss(t)}
          >
            {language === 'vi' ? 'Hủy' : 'Cancel'}
          </Button>
          <Button
            variant="danger"
            size="sm"
            className="rounded-xl font-mono text-[10px] uppercase"
            onClick={async () => {
              toast.dismiss(t);
              try {
                await deleteConceptMutation.mutateAsync(id);
                if (selectedConcept?.id === id) {
                  setSelectedConcept(null);
                }
                refetch();
              } catch (err) {
                console.error(err);
              }
            }}
          >
            {language === 'vi' ? 'Xác nhận' : 'Confirm'}
          </Button>
        </div>
      </div>
    ));
  };

  // URL Scraper submission
  const handleScrape = async () => {
    if (!scrapeUrlInput.trim()) {
      toast.error(language === 'vi' ? 'Vui lòng nhập URL hợp lệ' : 'Please enter a valid URL');
      return;
    }

    setIsScraping(true);
    playSound('click');
    try {
      const result = await scrapeUrl(scrapeUrlInput);

      const saved = await saveConceptMutation.mutateAsync({
        title: result.title || 'Scraped Article',
        sourceType: 'WEB_ARTICLE',
        sourceUrl: scrapeUrlInput,
        content: result.content,
        summary: result.summary,
      });

      toast.success(language === 'vi' ? 'Đã sưu tầm bài viết thành công!' : 'Article collected successfully!');
      setIsScrapeModalOpen(false);
      setScrapeUrlInput('');
      setSelectedConcept(saved);
      refetch();
    } catch (err) {
      console.error(err);
      toast.error(language === 'vi' ? 'Thu thập bài viết thất bại' : 'Failed to scrape article');
    } finally {
      setIsScraping(false);
    }
  };

  // AI Streaming Synthesis
  const handleAiGenerate = async () => {
    if (!aiTopic.trim()) {
      toast.error(language === 'vi' ? 'Vui lòng nhập chủ đề viết bài' : 'Please enter a topic for the essay');
      return;
    }

    setIsGenerating(true);
    setStreamedContent('');
    playSound('click');

    const styleNames: Record<string, string> = {
      stoicism: language === 'vi' ? 'Khắc kỷ (Stoicism)' : 'Stoicism',
      alchemy: language === 'vi' ? 'Giả kim thuật (Alchemy)' : 'Alchemy',
      science: language === 'vi' ? 'Khoa học thực chứng (Science)' : 'Science',
      wisdom: language === 'vi' ? 'Triết học cổ đại (Ancient Wisdom)' : 'Ancient Wisdom',
    };

    const promptText = `Hãy viết một bài luận học thuật chuyên sâu sắc sảo bằng tiếng Việt.
Chủ đề: "${aiTopic}"
Trường phái/Góc nhìn: ${styleNames[aiStyle]}

Yêu cầu định dạng:
1. Viết dưới định dạng Markdown phong phú.
2. Trình bày lập luận mạch lạc, có chiều sâu, mang tính học thuật cao.
3. Sử dụng các khối trích dẫn (> quote) để làm nổi bật các triết lý cốt lõi.
4. Chia thành các chương mục rõ ràng (sử dụng tiêu đề #, ##, ###).
5. Cuối bài viết hãy đưa ra một phần tóm tắt ngắn gọn và 3 điểm suy ngẫm (Key Takeaways).

Hãy bắt đầu viết trực tiếp nội dung bài luận một cách sang trọng.`;

    const systemPrompt = `Bạn là Antigravity Chronicles, một học giả thông thái chuyên tổng hợp tri thức và viết tiểu luận chuyên sâu. Bạn sử dụng giọng văn trang nhã, sắc sảo, giàu tính triết lý và văn học sâu sắc.`;

    try {
      abortControllerRef.current = new AbortController();
      const response = await fetch('/api/forge/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messages: [
            {
              role: 'user',
              parts: [{ text: promptText }],
            },
          ],
          agent: {
            systemPrompt,
          },
        }),
        signal: abortControllerRef.current.signal,
      });

      if (!response.ok) {
        throw new Error('Streaming request failed');
      }

      const reader = response.body?.getReader();
      const decoder = new TextDecoder();
      let fullText = '';

      if (reader) {
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          const chunk = decoder.decode(value, { stream: true });
          fullText += chunk;
          setStreamedContent(fullText);
        }
      }

      // Automatically save to database on completion
      const summaryText = fullText.slice(0, 180) + '...';
      const saved = await saveConceptMutation.mutateAsync({
        title: aiTopic,
        sourceType: 'PERSONAL_NOTE',
        content: fullText,
        summary: summaryText,
        sourceUrl: 'ai',
      });

      toast.success(language === 'vi' ? 'Đã lưu bài viết AI vào thư viện!' : 'AI Essay saved to library!');
      setSelectedConcept(saved);
      setIsAiModalOpen(false);
      setAiTopic('');
      refetch();
    } catch (err: any) {
      if (err.name !== 'AbortError') {
        console.error(err);
        toast.error(language === 'vi' ? 'Lỗi kết nối khi sinh bài luận' : 'Failed to generate essay');
      }
    } finally {
      setIsGenerating(false);
    }
  };

  const handleCancelGeneration = () => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
    setIsGenerating(false);
    toast.info(language === 'vi' ? 'Đã hủy quá trình viết bài' : 'Generation cancelled');
  };

  const handleSaveCustomArticle = async () => {
    if (!writeTitle.trim() || !writeContent.trim()) {
      toast.error(language === 'vi' ? 'Vui lòng nhập tiêu đề và nội dung bài viết' : 'Please enter title and content');
      return;
    }
    setIsSavingCustom(true);
    playSound('click');
    try {
      const summaryText = writeContent.slice(0, 180) + '...';
      const saved = await saveConceptMutation.mutateAsync({
        title: writeTitle,
        sourceType: 'PERSONAL_NOTE',
        content: writeContent,
        summary: summaryText,
      });

      toast.success(language === 'vi' ? 'Đã lưu bài viết mới!' : 'New article saved!');
      setIsWriteModalOpen(false);
      setWriteTitle('');
      setWriteContent('');
      setSelectedConcept(saved);
      refetch();
    } catch (err) {
      console.error(err);
      toast.error(language === 'vi' ? 'Lưu bài viết thất bại' : 'Failed to save article');
    } finally {
      setIsSavingCustom(false);
    }
  };

  const handleStartEdit = () => {
    if (!selectedConcept) return;
    playSound('click');
    setEditTitle(selectedConcept.title);
    setEditContent(selectedConcept.content || '');
    setIsEditModalOpen(true);
  };

  const handleSaveEdit = async () => {
    if (!selectedConcept) return;
    if (!editTitle.trim() || !editContent.trim()) {
      toast.error(language === 'vi' ? 'Vui lòng nhập tiêu đề và nội dung bài viết' : 'Please enter title and content');
      return;
    }
    setIsSavingEdit(true);
    playSound('click');
    try {
      const summaryText = editContent.slice(0, 180) + '...';
      const updated = await updateConceptMutation.mutateAsync({
        id: selectedConcept.id,
        title: editTitle,
        content: editContent,
        summary: summaryText,
      });

      toast.success(language === 'vi' ? 'Đã lưu thay đổi bài viết!' : 'Chronicle updated!');
      setIsEditModalOpen(false);
      setSelectedConcept({
        ...selectedConcept,
        title: editTitle,
        content: editContent,
        summary: summaryText,
      });
      refetch();
    } catch (err) {
      console.error(err);
      toast.error(language === 'vi' ? 'Cập nhật bài viết thất bại' : 'Failed to update article');
    } finally {
      setIsSavingEdit(false);
    }
  };

  // Filtering logic
  const filteredConcepts = libraryConcepts.filter(c =>
    c.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (c.summary && c.summary.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="flex-1 min-h-0 flex flex-col md:flex-row p-6 md:p-8 gap-6 md:gap-8 overflow-hidden">

      {/* CỘT TRÁI - DANH SÁCH BÀI VIẾT & HÀNH ĐỘNG */}
      <div className="flex-[4] flex flex-col gap-4 min-h-0">

        {/* HÀNH ĐỘNG NHANH */}
        <div className="grid grid-cols-3 gap-2.5 shrink-0">
          <Button
            onClick={() => {
              playSound('click');
              setIsAiModalOpen(true);
            }}
            variant="default"
            className="rounded-2xl py-6 flex flex-col sm:flex-row items-center justify-center gap-1.5 border border-indigo-500/30 bg-gradient-to-br from-indigo-950/40 to-slate-900/60 hover:from-indigo-900/50 hover:to-slate-800/60 text-white font-mono text-[10px] uppercase tracking-wider shadow-md hover:shadow-indigo-500/10 cursor-pointer transition-all"
          >
            <Sparkles size={12} className="text-indigo-400 animate-pulse" />
            <span>{language === 'vi' ? 'AI Viết' : 'AI Essay'}</span>
          </Button>

          <Button
            onClick={() => {
              playSound('click');
              setIsScrapeModalOpen(true);
            }}
            variant="outline"
            className="rounded-2xl py-6 flex flex-col sm:flex-row items-center justify-center gap-1.5 border-white/10 bg-white/[0.02] hover:bg-white/[0.05] text-gray-300 font-mono text-[10px] uppercase tracking-wider cursor-pointer transition-all"
          >
            <Link2 size={12} className="text-forge-cyan" />
            <span>{language === 'vi' ? 'Sưu Tầm' : 'Scrape'}</span>
          </Button>

          <Button
            onClick={() => {
              playSound('click');
              setIsWriteModalOpen(true);
            }}
            variant="outline"
            className="rounded-2xl py-6 flex flex-col sm:flex-row items-center justify-center gap-1.5 border-white/10 bg-white/[0.02] hover:bg-white/[0.05] text-gray-300 font-mono text-[10px] uppercase tracking-wider cursor-pointer transition-all"
          >
            <PenTool size={12} className="text-emerald-400" />
            <span>{language === 'vi' ? 'Tự Viết' : 'Write'}</span>
          </Button>
        </div>

        {/* Ô TÌM KIẾM */}
        <div className="relative shrink-0">
          <Input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={language === 'vi' ? 'Tìm bài viết...' : 'Search chronicles...'}
            className="pl-9 bg-black/30 border-white/5 text-xs h-11 rounded-2xl placeholder:text-gray-600"
            icon={<Search size={14} className="text-gray-600" />}
          />
        </div>

        {/* DANH SÁCH CHRONICLES */}
        <GlassCard className="flex-1 rounded-3xl p-4 flex flex-col min-h-0 overflow-y-auto scrollbar-hide border-white/5 bg-black/10">
          {isLoadingConcepts ? (
            <div className="flex-1 flex flex-col items-center justify-center text-gray-500 gap-2">
              <Loader2 className="w-6 h-6 animate-spin text-forge-cyan" />
              <span className="text-xs font-mono tracking-wider">LOADING CHRONICLES...</span>
            </div>
          ) : filteredConcepts.length === 0 ? (
            <div className="flex-1 flex flex-col items-center justify-center text-gray-600 text-center p-6 gap-3">
              <Scroll size={36} className="opacity-20" />
              <div>
                <p className="text-xs font-bold text-gray-400">
                  {language === 'vi' ? 'Thư viện trống' : 'Chronicle Library Empty'}
                </p>
                <p className="text-[10px] font-light text-gray-600 mt-1 max-w-xs">
                  {language === 'vi' ? 'Hãy dùng AI hoặc liên kết web để ghi chép lại các bài luận quý giá của bạn.' : 'Generate or scrape documents to begin cultivating your wisdom collection.'}
                </p>
              </div>
            </div>
          ) : (
            <div className="space-y-2.5">
              {filteredConcepts.map((concept) => {
                const isActive = selectedConcept?.id === concept.id;
                const dateString = concept.createdAt
                  ? new Date(concept.createdAt).toLocaleDateString(language === 'vi' ? 'vi-VN' : 'en-US', {
                    month: 'short',
                    day: 'numeric',
                    year: 'numeric'
                  })
                  : '';

                 const getBadgeDetails = (conceptItem: KnowledgeConcept) => {
                   if (conceptItem.url && conceptItem.url.startsWith('http')) {
                     return {
                       label: language === 'vi' ? 'Thu Thập Web' : 'Web Scraped',
                       className: 'bg-forge-cyan/15 text-forge-cyan border border-forge-cyan/20'
                     };
                   }
                   if (conceptItem.url === 'ai') {
                     return {
                       label: language === 'vi' ? 'AI Luận Giả' : 'AI Essay',
                       className: 'bg-indigo-500/15 text-indigo-400 border border-indigo-500/20'
                     };
                   }
                   const name = user?.name || user?.email || (language === 'vi' ? 'Cá nhân' : 'Personal');
                   return {
                     label: language === 'vi' ? `Tác giả: ${name}` : `Author: ${name}`,
                     className: 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/20'
                   };
                 };
                 const badge = getBadgeDetails(concept);

                 return (
                   <div
                     key={concept.id}
                     onClick={() => handleSelectConcept(concept)}
                     className={cn(
                       'group p-3.5 rounded-2xl border text-left cursor-pointer transition-all relative overflow-hidden flex flex-col justify-between gap-2',
                       isActive
                         ? 'border-forge-cyan bg-forge-cyan/[0.07] shadow-sm'
                         : 'border-white/5 bg-white/[0.01] hover:border-white/10 hover:bg-white/[0.03]'
                     )}
                   >
                     <div className="flex justify-between items-start gap-2">
                       <div className="space-y-1 min-w-0">
                         <span className={cn('text-[9px] font-mono px-2 py-0.5 rounded-full uppercase tracking-wider', badge.className)}>
                           {badge.label}
                         </span>
                         <h4 className="text-xs font-bold text-white tracking-tight leading-snug truncate group-hover:text-forge-cyan transition-colors pt-1">
                           {concept.title}
                         </h4>
                       </div>
                      <button
                        onClick={(e) => handleDeleteConcept(e, concept.id)}
                        className="opacity-0 group-hover:opacity-100 p-1.5 rounded-xl hover:bg-red-500/10 text-gray-500 hover:text-red-400 transition-all cursor-pointer"
                      >
                        <Trash2 size={12} />
                      </button>
                    </div>

                    <p className="text-[10px] text-gray-500 line-clamp-2 leading-relaxed font-light">
                      {concept.summary || (concept.content ? concept.content.slice(0, 120) + '...' : '')}
                    </p>

                    <div className="flex items-center justify-between text-[9px] font-mono text-gray-600 border-t border-white/5 pt-2 mt-1">
                      <span className="flex items-center gap-1">
                        <Calendar size={10} />
                        {dateString}
                      </span>
                      <ChevronRight size={10} className="text-gray-600 group-hover:text-forge-cyan transition-transform group-hover:translate-x-0.5" />
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </GlassCard>
      </div>

      {/* CỘT PHẢI - PREMIUM SERIF READER */}
      <div className="flex-[7] flex flex-col min-h-0">
        <GlassCard className="flex-1 rounded-3xl p-6 md:p-8 flex flex-col overflow-y-auto scrollbar-hide border-white/5 bg-[#0b0c10]/40 relative">
          {selectedConcept ? (
            <div className="flex-1 flex flex-col">

              {/* Header Metadata */}
              <div className="border-b border-white/5 pb-4 mb-6 space-y-3">
                <div className="flex items-center gap-2 flex-wrap">
                  {(() => {
                    const isWeb = selectedConcept.url && selectedConcept.url.startsWith('http');
                    const isAi = selectedConcept.url === 'ai';
                    const name = user?.name || user?.email || (language === 'vi' ? 'Bạn' : 'You');
                    return (
                      <span className={cn(
                        "text-[9px] font-mono px-2 py-0.5 rounded-full uppercase tracking-widest",
                        isWeb
                          ? "bg-forge-cyan/10 text-forge-cyan border border-forge-cyan/20"
                          : isAi
                            ? "bg-indigo-500/10 text-indigo-400 border border-indigo-500/20"
                            : "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                      )}>
                        {isWeb
                          ? (language === 'vi' ? 'Nguồn Ngoài' : 'External Web')
                          : isAi
                            ? (language === 'vi' ? 'Tiểu Luận AI' : 'AI Essay')
                            : (language === 'vi' ? `Tác giả: ${name}` : `Author: ${name}`)}
                      </span>
                    );
                  })()}

                  {selectedConcept.url && selectedConcept.url.startsWith('http') && (
                    <a
                      href={selectedConcept.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[9px] font-mono text-forge-cyan hover:underline flex items-center gap-1 hover:text-cyan-400 transition-colors"
                    >
                      <ExternalLink size={10} />
                      {language === 'vi' ? 'Xem liên kết gốc' : 'Original Source'}
                    </a>
                  )}
                </div>

                <div className="flex justify-between items-start gap-4">
                  <h2 className="text-2xl md:text-3xl font-bold text-white leading-tight tracking-tight pt-1 flex-1">
                    {selectedConcept.title}
                  </h2>
                  <Button
                    onClick={handleStartEdit}
                    variant="outline"
                    size="sm"
                    className="rounded-xl border-white/10 hover:bg-white/5 text-forge-cyan text-xs font-mono uppercase tracking-wider py-1.5 px-3.5 shrink-0 flex items-center gap-1.5 cursor-pointer"
                  >
                    <Edit3 size={12} />
                    <span>{language === 'vi' ? 'Sửa' : 'Edit'}</span>
                  </Button>
                </div>

                <div className="flex items-center gap-4 text-[10px] font-mono text-gray-500">
                  <span className="flex items-center gap-1">
                    <Calendar size={11} />
                    {new Date(selectedConcept.createdAt).toLocaleDateString(language === 'vi' ? 'vi-VN' : 'en-US', {
                      weekday: 'long',
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </span>
                </div>
              </div>

              {/* Book content (Serif font family) */}
              <div className="flex-1 prose prose-invert max-w-none text-gray-300 text-sm md:text-base leading-relaxed tracking-wide space-y-4 selection:bg-indigo-500/30">
                <ReactMarkdown
                  components={{
                    blockquote: ({ ...props }) => (
                      <blockquote {...props} className="border-l-2 border-indigo-500/60 pl-4 py-1 my-4 italic text-gray-400 font-sans" />
                    ),
                    h1: ({ ...props }) => <h1 {...props} className="text-xl md:text-2xl font-bold text-white mt-8 mb-4 border-b border-white/5 pb-2" />,
                    h2: ({ ...props }) => <h2 {...props} className="text-lg md:text-xl font-bold text-white mt-6 mb-3" />,
                    h3: ({ ...props }) => <h3 {...props} className="text-base md:text-lg font-bold text-white mt-4 mb-2" />,
                    p: ({ ...props }) => <p {...props} className="mb-4 text-justify whitespace-pre-wrap" />,
                    li: ({ ...props }) => <li {...props} className="ml-4 list-disc mb-1" />,
                  }}
                >
                  {selectedConcept.content || ''}
                </ReactMarkdown>
              </div>
            </div>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center text-center p-8 gap-4 text-gray-500">
              <div className="w-14 h-14 rounded-full bg-white/[0.02] border border-white/5 flex items-center justify-center text-gray-400 opacity-60">
                <BookOpen size={24} />
              </div>
              <div>
                <h3 className="text-sm font-bold text-white">
                  {language === 'vi' ? 'Chưa chọn bài viết' : 'No Chronicle Selected'}
                </h3>
                <p className="text-xs text-gray-600 mt-1 max-w-xs font-light">
                  {language === 'vi' ? 'Chọn một bài viết ở danh sách bên trái hoặc tạo bài viết mới để bắt đầu đọc.' : 'Select an article from the left panel or synthesize one to start reading.'}
                </p>
              </div>
            </div>
          )}
        </GlassCard>
      </div>

      {/* MODAL SƯU TẦM LINK */}
      <Modal
        isOpen={isScrapeModalOpen}
        onClose={() => setIsScrapeModalOpen(false)}
        title={language === 'vi' ? 'Sưu tầm bài viết từ Web' : 'Scrape Web Article'}
        maxWidth="md"
      >
        <div className="space-y-5">
          <p className="text-xs text-gray-400 leading-relaxed font-light">
            {language === 'vi'
              ? 'Nhập địa chỉ URL của bài báo hoặc blog. Hệ thống sẽ cào tự động và lưu nội dung tinh giản vào thư viện tri thức.'
              : 'Enter a blog or article URL. The scraper will extract clean text content and add it to your knowledge collection.'}
          </p>

          <div className="space-y-1.5">
            <Label className="text-[10px] font-mono tracking-wider uppercase text-gray-400">URL Link</Label>
            <Input
              value={scrapeUrlInput}
              onChange={(e) => setScrapeUrlInput(e.target.value)}
              placeholder="https://example.com/article-path"
              className="bg-black/30 border-white/10"
              disabled={isScraping}
            />
          </div>

          <div className="flex gap-3 justify-end pt-2">
            <Button
              onClick={() => setIsScrapeModalOpen(false)}
              variant="outline"
              className="rounded-xl font-mono text-xs uppercase"
              disabled={isScraping}
            >
              {language === 'vi' ? 'Hủy' : 'Cancel'}
            </Button>
            <Button
              onClick={handleScrape}
              variant="default"
              className="rounded-xl font-mono text-xs uppercase"
              disabled={isScraping}
            >
              {isScraping ? (
                <>
                  <Loader2 className="w-3.5 h-3.5 animate-spin mr-1.5" />
                  {language === 'vi' ? 'Đang cào...' : 'Scraping...'}
                </>
              ) : (
                language === 'vi' ? 'Sưu Tầm' : 'Collect'
              )}
            </Button>
          </div>
        </div>
      </Modal>

      {/* MODAL AI WRITER / ESSAY GENERATOR */}
      <Modal
        isOpen={isAiModalOpen}
        onClose={() => {
          if (!isGenerating) {
            setIsAiModalOpen(false);
          }
        }}
        title={language === 'vi' ? 'Yêu cầu AI lập luận & viết bài' : 'AI Thesis Synthesis'}
        maxWidth="lg"
      >
        <div className="space-y-5">
          {!isGenerating ? (
            <>
              <p className="text-xs text-gray-400 leading-relaxed font-light">
                {language === 'vi'
                  ? 'Antigravity Chronicles sẽ đóng vai trò như một học giả, phân tích và diễn luận các ý niệm phức tạp thành một tiểu luận dài sâu sắc.'
                  : 'Synthesize raw concepts into highly structured essays styled after chosen wisdom traditions.'}
              </p>

              <div className="space-y-1.5">
                <Label className="text-[10px] font-mono tracking-wider uppercase text-gray-400">
                  {language === 'vi' ? 'Chủ đề / Ý niệm' : 'Topic / Core Idea'}
                </Label>
                <Input
                  value={aiTopic}
                  onChange={(e) => setAiTopic(e.target.value)}
                  placeholder={language === 'vi' ? 'ví dụ: Ý nghĩa của Memento Mori trong kỷ nguyên số' : 'e.g., Stoic tranquility vs Epicurean pleasure'}
                  className="bg-black/30 border-white/10"
                />
              </div>

              <div className="space-y-1.5">
                <Label className="text-[10px] font-mono tracking-wider uppercase text-gray-400">
                  {language === 'vi' ? 'Trường phái suy luận' : 'Wisdom School / Style'}
                </Label>
                <div className="grid grid-cols-2 gap-2.5">
                  {[
                    { id: 'stoicism', name: language === 'vi' ? 'Khắc Kỷ (Stoic)' : 'Stoicism', desc: 'Rational state control' },
                    { id: 'alchemy', name: language === 'vi' ? 'Giả Kim (Alchemy)' : 'Alchemy', desc: 'Mental transmutation' },
                    { id: 'science', name: language === 'vi' ? 'Khoa Học (Science)' : 'Science', desc: 'Empirical logic' },
                    { id: 'wisdom', name: language === 'vi' ? 'Cổ Điển (Wisdom)' : 'Ancient Wisdom', desc: 'Transcendental insights' }
                  ].map((style) => (
                    <button
                      key={style.id}
                      onClick={() => setAiStyle(style.id)}
                      className={cn(
                        'p-3 rounded-xl border text-left transition-all cursor-pointer',
                        aiStyle === style.id
                          ? 'border-indigo-500 bg-indigo-950/20 text-white'
                          : 'border-white/5 bg-white/[0.01] hover:border-white/10 text-gray-400'
                      )}
                    >
                      <div className="text-xs font-bold font-mono">{style.name}</div>
                      <div className="text-[9px] text-gray-500 font-light mt-0.5">{style.desc}</div>
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex gap-3 justify-end pt-2">
                <Button
                  onClick={() => setIsAiModalOpen(false)}
                  variant="outline"
                  className="rounded-xl font-mono text-xs uppercase"
                >
                  {language === 'vi' ? 'Hủy' : 'Cancel'}
                </Button>
                <Button
                  onClick={handleAiGenerate}
                  variant="default"
                  className="rounded-xl font-mono text-xs uppercase bg-gradient-to-r from-indigo-600 to-cyan-600 hover:from-indigo-500 hover:to-cyan-500 text-white"
                >
                  <Sparkles size={12} className="mr-1.5" />
                  {language === 'vi' ? 'Khởi Tạo Luận Điểm' : 'Synthesize Essay'}
                </Button>
              </div>
            </>
          ) : (
            /* ACTIVE STREAMING INTERFACE */
            <div className="space-y-4">
              <div className="flex justify-between items-center bg-indigo-950/25 border border-indigo-500/10 p-3 rounded-2xl">
                <div className="flex items-center gap-2 text-xs font-mono text-indigo-400">
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  <span>{language === 'vi' ? 'Học giả đang viết bài luận...' : 'Chronicles Scholar is typing...'}</span>
                </div>
                <Button
                  onClick={handleCancelGeneration}
                  variant="outline"
                  className="rounded-xl text-[10px] px-3 py-1 font-mono uppercase text-red-400 hover:text-red-300 border-red-500/20 hover:bg-red-500/5 cursor-pointer"
                >
                  {language === 'vi' ? 'Hủy' : 'Stop'}
                </Button>
              </div>

              <div className="h-96 border border-white/5 bg-black/40 rounded-3xl p-5 overflow-y-auto text-sm leading-relaxed tracking-wide text-gray-300 selection:bg-indigo-500/30">
                <ReactMarkdown
                  components={{
                    blockquote: ({ ...props }) => (
                      <blockquote {...props} className="border-l-2 border-indigo-500/60 pl-4 py-1 my-4 italic text-gray-400" />
                    ),
                    h1: ({ ...props }) => <h1 {...props} className="text-xl md:text-2xl font-bold text-white mt-8 mb-4 border-b border-white/5 pb-2" />,
                    h2: ({ ...props }) => <h2 {...props} className="text-lg md:text-xl font-bold text-white mt-6 mb-3" />,
                    h3: ({ ...props }) => <h3 {...props} className="text-base md:text-lg font-bold text-white mt-4 mb-2" />,
                    p: ({ ...props }) => <p {...props} className="mb-4 text-justify whitespace-pre-wrap" />,
                  }}
                >
                  {streamedContent || '...'}
                </ReactMarkdown>
                <div ref={streamEndRef} />
              </div>
            </div>
          )}
        </div>
      </Modal>

      {/* MODAL TỰ VIẾT BÀI LUẬN */}
      <Modal
        isOpen={isWriteModalOpen}
        onClose={() => {
          if (!isSavingCustom) {
            setIsWriteModalOpen(false);
          }
        }}
        title={language === 'vi' ? 'Soạn thảo bài viết mới' : 'Compose New Chronicle'}
        maxWidth="2xl"
      >
        <div className="space-y-4">
          <div className="space-y-1.5">
            <Label className="text-[10px] font-mono tracking-wider uppercase text-gray-400">
              {language === 'vi' ? 'Tiêu đề' : 'Title'}
            </Label>
            <Input
              value={writeTitle}
              onChange={(e) => setWriteTitle(e.target.value)}
              placeholder={language === 'vi' ? 'Nhập tiêu đề bài viết của bạn...' : 'Enter article title...'}
              className="bg-black/30 border-white/10"
              disabled={isSavingCustom}
            />
          </div>

          <div className="space-y-1.5">
            <Label className="text-[10px] font-mono tracking-wider uppercase text-gray-400">
              {language === 'vi' ? 'Nội dung (Hỗ trợ Markdown)' : 'Content (Markdown Supported)'}
            </Label>
            <div className="border border-white/10 rounded-md bg-black/20 p-3 h-[400px] flex flex-col">
              <ForgeEditor
                content={writeContent}
                onChange={setWriteContent}
                placeholder={language === 'vi' ? 'Viết nội dung bài luận của bạn tại đây...' : 'Compose your essay here...'}
                className="flex-1 min-h-0"
              />
            </div>
          </div>

          <div className="flex gap-3 justify-end pt-2">
            <Button
              onClick={() => setIsWriteModalOpen(false)}
              variant="outline"
              className="rounded-xl font-mono text-xs uppercase"
              disabled={isSavingCustom}
            >
              {language === 'vi' ? 'Hủy' : 'Cancel'}
            </Button>
            <Button
              onClick={handleSaveCustomArticle}
              variant="default"
              className="rounded-xl font-mono text-xs uppercase bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white"
              disabled={isSavingCustom}
            >
              {isSavingCustom ? (
                <>
                  <Loader2 className="w-3.5 h-3.5 animate-spin mr-1.5" />
                  {language === 'vi' ? 'Đang lưu...' : 'Saving...'}
                </>
              ) : (
                language === 'vi' ? 'Lưu Bài Viết' : 'Save Chronicle'
              )}
            </Button>
          </div>
        </div>
      </Modal>

      {/* MODAL CHỈNH SỬA BÀI VIẾT */}
      <Modal
        isOpen={isEditModalOpen}
        onClose={() => {
          if (!isSavingEdit) {
            setIsEditModalOpen(false);
          }
        }}
        title={language === 'vi' ? 'Chỉnh sửa bài viết' : 'Edit Chronicle'}
        maxWidth="2xl"
      >
        <div className="space-y-4">
          <div className="space-y-1.5">
            <Label className="text-[10px] font-mono tracking-wider uppercase text-gray-400">
              {language === 'vi' ? 'Tiêu đề' : 'Title'}
            </Label>
            <Input
              value={editTitle}
              onChange={(e) => setEditTitle(e.target.value)}
              placeholder={language === 'vi' ? 'Nhập tiêu đề...' : 'Enter title...'}
              className="bg-black/30 border-white/10"
              disabled={isSavingEdit}
            />
          </div>

          <div className="space-y-1.5">
            <Label className="text-[10px] font-mono tracking-wider uppercase text-gray-400">
              {language === 'vi' ? 'Nội dung (Hỗ trợ Markdown)' : 'Content (Markdown Supported)'}
            </Label>
            <div className="border border-white/10 rounded-md bg-black/20 p-3 h-[400px] flex flex-col">
              <ForgeEditor
                content={editContent}
                onChange={setEditContent}
                placeholder={language === 'vi' ? 'Viết nội dung bài luận của bạn tại đây...' : 'Compose your essay here...'}
                className="flex-1 min-h-0"
              />
            </div>
          </div>

          <div className="flex gap-3 justify-end pt-2">
            <Button
              onClick={() => setIsEditModalOpen(false)}
              variant="outline"
              className="rounded-xl font-mono text-xs uppercase"
              disabled={isSavingEdit}
            >
              {language === 'vi' ? 'Hủy' : 'Cancel'}
            </Button>
            <Button
              onClick={handleSaveEdit}
              variant="default"
              className="rounded-xl font-mono text-xs uppercase bg-gradient-to-r from-forge-cyan to-blue-600 text-black"
              disabled={isSavingEdit}
            >
              {isSavingEdit ? (
                <>
                  <Loader2 className="w-3.5 h-3.5 animate-spin mr-1.5" />
                  {language === 'vi' ? 'Đang lưu...' : 'Saving...'}
                </>
              ) : (
                language === 'vi' ? 'Lưu Thay Đổi' : 'Save Changes'
              )}
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
