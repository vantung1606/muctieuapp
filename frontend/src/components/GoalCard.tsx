'use client';

import React from 'react';
import { Calendar, Target, TrendingUp, Trash2 } from 'lucide-react';

interface GoalProps {
  goal: {
    id: string;
    title: string;
    target_amount: number;
    current_amount: number;
    deadline: string;
    saving_plan: {
      daily: number;
      weekly: number;
      monthly: number;
      daysRemaining: number;
    };
  };
  onDelete: (id: string) => void;
  onUpdate: (id: string, amount: number) => void;
}

export default function GoalCard({ goal, onDelete, onUpdate }: GoalProps) {
  const progress = Math.min((goal.current_amount / goal.target_amount) * 100, 100);
  const formattedDeadline = new Date(goal.deadline).toLocaleDateString('vi-VN');

  return (
    <div className="card-premium !p-5 md:!p-8 group">
      <div className="flex justify-between items-start mb-6">
        <div>
          <h3 className="text-lg md:text-xl font-black text-slate-800 group-hover:text-emerald-600 transition-colors">{goal.title}</h3>
          <p className="text-xs text-slate-400 flex items-center gap-1 mt-1 font-medium">
            <Calendar size={12} /> {formattedDeadline}
          </p>
        </div>
        <button 
          onClick={() => onDelete(goal.id)}
          className="bg-slate-50 p-2 rounded-xl text-slate-300 hover:text-red-500 hover:bg-red-50 transition-all"
        >
          <Trash2 size={18} />
        </button>
      </div>

      <div className="space-y-6">
        <div className="flex justify-between text-xs md:text-sm font-bold uppercase tracking-wider">
          <span className="text-slate-400">Tiến độ</span>
          <span className="text-emerald-600 bg-emerald-50 px-2 py-1 rounded-md">{progress.toFixed(1)}%</span>
        </div>
        
        <div className="progress-bar-v2">
          <div 
            className="progress-fill-v2" 
            style={{ width: `${progress}%` }}
          />
        </div>

        <div className="grid grid-cols-2 gap-3 md:gap-4">
          <div className="bg-slate-50/50 p-4 rounded-2xl border border-slate-100">
            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mb-1">Đã có</p>
            <p className="text-base md:text-lg font-black text-slate-800">
              {goal.current_amount.toLocaleString()} <span className="text-[10px] font-normal text-slate-400">đ</span>
            </p>
          </div>
          <div className="bg-emerald-50/50 p-4 rounded-2xl border border-emerald-100">
            <p className="text-[10px] text-emerald-500 font-bold uppercase tracking-widest mb-1">Mục tiêu</p>
            <p className="text-base md:text-lg font-black text-emerald-700">
              {goal.target_amount.toLocaleString()} <span className="text-[10px] font-normal text-emerald-400">đ</span>
            </p>
          </div>
        </div>

        <div className="bg-slate-900/5 p-4 rounded-2xl">
          <p className="text-[10px] font-bold text-slate-500 mb-3 flex items-center gap-2 uppercase tracking-widest">
            <TrendingUp size={14} className="text-emerald-500" /> Kế hoạch tiết kiệm
          </p>
          <div className="grid grid-cols-3 gap-2">
            <div className="text-center">
              <p className="text-[9px] text-slate-400 font-bold uppercase">Ngày</p>
              <p className="font-black text-slate-700 text-xs md:text-sm">{goal.saving_plan.daily.toLocaleString()}</p>
            </div>
            <div className="text-center border-x border-slate-200/50">
              <p className="text-[9px] text-slate-400 font-bold uppercase">Tuần</p>
              <p className="font-black text-slate-700 text-xs md:text-sm">{goal.saving_plan.weekly.toLocaleString()}</p>
            </div>
            <div className="text-center">
              <p className="text-[9px] text-slate-400 font-bold uppercase">Tháng</p>
              <p className="font-black text-slate-700 text-xs md:text-sm">{goal.saving_plan.monthly.toLocaleString()}</p>
            </div>
          </div>
        </div>
        
        <div className="flex gap-2">
          <input 
            type="number" 
            placeholder="Cập nhật số tiền..."
            className="flex-1 px-4 py-3 bg-white border border-slate-200 rounded-xl text-sm font-medium focus:ring-2 focus:ring-emerald-500 outline-none transition-all"
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                onUpdate(goal.id, parseFloat((e.target as HTMLInputElement).value));
                (e.target as HTMLInputElement).value = '';
              }
            }}
          />
        </div>
      </div>
    </div>
  );
}
