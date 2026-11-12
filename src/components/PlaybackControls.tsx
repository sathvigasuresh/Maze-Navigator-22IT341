/**
 * Playback Controls Component
 * Provides Step-by-Step, Run-All (Play/Pause), Speed Control, and Reset.
 */

import React from 'react';
import { Play, Pause, SkipForward, RotateCcw, FastForward } from 'lucide-react';

interface PlaybackControlsProps {
  isPlaying: boolean;
  currentStep: number;
  totalSteps: number;
  speed: number; // in milliseconds
  onPlay: () => void;
  onPause: () => void;
  onStepForward: () => void;
  onReset: () => void;
  onSpeedChange: (speedMs: number) => void;
  onStepSliderChange?: (step: number) => void;
  disabled?: boolean;
}

export const PlaybackControls: React.FC<PlaybackControlsProps> = ({
  isPlaying,
  currentStep,
  totalSteps,
  speed,
  onPlay,
  onPause,
  onStepForward,
  onReset,
  onSpeedChange,
  onStepSliderChange,
  disabled = false
}) => {
  const isEnd = totalSteps > 0 && currentStep >= totalSteps - 1;

  return (
    <div className="bg-[#0F172A] border border-slate-800 rounded-xl p-3.5 sm:p-4 flex flex-col gap-3">
      <div className="flex flex-wrap items-center justify-between gap-3">
        {/* Buttons Group */}
        <div className="flex items-center gap-2">
          {isPlaying ? (
            <button
              type="button"
              onClick={onPause}
              disabled={disabled}
              className="flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold text-amber-200 bg-amber-950/60 border border-amber-700/70 hover:bg-amber-900/60 rounded-lg transition-colors disabled:opacity-40"
            >
              <Pause className="w-4 h-4 fill-current" />
              <span>Pause</span>
            </button>
          ) : (
            <button
              type="button"
              onClick={onPlay}
              disabled={disabled || isEnd}
              className="flex items-center gap-1.5 px-4 py-1.5 text-xs font-semibold text-slate-950 bg-cyan-400 hover:bg-cyan-300 rounded-lg shadow-sm shadow-cyan-500/20 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
            >
              <Play className="w-4 h-4 fill-current" />
              <span>Run All</span>
            </button>
          )}

          <button
            type="button"
            onClick={onStepForward}
            disabled={disabled || isPlaying || isEnd}
            className="flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-medium text-slate-200 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-lg transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
          >
            <SkipForward className="w-4 h-4" />
            <span>Step Next</span>
          </button>

          <button
            type="button"
            onClick={onReset}
            disabled={disabled}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-400 hover:text-slate-200 hover:bg-slate-800/80 rounded-lg transition-colors disabled:opacity-40"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset</span>
          </button>
        </div>

        {/* Speed Selector */}
        <div className="flex items-center gap-2 text-xs">
          <FastForward className="w-3.5 h-3.5 text-slate-400" />
          <span className="text-slate-400 hidden sm:inline">Speed:</span>
          <div className="flex items-center bg-slate-900 border border-slate-800 rounded-lg p-0.5">
            <button
              type="button"
              onClick={() => onSpeedChange(450)}
              className={`px-2 py-1 text-[11px] rounded transition-colors ${
                speed >= 400 ? 'bg-cyan-500/20 text-cyan-300 font-semibold' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Slow
            </button>
            <button
              type="button"
              onClick={() => onSpeedChange(180)}
              className={`px-2 py-1 text-[11px] rounded transition-colors ${
                speed > 80 && speed < 400 ? 'bg-cyan-500/20 text-cyan-300 font-semibold' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Normal
            </button>
            <button
              type="button"
              onClick={() => onSpeedChange(50)}
              className={`px-2 py-1 text-[11px] rounded transition-colors ${
                speed <= 80 ? 'bg-cyan-500/20 text-cyan-300 font-semibold' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Fast
            </button>
          </div>
        </div>
      </div>

      {/* Progress Timeline Slider & Counter */}
      <div className="flex items-center gap-3 pt-1">
        <label htmlFor="playback-step-slider" className="sr-only">Algorithm Step Timeline</label>
        <input
          id="playback-step-slider"
          type="range"
          min={0}
          max={Math.max(0, totalSteps - 1)}
          value={currentStep}
          onChange={(e) => onStepSliderChange && onStepSliderChange(Number(e.target.value))}
          disabled={disabled || isPlaying || totalSteps <= 1}
          className="flex-1 accent-cyan-400 h-1.5 bg-slate-800 rounded-lg cursor-pointer"
        />
        <div className="font-mono text-xs text-slate-400 shrink-0">
          Step <span className="text-cyan-300 font-bold">{totalSteps === 0 ? 0 : currentStep + 1}</span> / {totalSteps}
        </div>
      </div>
    </div>
  );
};
