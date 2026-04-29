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
    <div className="card">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-xl font-bold text-slate-800">{goal.title}</h3>
          <p className="text-sm text-slate-500 flex items-center gap-1 mt-1">
            <Calendar size={14} /> Hạn chót: {formattedDeadline}
          </p>
        </div>
        <button 
          onClick={() => onDelete(goal.id)}
          className="text-slate-400 hover:text-red-500 transition-colors"
        >
          <Trash2 size={18} />
        </button>
      </div>

      <div className="space-y-4">
        <div className="flex justify-between text-sm font-medium">
          <span className="text-slate-600">Tiến độ</span>
          <span className="text-emerald-600">{progress.toFixed(1)}%</span>
        </div>
        
        <div className="progress-bar">
          <div 
            className="progress-fill" 
            style={{ width: `${progress}%` }}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="bg-slate-50 p-3 rounded-lg">
            <p className="text-xs text-slate-500 uppercase tracking-wider mb-1">Đã có</p>
            <p className="text-lg font-bold text-slate-800">
              {goal.current_amount.toLocaleString()} đ
            </p>
          </div>
          <div className="bg-emerald-50 p-3 rounded-lg border border-emerald-100">
            <p className="text-xs text-emerald-600 uppercase tracking-wider mb-1">Mục tiêu</p>
            <p className="text-lg font-bold text-emerald-700">
              {goal.target_amount.toLocaleString()} đ
            </p>
          </div>
        </div>

        <div className="border-t border-slate-100 pt-4 mt-4">
          <p className="text-sm font-medium text-slate-700 mb-2 flex items-center gap-2">
            <TrendingUp size={16} className="text-emerald-500" /> Kế hoạch tiết kiệm:
          </p>
          <div className="grid grid-cols-3 gap-2">
            <div className="text-center">
              <p className="text-[10px] text-slate-400 uppercase">Ngày</p>
              <p className="font-bold text-slate-700 text-sm">{goal.saving_plan.daily.toLocaleString()} đ</p>
            </div>
            <div className="text-center border-x border-slate-100">
              <p className="text-[10px] text-slate-400 uppercase">Tuần</p>
              <p className="font-bold text-slate-700 text-sm">{goal.saving_plan.weekly.toLocaleString()} đ</p>
            </div>
            <div className="text-center">
              <p className="text-[10px] text-slate-400 uppercase">Tháng</p>
              <p className="font-bold text-slate-700 text-sm">{goal.saving_plan.monthly.toLocaleString()} đ</p>
            </div>
          </div>
        </div>
        
        <div className="mt-4 flex gap-2">
          <input 
            type="number" 
            placeholder="Cập nhật số tiền..."
            className="flex-1 px-3 py-2 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-emerald-500 outline-none"
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
