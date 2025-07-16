'use client';

import { useState } from 'react';
import { useParams } from 'next/navigation';
import DashboardLayout from '@/components/DashboardLayout';
import { Plus, Filter, ArrowUpDown, ChevronDown } from 'lucide-react';

export default function ProjectTaskList() {
  const params = useParams();
  const projectName = params.slug.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
  
  const [tasks, setTasks] = useState([
    { id: 1, name: 'Design homepage mockup', description: 'Create wireframes and mockups', dueDate: '2025-01-15', priority: 'High', status: 'On track', section: 'Design' },
    { id: 2, name: 'Set up database', description: 'Configure PostgreSQL database', dueDate: '2025-01-20', priority: 'Medium', status: 'At risk', section: 'Development' },
    { id: 3, name: 'Write project documentation', description: 'Document API endpoints', dueDate: '2025-01-25', priority: 'Low', status: 'On track', section: 'Documentation' },
  ]);

  const [sections, setSections] = useState(['Design', 'Development', 'Documentation']);
  const [newSectionName, setNewSectionName] = useState('');
  const [showAddSection, setShowAddSection] = useState(false);
  const [filterOpen, setFilterOpen] = useState(false);
  const [sortOpen, setSortOpen] = useState(false);

  const addTask = () => {
    const newTask = {
      id: Date.now(),
      name: '',
      description: '',
      dueDate: '',
      priority: 'Medium',
      status: 'On track',
      section: sections[0] || 'Default'
    };
    setTasks([...tasks, newTask]);
  };

  const addSection = () => {
    if (newSectionName.trim()) {
      setSections([...sections, newSectionName.trim()]);
      setNewSectionName('');
      setShowAddSection(false);
    }
  };

  const updateTask = (id, field, value) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, [field]: value } : task
    ));
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const getTasksBySection = (section) => {
    return tasks.filter(task => task.section === section);
  };

  return (
    <DashboardLayout>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-white">{projectName} - Tasks</h1>
          
          <div className="flex space-x-4">
            {/* Filter Dropdown */}
            <div className="relative">
              <button
                onClick={() => setFilterOpen(!filterOpen)}
                className="flex items-center space-x-2 bg-gray-800 text-white px-4 py-2 rounded-lg border border-gray-600 hover:bg-gray-700 transition-colors"
              >
                <Filter size={16} />
                <span>Filter</span>
                <ChevronDown size={16} />
              </button>
              
              {filterOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-gray-800 rounded-lg shadow-lg border border-gray-700 py-2 z-10">
                  <button className="w-full text-left px-4 py-2 text-gray-300 hover:bg-gray-700 hover:text-white">Incomplete</button>
                  <button className="w-full text-left px-4 py-2 text-gray-300 hover:bg-gray-700 hover:text-white">Complete</button>
                  <button className="w-full text-left px-4 py-2 text-gray-300 hover:bg-gray-700 hover:text-white">Due this week</button>
                  <button className="w-full text-left px-4 py-2 text-gray-300 hover:bg-gray-700 hover:text-white">Due next week</button>
                </div>
              )}
            </div>

            {/* Sort Dropdown */}
            <div className="relative">
              <button
                onClick={() => setSortOpen(!sortOpen)}
                className="flex items-center space-x-2 bg-gray-800 text-white px-4 py-2 rounded-lg border border-gray-600 hover:bg-gray-700 transition-colors"
              >
                <ArrowUpDown size={16} />
                <span>Sort</span>
                <ChevronDown size={16} />
              </button>
              
              {sortOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-gray-800 rounded-lg shadow-lg border border-gray-700 py-2 z-10">
                  <button className="w-full text-left px-4 py-2 text-gray-300 hover:bg-gray-700 hover:text-white">Start date</button>
                  <button className="w-full text-left px-4 py-2 text-gray-300 hover:bg-gray-700 hover:text-white">Due date</button>
                  <button className="w-full text-left px-4 py-2 text-gray-300 hover:bg-gray-700 hover:text-white">Priority</button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Add Task Button */}
        <button
          onClick={addTask}
          className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors mb-6"
        >
          <Plus size={16} />
          <span>Add Task</span>
        </button>

        {/* Tasks Grid */}
        <div className="bg-gray-800 rounded-lg border border-gray-700 overflow-hidden mb-8">
          {/* Header */}
          <div className="grid grid-cols-6 gap-4 p-4 bg-gray-700 border-b border-gray-600">
            <div className="text-gray-300 font-medium">Name</div>
            <div className="text-gray-300 font-medium">Description</div>
            <div className="text-gray-300 font-medium">Due Date</div>
            <div className="text-gray-300 font-medium">Priority</div>
            <div className="text-gray-300 font-medium">Status</div>
            <div className="text-gray-300 font-medium">Actions</div>
          </div>

          {/* Sections */}
          {sections.map((section) => (
            <div key={section}>
              <div className="bg-gray-750 px-4 py-2 border-b border-gray-600">
                <h3 className="text-white font-semibold">{section}</h3>
              </div>
              
              {getTasksBySection(section).map((task) => (
                <div key={task.id} className="grid grid-cols-6 gap-4 p-4 border-b border-gray-700 hover:bg-gray-750">
                  <input
                    type="text"
                    value={task.name}
                    onChange={(e) => updateTask(task.id, 'name', e.target.value)}
                    className="bg-transparent text-white border-none outline-none"
                    placeholder="Task name"
                  />
                  <input
                    type="text"
                    value={task.description}
                    onChange={(e) => updateTask(task.id, 'description', e.target.value)}
                    className="bg-transparent text-white border-none outline-none"
                    placeholder="Description"
                  />
                  <input
                    type="date"
                    value={task.dueDate}
                    onChange={(e) => updateTask(task.id, 'dueDate', e.target.value)}
                    className="bg-transparent text-white border-none outline-none"
                  />
                  <select
                    value={task.priority}
                    onChange={(e) => updateTask(task.id, 'priority', e.target.value)}
                    className="bg-gray-700 text-white border border-gray-600 rounded px-2 py-1"
                  >
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                  </select>
                  <select
                    value={task.status}
                    onChange={(e) => updateTask(task.id, 'status', e.target.value)}
                    className="bg-gray-700 text-white border border-gray-600 rounded px-2 py-1"
                  >
                    <option value="On track">On track</option>
                    <option value="At risk">At risk</option>
                    <option value="Off track">Off track</option>
                  </select>
                  <button
                    onClick={() => deleteTask(task.id)}
                    className="text-red-400 hover:text-red-300 transition-colors"
                  >
                    Delete
                  </button>
                </div>
              ))}
            </div>
          ))}
        </div>

        {/* Add Section */}
        <div className="mb-4">
          {showAddSection ? (
            <div className="flex items-center space-x-4">
              <input
                type="text"
                value={newSectionName}
                onChange={(e) => setNewSectionName(e.target.value)}
                placeholder="Section name"
                className="bg-gray-800 text-white px-3 py-2 rounded-lg border border-gray-600 focus:border-blue-500 focus:outline-none"
              />
              <button
                onClick={addSection}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Add
              </button>
              <button
                onClick={() => setShowAddSection(false)}
                className="text-gray-400 hover:text-white transition-colors"
              >
                Cancel
              </button>
            </div>
          ) : (
            <button
              onClick={() => setShowAddSection(true)}
              className="flex items-center space-x-2 text-blue-400 hover:text-blue-300 transition-colors"
            >
              <Plus size={16} />
              <span>Add Section</span>
            </button>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}