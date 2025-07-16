'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import DashboardLayout from '@/components/DashboardLayout';

export default function NewProject() {
  const [projectName, setProjectName] = useState('');
  const [projectDescription, setProjectDescription] = useState('');
  const router = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (projectName.trim()) {
      // In a real app, you'd save this to a database
      const projectSlug = projectName.toLowerCase().replace(/\s+/g, '-');
      router.push(`/dashboard/project/${projectSlug}`);
    }
  };

  return (
    <DashboardLayout>
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-white mb-8">Create New Project</h1>
        
        <div className="grid md:grid-cols-2 gap-12">
          {/* Left - Form */}
          <div className="bg-gray-800 rounded-lg p-8 border border-gray-700">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="projectName" className="block text-sm font-medium text-gray-300 mb-2">
                  Project Name *
                </label>
                <input
                  type="text"
                  id="projectName"
                  value={projectName}
                  onChange={(e) => setProjectName(e.target.value)}
                  required
                  className="w-full bg-gray-700 text-white px-4 py-3 rounded-lg border border-gray-600 focus:border-blue-500 focus:outline-none"
                  placeholder="Enter project name"
                />
              </div>

              <div>
                <label htmlFor="projectDescription" className="block text-sm font-medium text-gray-300 mb-2">
                  Project Description
                </label>
                <textarea
                  id="projectDescription"
                  value={projectDescription}
                  onChange={(e) => setProjectDescription(e.target.value)}
                  rows={4}
                  className="w-full bg-gray-700 text-white px-4 py-3 rounded-lg border border-gray-600 focus:border-blue-500 focus:outline-none resize-none"
                  placeholder="Describe your project..."
                />
              </div>

              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors font-medium"
              >
                Create Project
              </button>
            </form>
          </div>

          {/* Right - Image */}
          <div className="flex items-center justify-center">
            <div className="bg-gray-800 rounded-lg p-8 border border-gray-700">
              <img
                src="https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=600"
                alt="Project management illustration"
                className="w-full h-80 object-cover rounded-lg"
              />
              <div className="mt-6 text-center">
                <h3 className="text-xl font-semibold text-white mb-2">Start Your Journey</h3>
                <p className="text-gray-400">
                  Create a new project and begin organizing your tasks, collaborating with your team, 
                  and tracking progress all in one place.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}