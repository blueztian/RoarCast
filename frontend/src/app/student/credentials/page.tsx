import React from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { MOCK_CREDENTIALS } from '@/lib/mockData';
import { Award, QrCode, ShieldCheck } from 'lucide-react';

export default function CredentialsPage() {
  return (
    <div className="max-w-5xl mx-auto mt-8 space-y-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Digital Credentials</h1>
        <p className="text-gray-500 mt-1">QR-Verified achievements for completed Upskilling Modules.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {MOCK_CREDENTIALS.map(cred => (
          <div key={cred.id} className="relative group">
            {/* Credential Card */}
            <Card className="overflow-hidden border-2 border-gray-100 hover:border-blue-300 transition-all duration-300 shadow-sm hover:shadow-md">
              <div className="bg-gradient-to-r from-blue-600 to-blue-800 h-2"></div>
              <CardContent className="p-0">
                <div className="flex flex-col sm:flex-row">
                  {/* Left content */}
                  <div className="p-6 flex-1 border-b sm:border-b-0 sm:border-r border-gray-100">
                    <div className="flex justify-between items-start mb-4">
                      <div className="bg-blue-50 p-3 rounded-xl">
                        <Award className="w-8 h-8 text-blue-600" />
                      </div>
                      <Badge variant={cred.status === 'Verified' ? 'success' : 'default'} className="flex items-center px-3 py-1">
                        {cred.status === 'Verified' && <ShieldCheck className="w-3 h-3 mr-1" />}
                        {cred.status}
                      </Badge>
                    </div>
                    
                    <h2 className="text-xl font-bold text-gray-900 mb-1">{cred.skill}</h2>
                    <p className="text-sm text-gray-500 mb-6">Credential ID: {cred.id}</p>
                    
                    <div className="space-y-3">
                      <div>
                        <p className="text-xs text-gray-400 uppercase tracking-wider font-semibold">Issued By</p>
                        <p className="text-sm font-medium text-gray-800">{cred.issuedBy}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-400 uppercase tracking-wider font-semibold">Issued Date</p>
                        <p className="text-sm font-medium text-gray-800">{cred.issuedDate}</p>
                      </div>
                    </div>
                  </div>
                  
                  {/* Right QR Section */}
                  <div className="p-6 sm:w-48 bg-gray-50 flex flex-col items-center justify-center text-center">
                    <div className="bg-white p-2 rounded-lg shadow-sm border border-gray-200 mb-3">
                      {/* Mock QR Code */}
                      <QrCode className="w-24 h-24 text-gray-800" strokeWidth={1} />
                    </div>
                    <p className="text-xs text-gray-500 font-medium">Scan to Verify</p>
                    <button className="mt-4 text-sm text-blue-600 hover:text-blue-800 font-medium underline">
                      Share to LinkedIn
                    </button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
}
