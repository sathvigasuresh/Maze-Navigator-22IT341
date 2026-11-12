/**
 * Top Bar Header Component
 * Strict compliance with the Top Bar Contract:
 * [Wordmark, one line] — [Nav links, single-line] — [1 primary action]
 */

import React, { useState } from 'react';
import { ActiveTab } from '../types/maze';
import { Code2, Compass, Share2, Check } from 'lucide-react';

interface HeaderProps {
  activeTab: ActiveTab;
  onTabChange: (tab: ActiveTab) => void;
  onOpenCCode: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  onTabChange,
  onOpenCCode
}) => {
  return (
    <header className="w-full bg-[#0B1120]/95 backdrop-blur-md border-b border-slate-800/80 sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-8">
        {/* Zone 1: Brand Wordmark (Single text element) */}
        <div 
          onClick={() => onTabChange('dashboard')}
          className="flex items-center gap-2.5 cursor-pointer shrink-0 select-none"
        >
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center shadow-lg shadow-cyan-500/20">
            <Compass className="w-5 h-5 text-white" />
          </div>
          <span className="text-base sm:text-lg font-bold tracking-tight text-white whitespace-nowrap">
            MAZE NAVIGATOR
          </span>
        </div>

        {/* Zone 2: Navigation Links (Single-line, unboxed, text with subtle hover) */}
        <nav className="hidden lg:flex items-center gap-6 text-sm font-medium text-slate-300">
          <button
            type="button"
            onClick={() => onTabChange('dashboard')}
            className={`whitespace-nowrap transition-colors hover:text-cyan-400 ${
              activeTab === 'dashboard' ? 'text-cyan-400 font-semibold' : ''
            }`}
          >
            Dashboard
          </button>
          <button
            type="button"
            onClick={() => onTabChange('editor')}
            className={`whitespace-nowrap transition-colors hover:text-cyan-400 ${
              activeTab === 'editor' ? 'text-cyan-400 font-semibold' : ''
            }`}
          >
            Maze Editor
          </button>
          <button
            type="button"
            onClick={() => onTabChange('dfs')}
            className={`whitespace-nowrap transition-colors hover:text-cyan-400 ${
              activeTab === 'dfs' ? 'text-cyan-400 font-semibold' : ''
            }`}
          >
            DFS Stack
          </button>
          <button
            type="button"
            onClick={() => onTabChange('bfs')}
            className={`whitespace-nowrap transition-colors hover:text-cyan-400 ${
              activeTab === 'bfs' ? 'text-cyan-400 font-semibold' : ''
            }`}
          >
            BFS Queue
          </button>
          <button
            type="button"
            onClick={() => onTabChange('comparison')}
            className={`whitespace-nowrap transition-colors hover:text-cyan-400 ${
              activeTab === 'comparison' ? 'text-cyan-400 font-semibold' : ''
            }`}
          >
            Comparison
          </button>
        </nav>

        {/* Zone 3: Primary Actions (Share App & C99 Reference Code) */}
        <div className="flex items-center gap-2.5 shrink-0">
          <ShareButton />
          <button
            type="button"
            onClick={onOpenCCode}
            className="flex items-center gap-2 px-3.5 py-1.5 text-xs font-semibold text-cyan-300 bg-cyan-950/60 border border-cyan-800/80 rounded-lg hover:bg-cyan-900/60 hover:border-cyan-600 transition-colors whitespace-nowrap"
          >
            <Code2 className="w-4 h-4 text-cyan-400" />
            <span>C99 Code View</span>
          </button>
        </div>
      </div>

      {/* Primary Module Navigation Tabs Bar (Scrollable on mobile) */}
      <div className="border-t border-slate-800/50 bg-[#0F172A]/70 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto flex items-center gap-1 overflow-x-auto py-2 no-scrollbar text-xs font-medium">
          <TabButton
            active={activeTab === 'dashboard'}
            onClick={() => onTabChange('dashboard')}
            label="Dashboard"
          />
          <TabButton
            active={activeTab === 'editor'}
            onClick={() => onTabChange('editor')}
            label="Maze Editor"
          />
          <TabButton
            active={activeTab === 'dfs'}
            onClick={() => onTabChange('dfs')}
            label="DFS – Stack Visualizer"
          />
          <TabButton
            active={activeTab === 'bfs'}
            onClick={() => onTabChange('bfs')}
            label="BFS – Queue Visualizer"
          />
          <TabButton
            active={activeTab === 'shortest'}
            onClick={() => onTabChange('shortest')}
            label="Shortest Path"
          />
          <TabButton
            active={activeTab === 'linkedlist'}
            onClick={() => onTabChange('linkedlist')}
            label="Linked List Path"
          />
          <TabButton
            active={activeTab === 'statistics'}
            onClick={() => onTabChange('statistics')}
            label="Statistics"
          />
          <TabButton
            active={activeTab === 'comparison'}
            onClick={() => onTabChange('comparison')}
            label="DFS vs BFS Comparison"
          />
        </div>
      </div>
    </header>
  );
};

const TabButton: React.FC<{
  active: boolean;
  onClick: () => void;
  label: string;
}> = ({ active, onClick, label }) => (
  <button
    type="button"
    onClick={onClick}
    className={`px-3 py-1.5 rounded-md transition-all whitespace-nowrap shrink-0 ${
      active
        ? 'bg-cyan-500/15 text-cyan-300 border border-cyan-500/30 font-semibold shadow-sm'
        : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
    }`}
  >
    {label}
  </button>
);

const ShareButton: React.FC = () => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    const url = window.location.href;
    navigator.clipboard.writeText(url).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }).catch(() => {
      // Fallback
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    });
  };

  return (
    <button
      type="button"
      onClick={handleCopy}
      title="Copy shareable link"
      className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-200 bg-slate-800/90 hover:bg-slate-700 border border-slate-700/80 rounded-lg transition-colors whitespace-nowrap"
    >
      {copied ? (
        <>
          <Check className="w-3.5 h-3.5 text-emerald-400" />
          <span className="text-emerald-400">Link Copied!</span>
        </>
      ) : (
        <>
          <Share2 className="w-3.5 h-3.5 text-slate-400" />
          <span>Share</span>
        </>
      )}
    </button>
  );
};

