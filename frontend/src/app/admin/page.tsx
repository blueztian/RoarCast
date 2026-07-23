import React from 'react';
import Link from 'next/link';
import { Card, CardContent, CardHeader } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { GraduationCap, Building2, LayoutDashboard } from 'lucide-react';

export default function AdminSelectorPage() {
  return (
    <div className="max-w-4xl mx-auto mt-16 space-y-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">RoarCast Portal</h1>
        <p className="text-xl text-gray-500">Select your organization role to view tailored workforce intelligence.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <Link href="/admin/dashboard" className="group">
          <Card className="h-full border-2 border-transparent hover:border-blue-500 transition-colors cursor-pointer hover:shadow-lg">
            <CardContent className="flex flex-col items-center text-center p-8">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-6 group-hover:bg-blue-200 transition-colors">
                <LayoutDashboard className="w-8 h-8 text-blue-700" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">General Dashboard</h2>
              <p className="text-gray-500 mb-6">Overview of all ecosystem metrics</p>
              <Button variant="outline" className="w-full mt-auto group-hover:bg-blue-50 group-hover:text-blue-700 group-hover:border-blue-300 transition-colors">Enter</Button>
            </CardContent>
          </Card>
        </Link>

        <Link href="/admin/academe" className="group">
          <Card className="h-full border-2 border-transparent hover:border-emerald-500 transition-colors cursor-pointer hover:shadow-lg">
            <CardContent className="flex flex-col items-center text-center p-8">
              <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mb-6 group-hover:bg-emerald-200 transition-colors">
                <GraduationCap className="w-8 h-8 text-emerald-700" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Academe</h2>
              <p className="text-gray-500 mb-6">Universities & Colleges (Curriculum Alignment)</p>
              <Button variant="outline" className="w-full mt-auto group-hover:bg-emerald-50 group-hover:text-emerald-700 group-hover:border-emerald-300 transition-colors">Enter</Button>
            </CardContent>
          </Card>
        </Link>

        <Link href="/admin/peso" className="group">
          <Card className="h-full border-2 border-transparent hover:border-purple-500 transition-colors cursor-pointer hover:shadow-lg">
            <CardContent className="flex flex-col items-center text-center p-8">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mb-6 group-hover:bg-purple-200 transition-colors">
                <Building2 className="w-8 h-8 text-purple-700" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">PESO / LGU</h2>
              <p className="text-gray-500 mb-6">Public Employment Service Office</p>
              <Button variant="outline" className="w-full mt-auto group-hover:bg-purple-50 group-hover:text-purple-700 group-hover:border-purple-300 transition-colors">Enter</Button>
            </CardContent>
          </Card>
        </Link>
      </div>
    </div>
  );
}
