import React from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { MOCK_ACADEME_RECOMMENDATIONS } from '@/lib/mockData';
import { Lightbulb, AlertTriangle } from 'lucide-react';

export default function AcademeViewPage() {
  return (
    <div className="max-w-6xl mx-auto mt-8 space-y-6">
      <div className="flex justify-between items-end mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Academe Dashboard</h1>
          <p className="text-gray-500 mt-1">Curriculum Alignment & Institutional Intelligence.</p>
        </div>
        
        <div className="flex space-x-4">
          <select className="border-gray-300 rounded-md shadow-sm text-sm p-2 focus:ring-emerald-500 focus:border-emerald-500">
            <option>All Programs</option>
            <option>BS Computer Science</option>
            <option>BS Industrial Engineering</option>
            <option>BS Information Technology</option>
          </select>
          <select className="border-gray-300 rounded-md shadow-sm text-sm p-2 focus:ring-emerald-500 focus:border-emerald-500">
            <option>All Year Levels</option>
            <option>1st Year</option>
            <option>2nd Year</option>
            <option>3rd Year</option>
            <option>4th Year</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Alerts / Insights */}
        <div className="lg:col-span-1 space-y-6">
          <Card className="border-l-4 border-l-amber-500">
            <CardHeader className="pb-2">
              <h2 className="text-lg font-bold flex items-center text-amber-900">
                <AlertTriangle className="w-5 h-5 mr-2 text-amber-500" />
                Critical Skill Gaps
              </h2>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-700 mb-4">
                Currently, <strong>65%</strong> of graduating students lack required SAP knowledge demanded by locators.
              </p>
              <div className="flex flex-wrap gap-2">
                <Badge variant="error">SAP</Badge>
                <Badge variant="error">PLC Programming</Badge>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Curriculum Recommendations */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <h2 className="text-lg font-bold flex items-center">
              <Lightbulb className="w-5 h-5 mr-2 text-emerald-500" />
              Curriculum Recommendations
            </h2>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {MOCK_ACADEME_RECOMMENDATIONS.map((rec, i) => (
                <div key={i} className="p-4 border border-gray-100 rounded-lg bg-emerald-50/30">
                  <h3 className="font-semibold text-gray-900 mb-2">{rec.program}</h3>
                  <p className="text-gray-700 text-sm leading-relaxed">{rec.recommendation}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Mock Heatmap */}
        <Card className="lg:col-span-3 mt-4">
          <CardHeader>
            <h2 className="text-lg font-bold">Skill Supply vs. Industry Demand (Heatmap)</h2>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200 text-sm text-center">
                <thead>
                  <tr>
                    <th className="px-4 py-3 bg-gray-50 text-left font-medium text-gray-500 uppercase">Skill Area</th>
                    <th className="px-4 py-3 bg-gray-50 font-medium text-gray-500 uppercase">Current Supply</th>
                    <th className="px-4 py-3 bg-gray-50 font-medium text-gray-500 uppercase">Industry Demand</th>
                    <th className="px-4 py-3 bg-gray-50 font-medium text-gray-500 uppercase">Variance</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  <tr>
                    <td className="px-4 py-3 text-left font-medium">Cloud Computing</td>
                    <td className="px-4 py-3 bg-red-100 text-red-800 font-bold">Low</td>
                    <td className="px-4 py-3 bg-green-100 text-green-800 font-bold">High</td>
                    <td className="px-4 py-3 text-red-600 font-bold">-60% Deficit</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 text-left font-medium">Agile Methodology</td>
                    <td className="px-4 py-3 bg-green-100 text-green-800 font-bold">High</td>
                    <td className="px-4 py-3 bg-green-100 text-green-800 font-bold">High</td>
                    <td className="px-4 py-3 text-gray-500">Aligned</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 text-left font-medium">Basic Programming</td>
                    <td className="px-4 py-3 bg-green-100 text-green-800 font-bold">High</td>
                    <td className="px-4 py-3 bg-yellow-100 text-yellow-800 font-bold">Medium</td>
                    <td className="px-4 py-3 text-green-600">+20% Surplus</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
