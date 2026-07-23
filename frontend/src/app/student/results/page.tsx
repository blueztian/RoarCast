import React from 'react';
import Link from 'next/link';
import { Card, CardContent, CardHeader } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { MOCK_STUDENT, MOCK_INDUSTRIES } from '@/lib/mockData';
import { CheckCircle, XCircle } from 'lucide-react';

export default function ResultsPage() {
  return (
    <div className="max-w-4xl mx-auto mt-8 space-y-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Alignment Results</h1>
        <Link href="/student/coop-squad">
          <Button>View Upskilling Squad</Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Score Card */}
        <Card className="md:col-span-1 flex flex-col justify-center items-center py-8">
          <CardHeader>
            <h2 className="text-lg font-medium text-gray-500 text-center">Alignment Score</h2>
          </CardHeader>
          <CardContent className="flex flex-col items-center">
            <div className="text-6xl font-extrabold text-blue-600">{MOCK_STUDENT.alignmentScore}%</div>
            <p className="mt-4 text-sm text-gray-500 text-center">Based on current industry demand in Santa Rosa PEZA</p>
          </CardContent>
        </Card>

        {/* Skills Breakdown */}
        <Card className="md:col-span-2">
          <CardHeader>
            <h2 className="text-xl font-bold">Skill Match Summary</h2>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <h3 className="text-sm font-medium text-gray-500 mb-3 uppercase tracking-wider flex items-center">
                <CheckCircle className="w-4 h-4 mr-2 text-green-500" /> 
                Matched Skills
              </h3>
              <div className="flex flex-wrap gap-2">
                {MOCK_STUDENT.matchedSkills.map(skill => (
                  <Badge key={skill} variant="success" className="px-3 py-1 text-sm">{skill}</Badge>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-sm font-medium text-gray-500 mb-3 uppercase tracking-wider flex items-center">
                <XCircle className="w-4 h-4 mr-2 text-red-500" />
                Missing Skills
              </h3>
              <div className="flex flex-wrap gap-2">
                {MOCK_STUDENT.missingSkills.map(skill => (
                  <Badge key={skill} variant="error" className="px-3 py-1 text-sm">{skill}</Badge>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Industry Demand */}
        <Card className="md:col-span-3">
          <CardHeader>
            <h2 className="text-xl font-bold">Industry Demand Snapshot</h2>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 mb-4">Your missing skills are highly requested by locators in the ecosystem:</p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {MOCK_INDUSTRIES.map(industry => (
                <div key={industry} className="bg-gray-50 p-4 rounded-lg border text-center font-medium text-gray-800">
                  {industry}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
