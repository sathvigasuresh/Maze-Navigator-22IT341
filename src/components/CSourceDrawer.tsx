/**
 * C99 Reference Code Modal / Drawer
 * Displays the actual C99 Data Structures and Algorithms implementations
 * corresponding to TCE 22IT341 syllabus.
 */

import React, { useState } from 'react';
import { C_SNIPPETS } from '../algorithms/cCodeSnippets';
import { X, Copy, Check, FileCode2 } from 'lucide-react';

interface CSourceDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CSourceDrawer: React.FC<CSourceDrawerProps> = ({
  isOpen,
  onClose
}) => {
  const [selectedId, setSelectedId] = useState<string>('stack');
  const [copied, setCopied] = useState<boolean>(false);

  if (!isOpen) return null;

  const activeSnippet = C_SNIPPETS.find(s => s.id === selectedId) || C_SNIPPETS[0];

  const handleCopy = () => {
    navigator.clipboard.writeText(activeSnippet.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-in fade-in duration-150">
      <div className="w-full max-w-4xl bg-[#0F172A] border border-slate-700 rounded-2xl shadow-2xl flex flex-col max-h-[88vh] overflow-hidden">
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-[#0B1120]">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-cyan-950 border border-cyan-800/80 flex items-center justify-center">
              <FileCode2 className="w-4 h-4 text-cyan-400" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white">
                C99 Project Source Architecture
              </h2>
              <p className="text-xs text-slate-400">
                Course: 22IT341 Data Structures · Accompanying C99 Project Layer
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab selection */}
        <div className="flex items-center gap-2 px-6 py-2.5 bg-slate-900/90 border-b border-slate-800 overflow-x-auto no-scrollbar">
          {C_SNIPPETS.map(snippet => (
            <button
              type="button"
              key={snippet.id}
              onClick={() => setSelectedId(snippet.id)}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap ${
                selectedId === snippet.id
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 font-semibold'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
              }`}
            >
              {snippet.title}
            </button>
          ))}
        </div>

        {/* Code View Body */}
        <div className="flex-1 overflow-y-auto p-6 bg-[#080D1A]">
          <div className="flex items-center justify-between mb-3 text-xs text-slate-400">
            <p className="leading-relaxed">
              {activeSnippet.description}
            </p>
            <button
              type="button"
              onClick={handleCopy}
              className="flex items-center gap-1.5 px-3 py-1 text-xs font-medium text-slate-300 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-md transition-colors shrink-0"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-emerald-400">Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copy C Code</span>
                </>
              )}
            </button>
          </div>

          <div className="bg-[#050914] border border-slate-800/90 rounded-xl p-4 overflow-x-auto">
            <pre className="font-mono text-xs text-cyan-100/90 leading-relaxed">
              <code>{activeSnippet.code}</code>
            </pre>
          </div>
        </div>

        {/* Modal Footer Note */}
        <div className="px-6 py-3 bg-[#0B1120] border-t border-slate-800/80 flex flex-wrap items-center justify-between text-xs text-slate-400">
          <span>Thiagarajar College of Engineering · Department of Information Technology</span>
          <span className="text-cyan-400/90 font-mono text-[11px]">C99 Standard Compliant</span>
        </div>
      </div>
    </div>
  );
};
