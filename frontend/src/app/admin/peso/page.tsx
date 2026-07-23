import React from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { MOCK_PESO_DATA } from '@/lib/mockData';
import { MapPin, Briefcase, GraduationCap } from 'lucide-react';

export default function PESOViewPage() {
  return (
    <div className="max-w-6xl mx-auto mt-8 space-y-6">
      <div className="flex justify-between items-end mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">PESO Dashboard</h1>
          <p className="text-gray-500 mt-1">Labor Market Intermediation & Community Training.</p>
        </div>
        
        <div className="flex space-x-4">
          <select className="border-gray-300 rounded-md shadow-sm text-sm p-2 focus:ring-purple-500 focus:border-purple-500">
            <option>All Barangays</option>
            <option>Balibago</option>
            <option>Dita</option>
            <option>Macabling</option>
          </select>
          <select className="border-gray-300 rounded-md shadow-sm text-sm p-2 focus:ring-purple-500 focus:border-purple-500">
            <option>All Industrial Zones</option>
            <option>Laguna Technopark</option>
            <option>Carmelray</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-purple-600 text-white border-none">
          <CardContent className="p-6">
            <p className="text-purple-100 font-medium mb-1">City Employment Readiness Index</p>
            <div className="flex items-end">
              <span className="text-5xl font-extrabold">{MOCK_PESO_DATA.employmentReadiness}</span>
              <span className="text-xl ml-1 mb-1">/100</span>
            </div>
            <p className="text-purple-200 text-sm mt-4">Based on micro-audits & active job postings.</p>
          </CardContent>
        </Card>

        <Card className="md:col-span-2">
          <CardHeader>
            <h2 className="text-lg font-bold flex items-center">
              <MapPin className="w-5 h-5 mr-2 text-purple-600" />
              Youth Distribution by Barangay
            </h2>
          </CardHeader>
          <CardContent>
            <div className="flex justify-around items-end h-32 mt-4">
              {MOCK_PESO_DATA.youthDistribution.map((brgy) => {
                const height = `${(brgy.count / 3000) * 100}%`;
                return (
                  <div key={brgy.barangay} className="flex flex-col items-center w-1/4">
                    <div className="text-xs text-gray-500 font-medium mb-2">{brgy.count.toLocaleString()}</div>
                    <div 
                      className="w-12 bg-purple-200 rounded-t-md hover:bg-purple-400 transition-colors cursor-pointer"
                      style={{ height: height }}
                    ></div>
                    <div className="text-xs font-semibold text-gray-700 mt-2">{brgy.barangay}</div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Available Training */}
        <Card className="md:col-span-3">
          <CardHeader className="flex justify-between items-center flex-row">
            <h2 className="text-lg font-bold flex items-center">
              <Briefcase className="w-5 h-5 mr-2 text-purple-600" />
              Recommended Intervention Programs
            </h2>
            <Button variant="outline" size="sm">Add New Program</Button>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {MOCK_PESO_DATA.availableTraining.map((training, i) => (
                <div key={i} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                  <GraduationCap className="w-8 h-8 text-gray-400 mb-3" />
                  <h3 className="font-semibold text-gray-900 mb-2">{training}</h3>
                  <div className="flex justify-between items-center mt-4">
                    <Badge variant="default">Enrolling</Badge>
                    <button className="text-purple-600 text-sm font-medium hover:underline">Manage</button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
