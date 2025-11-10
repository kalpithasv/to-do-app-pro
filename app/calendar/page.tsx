'use client';

import { useState, useEffect } from 'react';
import { useStore } from '@/lib/store';
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon } from 'lucide-react';
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isSameDay, addMonths, subMonths } from 'date-fns';
import TaskCard from '@/components/TaskCard';
import AnimatedIcon from '@/components/AnimatedIcon';

export default function CalendarPage() {
  const { tasks, initialize } = useStore();
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  useEffect(() => {
    initialize();
  }, [initialize]);

  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(currentDate);
  const daysInMonth = eachDayOfInterval({ start: monthStart, end: monthEnd });

  const getTasksForDate = (date: Date) => {
    return tasks.filter((task) => {
      if (!task.dueDate || task.archived) return false;
      const taskDate = new Date(task.dueDate);
      return isSameDay(taskDate, date);
    });
  };

  const previousMonth = () => setCurrentDate(subMonths(currentDate, 1));
  const nextMonth = () => setCurrentDate(addMonths(currentDate, 1));

  const selectedDateTasks = selectedDate ? getTasksForDate(selectedDate) : [];

  return (
    <div className="w-full max-w-md mx-auto bg-white min-h-screen rounded-t-3xl shadow-2xl overflow-hidden">
      <div className="p-4 sm:p-6 pb-20 sm:pb-24">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <AnimatedIcon icon={CalendarIcon} size={36} color="#5f33e1" />
            <h1 className="text-3xl font-bold text-gray-800">Calendar</h1>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={previousMonth} className="p-2 hover:bg-gray-100 rounded-xl">
              <ChevronLeft size={20} />
            </button>
            <button onClick={nextMonth} className="p-2 hover:bg-gray-100 rounded-xl">
              <ChevronRight size={20} />
            </button>
          </div>
        </div>

        {/* Month Header */}
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">{format(currentDate, 'MMMM yyyy')}</h2>
        </div>

        {/* Calendar Grid */}
        <div className="grid grid-cols-7 gap-2 mb-6">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
            <div key={day} className="text-center text-sm font-semibold text-gray-600 py-2">
              {day}
            </div>
          ))}
          {daysInMonth.map((day) => {
            const dayTasks = getTasksForDate(day);
            const isSelected = selectedDate && isSameDay(day, selectedDate);
            const isToday = isSameDay(day, new Date());
            const isCurrentMonth = isSameMonth(day, currentDate);

            return (
              <button
                key={day.toISOString()}
                onClick={() => setSelectedDate(day)}
                className={`p-2 rounded-xl text-sm font-semibold transition-all ${
                  isSelected
                    ? 'bg-[#5f33e1] text-white'
                    : isToday
                    ? 'bg-[#ebe4ff] text-[#5f33e1]'
                    : isCurrentMonth
                    ? 'bg-gray-50 text-gray-800 hover:bg-gray-100'
                    : 'bg-gray-100 text-gray-400'
                }`}
              >
                <div>{format(day, 'd')}</div>
                {dayTasks.length > 0 && (
                  <div className="text-xs mt-1 opacity-75">{dayTasks.length}</div>
                )}
              </button>
            );
          })}
        </div>

        {/* Selected Date Tasks */}
        {selectedDate && (
          <div className="mt-6">
            <h3 className="text-lg font-bold text-gray-800 mb-4">
              Tasks for {format(selectedDate, 'MMMM dd, yyyy')}
            </h3>
            {selectedDateTasks.length > 0 ? (
              <div className="space-y-3">
                {selectedDateTasks.map((task) => (
                  <TaskCard key={task.id} task={task} />
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-12">
                <AnimatedIcon icon={CalendarIcon} size={64} color="#5f33e1" />
                <p className="text-gray-500 text-center mt-4">No tasks for this date</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

