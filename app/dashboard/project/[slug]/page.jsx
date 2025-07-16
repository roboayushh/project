'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import DashboardLayout from '@/components/DashboardLayout';

export default function ProjectPage() {
  const params = useParams();
  const [activeTab, setActiveTab] = useState('overview');
  
  // Convert slug back to project name
  const projectName = params.slug.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());

  return (
    <DashboardLayout>
      <div className="max-w-6xl mx-auto">
        {/* Project Header */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-white mb-4">{projectName}</h1>
          
          {/* Sticky Navigation */}
          <div className="bg-gray-800 rounded-lg border border-gray-700 p-1 inline-flex">
            <button
              onClick={() => setActiveTab('overview')}
              className={`px-6 py-2 rounded-md transition-colors ${
                activeTab === 'overview'
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-300 hover:text-white hover:bg-gray-700'
              }`}
            >
              Overview
            </button>
            <button
              onClick={() => setActiveTab('list')}
              className={`px-6 py-2 rounded-md transition-colors ${
                activeTab === 'list'
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-300 hover:text-white hover:bg-gray-700'
              }`}
            >
              List
            </button>
          </div>
        </div>

        {/* Tab Content */}
        {activeTab === 'overview' && (
          <div>
            <Link
              href={`/dashboard/project/${params.slug}/overview`}
              className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Go to Overview
            </Link>
          </div>
        )}

        {activeTab === 'list' && (
          <div>
            <Link
              href={`/dashboard/project/${params.slug}/list`}
              className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Go to Task List
            </Link>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}