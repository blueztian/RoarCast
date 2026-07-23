import React from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/Card';
import { MOCK_DASHBOARD } from '@/lib/mockData';
import { Users, Award, TrendingUp } from 'lucide-react';

export default function DashboardPage() {
  return (
    <div className="max-w-6xl mx-auto mt-8 space-y-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Ecosystem Dashboard</h1>
        <p className="text-gray-500 mt-1">Real-time workforce intelligence for Santa Rosa PEZA.</p>
      </div>

      {/* Top Level Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardContent className="p-6 flex items-center">
            <div className="p-3 rounded-full bg-blue-100 mr-4">
              <Users className="w-6 h-6 text-blue-700" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Total Students Audited</p>
              <h3 className="text-2xl font-bold text-gray-900">{MOCK_DASHBOARD.totalStudents.toLocaleString()}</h3>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6 flex items-center">
            <div className="p-3 rounded-full bg-green-100 mr-4">
              <Award className="w-6 h-6 text-green-700" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Credentials Issued</p>
              <h3 className="text-2xl font-bold text-gray-900">{MOCK_DASHBOARD.credentialsIssued.toLocaleString()}</h3>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6 flex items-center">
            <div className="p-3 rounded-full bg-purple-100 mr-4">
              <TrendingUp className="w-6 h-6 text-purple-700" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Avg Alignment Score</p>
              <h3 className="text-2xl font-bold text-gray-900">79%</h3>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
        {/* Top Missing Skills (Mock Bar Chart) */}
        <Card>
          <CardHeader>
            <h2 className="text-lg font-bold">Top Missing Skills (Deficit)</h2>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {MOCK_DASHBOARD.topMissingSkills.map((item, index) => (
                <div key={index}>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="font-medium">{item.skill}</span>
                    <span className="text-gray-500">{item.count}</span>
                  </div>
                  <div className="w-full bg-gray-100 rounded-full h-2">
                    <div 
                      className="bg-red-500 h-2 rounded-full" 
                      style={{ width: `${(item.count / 1500) * 100}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Top Hiring Industries (Mock Progress Bars) */}
        <Card>
          <CardHeader>
            <h2 className="text-lg font-bold">Top Hiring Industries</h2>
          </CardHeader>
          <CardContent>
             <div className="space-y-4">
              {MOCK_DASHBOARD.topHiringIndustries.map((item, index) => (
                <div key={index}>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="font-medium">{item.industry}</span>
                    <span className="text-gray-500">{item.percentage}%</span>
                  </div>
                  <div className="w-full bg-gray-100 rounded-full h-2">
                    <div 
                      className="bg-blue-500 h-2 rounded-full" 
                      style={{ width: `${item.percentage}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Alignment by School */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <h2 className="text-lg font-bold">Average Alignment Score by Institution</h2>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Institution</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Avg Alignment Score</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {MOCK_DASHBOARD.alignmentScoresBySchool.map((school, i) => (
                    <tr key={i}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{school.school}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <div className="flex items-center">
                          <span className="mr-2">{school.score}%</span>
                          <div className="w-24 bg-gray-200 rounded-full h-1.5">
                            <div className="bg-emerald-500 h-1.5 rounded-full" style={{width: `${school.score}%`}}></div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {school.score >= 80 ? 
                          <span className="text-emerald-600 font-medium bg-emerald-50 px-2 py-1 rounded">Excellent</span> : 
                          <span className="text-yellow-600 font-medium bg-yellow-50 px-2 py-1 rounded">Needs Review</span>
                        }
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
