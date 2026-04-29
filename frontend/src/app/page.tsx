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

  const totalTarget = goals.reduce((acc: number, goal: any) => acc + goal.target_amount, 0);
  const totalSaved = goals.reduce((acc: number, goal: any) => acc + goal.current_amount, 0);
  const overallProgress = totalTarget > 0 ? (totalSaved / totalTarget) * 100 : 0;

  return (
    <main className="flex-1 max-w-6xl mx-auto w-full p-6 md:p-10">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
        <div>
          <h1 className="text-4xl font-black text-slate-900 tracking-tight flex items-center gap-3">
            <Target className="text-emerald-500" size={36} />
            Mục Tiêu App
          </h1>
          <p className="text-slate-500 mt-2 text-lg">Quản lý tài chính cá nhân một cách thông minh.</p>
        </div>
        
        <button 
          onClick={() => setIsModalOpen(true)}
          className="btn-primary flex items-center justify-center gap-2 py-3 px-6 text-lg"
        >
          <Plus size={20} /> Thêm mục tiêu
        </button>
      </header>

      {/* Stats Overview */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4">
          <div className="bg-emerald-100 p-3 rounded-xl text-emerald-600">
            <Wallet size={24} />
          </div>
          <div>
            <p className="text-sm text-slate-500 font-medium">Tổng tiết kiệm</p>
            <p className="text-2xl font-bold text-slate-800">{totalSaved.toLocaleString()} đ</p>
          </div>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4">
          <div className="bg-blue-100 p-3 rounded-xl text-blue-600">
            <PieChart size={24} />
          </div>
          <div>
            <p className="text-sm text-slate-500 font-medium">Tiến độ tổng thể</p>
            <p className="text-2xl font-bold text-slate-800">{overallProgress.toFixed(1)}%</p>
          </div>
        </div>
        <div className="bg-emerald-500 p-6 rounded-2xl shadow-lg shadow-emerald-200 text-white flex flex-col justify-between">
          <p className="text-emerald-100 text-sm font-medium">Lời khuyên hôm nay</p>
          <p className="font-semibold text-lg">"Tiết kiệm là bước đầu của tự do tài chính."</p>
        </div>
      </section>

      {loading ? (
        <div className="flex justify-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-500"></div>
        </div>
      ) : goals.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
