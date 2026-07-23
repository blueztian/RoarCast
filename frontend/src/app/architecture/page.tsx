import React from 'react';
import { Card, CardContent } from '@/components/ui/Card';

export default function ArchitecturePage() {
  return (
    <div className="max-w-5xl mx-auto mt-12 space-y-12 pb-20">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Autonomous Data Engine</h1>
        <p className="text-xl text-gray-500">Visualizing the flow of workforce intelligence in the RoarCast ecosystem.</p>
      </div>

      <div className="relative">
        
        {/* Source Layer */}
        <div className="flex justify-center gap-8 mb-12">
          <Card className="w-64 border-t-4 border-t-blue-500 shadow-md">
            <CardContent className="p-6 text-center">
              <h3 className="font-bold text-lg mb-2">PEZA Locators</h3>
              <p className="text-xs text-gray-500">Industry partners in Santa Rosa</p>
            </CardContent>
          </Card>
          
          <Card className="w-64 border-t-4 border-t-blue-500 shadow-md">
            <CardContent className="p-6 text-center">
              <h3 className="font-bold text-lg mb-2">Job Postings</h3>
              <p className="text-xs text-gray-500">Live data scraping & API feeds</p>
            </CardContent>
          </Card>
        </div>

        {/* Arrow Down */}
        <div className="flex justify-center mb-12">
          <div className="w-1 bg-gray-300 h-16 relative">
            <div className="absolute -bottom-2 -left-2 w-0 h-0 border-l-8 border-r-8 border-t-8 border-l-transparent border-r-transparent border-t-gray-300"></div>
          </div>
        </div>

        {/* Engine Layer */}
        <div className="flex justify-center mb-12">
          <Card className="w-96 bg-gray-900 text-white shadow-xl transform scale-105">
            <CardContent className="p-8 text-center">
              <h2 className="text-2xl font-bold mb-3 text-blue-400">Autonomous Data Engine</h2>
              <ul className="text-sm text-gray-300 space-y-2 text-left list-disc list-inside">
                <li>Aggregates Industry Skill Tags</li>
                <li>DOLE Labor Market Forecasts</li>
                <li>TESDA Priority Skills</li>
                <li>Real-time Demand Mapping</li>
              </ul>
            </CardContent>
          </Card>
        </div>

        {/* Branching Arrows */}
        <div className="flex justify-center relative h-16 mb-8">
          <div className="absolute top-0 w-3/4 border-t-4 border-gray-300"></div>
          <div className="absolute top-0 left-[12.5%] w-1 bg-gray-300 h-16">
            <div className="absolute -bottom-2 -left-2 w-0 h-0 border-l-8 border-r-8 border-t-8 border-l-transparent border-r-transparent border-t-gray-300"></div>
          </div>
          <div className="absolute top-0 left-1/2 w-1 bg-gray-300 h-16 transform -translate-x-1/2">
            <div className="absolute -bottom-2 -left-2 w-0 h-0 border-l-8 border-r-8 border-t-8 border-l-transparent border-r-transparent border-t-gray-300"></div>
          </div>
          <div className="absolute top-0 right-[12.5%] w-1 bg-gray-300 h-16">
            <div className="absolute -bottom-2 -left-2 w-0 h-0 border-l-8 border-r-8 border-t-8 border-l-transparent border-r-transparent border-t-gray-300"></div>
          </div>
        </div>

        {/* Output Layer */}
        <div className="flex justify-between max-w-4xl mx-auto">
          <Card className="w-64 border-t-4 border-t-indigo-500 shadow-md">
            <CardContent className="p-6 text-center">
              <h3 className="font-bold text-lg mb-2 text-indigo-700">Students</h3>
              <p className="text-sm font-medium">Alignment & Upskilling</p>
              <p className="text-xs text-gray-500 mt-2">Micro-audits, Co-Op Squads, Digital Credentials</p>
            </CardContent>
          </Card>
          
          <Card className="w-64 border-t-4 border-t-emerald-500 shadow-md">
            <CardContent className="p-6 text-center">
              <h3 className="font-bold text-lg mb-2 text-emerald-700">Academe</h3>
              <p className="text-sm font-medium">Curriculum Improvements</p>
              <p className="text-xs text-gray-500 mt-2">Heatmaps, Program Recommendations</p>
            </CardContent>
          </Card>
          
          <Card className="w-64 border-t-4 border-t-purple-500 shadow-md">
            <CardContent className="p-6 text-center">
              <h3 className="font-bold text-lg mb-2 text-purple-700">LGU / PESO</h3>
              <p className="text-sm font-medium">Workforce Planning</p>
              <p className="text-xs text-gray-500 mt-2">Employment Readiness, Training Programs</p>
            </CardContent>
          </Card>
        </div>

      </div>
    </div>
  );
}
