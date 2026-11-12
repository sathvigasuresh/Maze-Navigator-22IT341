/**
 * Linked List Visualizer Component
 * Demonstrates Singly Linked List nodes for the maze solution path:
 * [ Point(r,c) | LinearIdx | *next ] -> [ ... ] -> NULL
 * Supports interactive insertEnd and deleteLast demonstrations.
 */

import React from 'react';
import { LinkedListNode } from '../types/maze';
import { Network, Plus, Trash2, ArrowRight } from 'lucide-react';

interface LinkedListVisualizerProps {
  nodes: LinkedListNode[];
  onInsertEnd: (row: number, col: number) => void;
  onDeleteLast: () => void;
  onResetFromPath: () => void;
  lastAction?: string;
  cCodeSnapshot?: string;
}

export const LinkedListVisualizer: React.FC<LinkedListVisualizerProps> = ({
  nodes,
  onInsertEnd,
  onDeleteLast,
  onResetFromPath,
  lastAction,
  cCodeSnapshot
}) => {
  const [customRow, setCustomRow] = React.useState<number>(0);
  const [customCol, setCustomCol] = React.useState<number>(0);

  const handleManualInsert = (e: React.FormEvent) => {
    e.preventDefault();
    onInsertEnd(customRow, customCol);
  };

  return (
    <div className="bg-[#0F172A] border border-slate-800 rounded-xl p-4 sm:p-5 flex flex-col gap-4">
      {/* Header and Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800/80 pb-3">
        <div className="flex items-center gap-2">
          <Network className="w-5 h-5 text-cyan-400" />
          <div>
            <h3 className="text-sm font-semibold text-white">
              Singly Linked List Path Structure
            </h3>
            <p className="text-xs text-slate-400">
              <code className="text-cyan-400">struct Node &#123; int row, col, linearIndex; struct Node* next; &#125;;</code>
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onDeleteLast}
            disabled={nodes.length === 0}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-rose-300 bg-rose-950/40 border border-rose-800/60 rounded-lg hover:bg-rose-900/50 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>deleteLast(&head)</span>
          </button>
          <button
            type="button"
            onClick={onResetFromPath}
            className="px-3 py-1.5 text-xs font-medium text-slate-300 bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors"
          >
            Reset from Maze Path
          </button>
        </div>
      </div>

      {/* Manual Insert Bar */}
      <form
        onSubmit={handleManualInsert}
        className="flex flex-wrap items-center gap-3 bg-slate-900/70 p-3 rounded-lg border border-slate-800/80 text-xs"
      >
        <span className="text-slate-400 font-medium">Demonstrate Dynamic Allocation:</span>
        <div className="flex items-center gap-1.5">
          <label htmlFor="ll-row-input" className="text-slate-500 font-mono">Row:</label>
          <input
            id="ll-row-input"
            type="number"
            min={0}
            max={20}
            value={customRow}
            onChange={(e) => setCustomRow(Number(e.target.value))}
            className="w-14 px-2 py-1 bg-slate-950 border border-slate-700 rounded text-cyan-300 font-mono text-center focus:outline-none focus:border-cyan-500"
          />
        </div>
        <div className="flex items-center gap-1.5">
          <label htmlFor="ll-col-input" className="text-slate-500 font-mono">Col:</label>
          <input
            id="ll-col-input"
            type="number"
            min={0}
            max={20}
            value={customCol}
            onChange={(e) => setCustomCol(Number(e.target.value))}
            className="w-14 px-2 py-1 bg-slate-950 border border-slate-700 rounded text-cyan-300 font-mono text-center focus:outline-none focus:border-cyan-500"
          />
        </div>
        <button
          type="submit"
          className="flex items-center gap-1 px-3 py-1 bg-cyan-600 hover:bg-cyan-500 text-white font-medium rounded transition-colors"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>insertEnd(&head, {customRow}, {customCol})</span>
        </button>
        <span className="text-slate-500 text-[11px] ml-auto">
          Node Count: <span className="font-mono text-cyan-300 font-bold">{nodes.length}</span>
        </span>
      </form>

      {/* Visual Linked List Ribbon */}
      <div className="bg-slate-950/80 border border-slate-800 rounded-xl p-4 overflow-x-auto min-h-[140px] flex items-center">
        {nodes.length === 0 ? (
          <div className="w-full flex flex-col items-center justify-center py-6 text-slate-500 font-mono text-xs">
            <span>head &rarr; NULL</span>
            <span className="text-[11px] text-slate-600 mt-1">List is empty. Use insertEnd or run an algorithm to generate path nodes.</span>
          </div>
        ) : (
          <div className="flex items-center gap-2 py-2">
            {/* HEAD Pointer */}
            <div className="flex flex-col items-center shrink-0 pr-1">
              <span className="text-[10px] font-bold text-cyan-400 font-mono">HEAD</span>
              <ArrowRight className="w-4 h-4 text-cyan-400 mt-1" />
            </div>

            {/* List Nodes */}
            {nodes.map((node, index) => {
              const isFirst = index === 0;
              const isLast = index === nodes.length - 1;

              return (
                <React.Fragment key={node.id}>
                  {/* Single Linked List Node Box */}
                  <div className="flex shrink-0 bg-slate-900 border border-slate-700/80 rounded-lg shadow-sm font-mono text-xs overflow-hidden">
                    {/* Data section */}
                    <div className="px-3 py-2 bg-slate-800/80 border-r border-slate-700 flex flex-col justify-center">
                      <div className="text-[10px] text-slate-400 font-sans">
                        Node [{index}]
                      </div>
                      <div className="text-cyan-300 font-bold">
                        ({node.point.row}, {node.point.col})
                      </div>
                      <div className="text-[9px] text-slate-500">
                        idx={node.linearIndex}
                      </div>
                    </div>

                    {/* Next Pointer section */}
                    <div className="px-2.5 py-2 flex flex-col items-center justify-center bg-slate-900">
                      <span className="text-[9px] text-slate-500">next</span>
                      <span className="text-xs font-bold text-emerald-400">&bull;</span>
                    </div>
                  </div>

                  {/* Arrow to Next Node or NULL */}
                  <div className="flex items-center shrink-0 text-cyan-500/80 px-0.5">
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </React.Fragment>
              );
            })}

            {/* NULL Pointer Terminator */}
            <div className="px-2.5 py-1.5 bg-slate-900/90 border border-slate-800 rounded text-rose-400 font-mono text-xs font-bold shrink-0">
              NULL
            </div>
          </div>
        )}
      </div>

      {/* C Code Reflection Box */}
      {cCodeSnapshot && (
        <div className="bg-slate-950 border border-slate-800/80 rounded-lg p-3 text-xs font-mono">
          <div className="text-[11px] text-slate-400 mb-1 font-sans">
            C99 Pointer Operation in Memory:
          </div>
          <pre className="text-emerald-400/90 overflow-x-auto whitespace-pre-wrap leading-relaxed">
            {cCodeSnapshot}
          </pre>
        </div>
      )}
    </div>
  );
};
