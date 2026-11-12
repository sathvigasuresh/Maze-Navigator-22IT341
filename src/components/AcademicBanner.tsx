/**
 * Academic Banner Component
 * Formats course, department, institution and project metadata using unboxed text and typographic separators.
 */

import React from 'react';
import { GraduationCap, Users } from 'lucide-react';

export const AcademicBanner: React.FC = () => {
  return (
    <div className="w-full bg-slate-900/60 border-b border-slate-800/80 px-4 sm:px-6 py-2.5 text-xs text-slate-400">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-y-2 gap-x-4">
        {/* Course & Institution Info */}
        <div className="flex flex-wrap items-center gap-2">
          <div className="flex items-center gap-1.5 text-slate-300 font-medium">
            <GraduationCap className="w-4 h-4 text-cyan-400" />
            <span>22IT341 Data Structures</span>
          </div>
          <span aria-hidden="true" className="text-slate-600">·</span>
          <span>Information Technology</span>
          <span aria-hidden="true" className="text-slate-600">·</span>
          <span className="text-slate-300">Thiagarajar College of Engineering</span>
        </div>

        {/* Project & Team Info */}
        <div className="flex items-center gap-2 text-slate-400">
          <div className="flex items-center gap-1.5">
            <Users className="w-3.5 h-3.5 text-cyan-400" />
            <span>Project Team of 7</span>
          </div>
          <span aria-hidden="true" className="text-slate-600">·</span>
          <span className="text-cyan-400/90 font-mono">C99 Algorithmic Companion</span>
        </div>
      </div>
    </div>
  );
};
