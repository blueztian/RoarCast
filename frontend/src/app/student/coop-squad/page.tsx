import React from 'react';
import Link from 'next/link';
import { Card, CardContent, CardHeader } from '@/components/ui/Card';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { Button } from '@/components/ui/Button';
import { MOCK_SQUAD } from '@/lib/mockData';
import { Users, CheckSquare, Square, Clock } from 'lucide-react';

export default function CoopSquadPage() {
  const completedModules = MOCK_SQUAD.modules.filter(m => m.completed).length;
  const progress = Math.round((completedModules / MOCK_SQUAD.modules.length) * 100);

  return (
    <div className="max-w-4xl mx-auto mt-8 space-y-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Co-Op Upskilling Squad</h1>
          <p className="text-gray-500 mt-1">Automatically assigned peer-learning group based on missing skills.</p>
        </div>
        <Link href="/student/credentials">
          <Button variant="outline">View Credentials</Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Squad Details */}
        <Card className="md:col-span-1">
          <CardHeader className="bg-blue-50 border-b border-blue-100">
            <h2 className="text-xl font-bold text-blue-900 flex items-center">
              <Users className="w-5 h-5 mr-2" />
              {MOCK_SQUAD.name}
            </h2>
          </CardHeader>
          <CardContent>
            <h3 className="text-sm font-semibold text-gray-500 uppercase mb-4">Members</h3>
            <ul className="space-y-3">
              {MOCK_SQUAD.members.map(member => (
                <li key={member.name} className="flex items-center space-x-3">
                  <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-bold text-sm">
                    {member.name.charAt(0)}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">{member.name}</p>
                    <p className="text-xs text-gray-500">{member.role}</p>
                  </div>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        {/* Modules */}
        <Card className="md:col-span-2">
          <CardHeader>
            <h2 className="text-xl font-bold">Module Checklist</h2>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="bg-gray-50 p-4 rounded-lg border flex items-center justify-between">
              <div className="flex-1 mr-4">
                <ProgressBar progress={progress} label="Squad Progress" />
              </div>
              <div className="flex items-center text-sm font-medium text-gray-600 bg-white px-3 py-1 rounded border shadow-sm">
                <Clock className="w-4 h-4 mr-1 text-blue-500" />
                Est: {MOCK_SQUAD.estimatedCompletion}
              </div>
            </div>

            <div className="space-y-2">
              {MOCK_SQUAD.modules.map(module => (
                <div key={module.name} className={`flex items-center p-4 border rounded-lg transition-colors ${module.completed ? 'bg-green-50/50 border-green-200' : 'bg-white hover:bg-gray-50'}`}>
                  {module.completed ? (
                    <CheckSquare className="w-6 h-6 text-green-500 mr-3 flex-shrink-0" />
                  ) : (
                    <Square className="w-6 h-6 text-gray-300 mr-3 flex-shrink-0" />
                  )}
                  <span className={`text-base font-medium ${module.completed ? 'text-gray-900 line-through decoration-gray-400' : 'text-gray-900'}`}>
                    {module.name}
                  </span>
                </div>
              ))}
            </div>
            
            <div className="pt-4 flex justify-end">
              <Button>Start Next Module</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
