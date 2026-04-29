'use client';

import React, { useState, useEffect } from 'react';
import { Plus, Target, PieChart, Wallet } from 'lucide-react';
import GoalCard from '@/components/GoalCard';
import AddGoalModal from '@/components/AddGoalModal';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

export default function HomePage() {
  const [goals, setGoals] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  const fetchGoals = async () => {
    try {
      const res = await fetch(`${API_URL}/goals`);
      const data = await res.json();
      setGoals(data);
    } catch (error) {
      console.error('Error fetching goals:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGoals();
  }, []);

  const handleAddGoal = async (goalData: any) => {
    try {
      const res = await fetch(`${API_URL}/goals`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(goalData),
      });
      if (res.ok) fetchGoals();
    } catch (error) {
      console.error('Error adding goal:', error);
    }
  };

  const handleUpdateAmount = async (id: string, amount: number) => {
    try {
      const res = await fetch(`${API_URL}/goals/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ current_amount: amount }),
      });
      if (res.ok) fetchGoals();
    } catch (error) {
      console.error('Error updating goal:', error);
    }
  };

  const handleDeleteGoal = async (id: string) => {
    if (!confirm('Bạn có chắc muốn xoá mục tiêu này?')) return;
    try {
      const res = await fetch(`${API_URL}/goals/${id}`, {
        method: 'DELETE',
      });
      if (res.ok) fetchGoals();
    } catch (error) {
      console.error('Error deleting goal:', error);
    }
  };

  const totalTarget = Array.isArray(goals) ? goals.reduce((acc: number, goal: any) => acc + (goal.target_amount || 0), 0) : 0;
  const totalSaved = Array.isArray(goals) ? goals.reduce((acc: number, goal: any) => acc + (goal.current_amount || 0), 0) : 0;
  const overallProgress = totalTarget > 0 ? (totalSaved / totalTarget) * 100 : 0;

  return (
    <main className="flex-1 max-w-6xl mx-auto w-full p-6 md:p-10">
      <header className="flex items-center justify-between mb-8 md:mb-12">
        <div>
          <h1 className="text-[var(--text-h1)] font-black text-slate-900 tracking-tighter flex items-center gap-2">
            <div className="bg-emerald-500 p-2 rounded-2xl shadow-lg shadow-emerald-200">
              <Target className="text-white" size={24} />
            </div>
            <span>Mục Tiêu <span className="text-emerald-500">App</span></span>
          </h1>
          <p className="text-slate-400 mt-1 text-sm md:text-base font-medium">Smart financial tracking</p>
        </div>
        
        {/* Desktop Button */}
        <button 
          onClick={() => setIsModalOpen(true)}
          className="hidden md:flex btn-primary items-center gap-2"
        >
          <Plus size={20} /> Thêm mục tiêu
        </button>
      </header>

      {/* Mobile Floating Action Button */}
      <button 
        onClick={() => setIsModalOpen(true)}
        className="md:hidden fixed bottom-8 right-6 w-16 h-16 bg-emerald-500 text-white rounded-full shadow-2xl shadow-emerald-400 z-50 flex items-center justify-center active:scale-90 transition-transform"
      >
        <Plus size={32} />
      </button>

      {/* Stats Overview */}
      <section className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 mb-12">
        <div className="card-premium !p-5 flex flex-col justify-between h-32 md:h-auto">
          <div className="bg-emerald-100 w-10 h-10 rounded-xl flex items-center justify-center text-emerald-600 mb-2">
            <Wallet size={20} />
          </div>
          <div>
            <p className="text-[10px] md:text-sm text-slate-400 font-bold uppercase tracking-widest">Tiết kiệm</p>
            <p className="text-lg md:text-2xl font-black text-slate-800 leading-tight">{totalSaved.toLocaleString()} đ</p>
          </div>
        </div>
        <div className="card-premium !p-5 flex flex-col justify-between h-32 md:h-auto">
          <div className="bg-blue-100 w-10 h-10 rounded-xl flex items-center justify-center text-blue-600 mb-2">
            <PieChart size={20} />
          </div>
          <div>
            <p className="text-[10px] md:text-sm text-slate-400 font-bold uppercase tracking-widest">Tiến độ</p>
            <p className="text-lg md:text-2xl font-black text-slate-800 leading-tight">{overallProgress.toFixed(1)}%</p>
          </div>
        </div>
        <div className="col-span-2 md:col-span-1 bg-gradient-to-br from-emerald-500 to-teal-600 p-6 rounded-[2rem] shadow-xl shadow-emerald-200 text-white flex flex-col justify-center">
          <p className="text-emerald-100 text-[10px] font-bold uppercase tracking-widest mb-1">Mẹo hay</p>
          <p className="font-bold text-sm md:text-base leading-snug">"Tích tiểu thành đại, tự do tài chính đang gần bạn hơn."</p>
        </div>
      </section>

      {loading ? (
        <div className="flex justify-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-500"></div>
        </div>
      ) : goals.length > 0 ? (
        <div className="grid grid-cols-[repeat(auto-fill,minmax(min(100%,350px),1fr))] gap-8">
          {goals.map((goal: any) => (
            <GoalCard 
              key={goal.id} 
              goal={goal} 
              onDelete={handleDeleteGoal}
              onUpdate={handleUpdateAmount}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-20 bg-slate-50 rounded-3xl border-2 border-dashed border-slate-200">
          <div className="bg-white w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm">
            <Target size={40} className="text-slate-300" />
          </div>
          <h2 className="text-2xl font-bold text-slate-800">Chưa có mục tiêu nào</h2>
          <p className="text-slate-500 mt-2 max-w-sm mx-auto">
            Hãy bắt đầu bằng cách thêm mục tiêu tài chính đầu tiên của bạn để chúng tôi giúp bạn lên kế hoạch.
          </p>
          <button 
            onClick={() => setIsModalOpen(true)}
            className="mt-8 text-emerald-600 font-bold hover:text-emerald-700 underline underline-offset-4"
          >
            Tạo ngay bây giờ
          </button>
        </div>
      )}

      <AddGoalModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onSubmit={handleAddGoal}
      />
    </main>
  );
}
