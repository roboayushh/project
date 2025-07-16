'use client';

import { useState, useEffect } from 'react';
import DashboardLayout from '@/components/DashboardLayout';

export default function Dashboard() {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [userName] = useState('John'); // This would come from user data

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const getGreeting = () => {
    const hour = currentTime.getHours();
    if (hour < 12) return 'Good Morning';
    if (hour < 18) return 'Good Afternoon';
    return 'Good Evening';
  };

  const formatDate = (date) => {
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  // Mock data
  const tasksPending = 12;
  const totalProjects = 5;
  const tasksToday = [
    { name: 'Review design mockups', project: 'Website Redesign', priority: 'High' },
    { name: 'Update database schema', project: 'Database Migration', priority: 'Medium' },
    { name: 'Team standup meeting', project: 'Mobile App Development', priority: 'Low' },
  ];

  const projectProgress = [
    { name: 'Website Redesign', progress: 75 },
    { name: 'Mobile App Development', progress: 45 },
    { name: 'Marketing Campaign', progress: 90 },
    { name: 'Database Migration', progress: 30 },
  ];

  return (
    <DashboardLayout>
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-2xl text-gray-400 mb-2">{formatDate(currentTime)}</h1>
          <h2 className="text-4xl font-bold text-white mb-8">
            {getGreeting()}, {userName}!
          </h2>
        </div>

        {/* Circular Stats */}
        <div className="flex justify-center space-x-12 mb-12">
          <div className="text-center">
            <div className="w-32 h-32 rounded-full border-8 border-orange-500 flex items-center justify-center mb-4">
              <div className="text-center">
                <div className="text-3xl font-bold text-white">{tasksPending}</div>
                <div className="text-sm text-gray-400">Tasks</div>
              </div>
            </div>
            <p className="text-gray-300">Tasks Pending</p>
          </div>

          <div className="text-center">
            <div className="w-32 h-32 rounded-full border-8 border-blue-500 flex items-center justify-center mb-4">
              <div className="text-center">
                <div className="text-3xl font-bold text-white">{totalProjects}</div>
                <div className="text-sm text-gray-400">Projects</div>
              </div>
            </div>
            <p className="text-gray-300">Active Projects</p>
          </div>
        </div>

        {/* Cards Section */}
        <div className="grid md:grid-cols-2 gap-8">
          {/* Tasks Due Today */}
          <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
            <h3 className="text-xl font-semibold text-white mb-4">Tasks Due Today</h3>
            <div className="space-y-3">
              {tasksToday.map((task, index) => (
                <div key={index} className="bg-gray-700 rounded-lg p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="text-white font-medium">{task.name}</h4>
                    <span className={`px-2 py-1 rounded text-xs ${
                      task.priority === 'High' ? 'bg-red-600 text-white' :
                      task.priority === 'Medium' ? 'bg-yellow-600 text-white' :
                      'bg-green-600 text-white'
                    }`}>
                      {task.priority}
                    </span>
                  </div>
                  <p className="text-gray-400 text-sm">{task.project}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Progress Per Project */}
          <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
            <h3 className="text-xl font-semibold text-white mb-4">Progress Per Project</h3>
            <div className="space-y-4">
              {projectProgress.map((project, index) => (
                <div key={index}>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-white">{project.name}</span>
                    <span className="text-gray-400">{project.progress}%</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div
                      className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${project.progress}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}