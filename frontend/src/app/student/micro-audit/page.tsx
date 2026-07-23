"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/Button';
import { Card, CardContent, CardHeader } from '@/components/ui/Card';
import { ProgressBar } from '@/components/ui/ProgressBar';

const QUESTIONS = [
  {
    id: 1,
    question: "Which version control system are you most comfortable with?",
    options: ["Git (GitHub/GitLab)", "SVN", "None", "Other"]
  },
  {
    id: 2,
    question: "What is your primary programming language for backend development?",
    options: ["Java", "Python", "Node.js (JavaScript/TypeScript)", "PHP", "C#"]
  },
  {
    id: 3,
    question: "Have you worked with Agile/Scrum methodologies in your academic projects?",
    options: ["Yes, regularly", "Only theoretically", "No"]
  },
  {
    id: 4,
    question: "Are you familiar with Enterprise Resource Planning (ERP) concepts (e.g., SAP)?",
    options: ["Yes, practical experience", "Yes, theoretical knowledge", "No"]
  },
  {
    id: 5,
    question: "What type of database do you use most often?",
    options: ["Relational (MySQL/PostgreSQL)", "NoSQL (MongoDB/Firebase)", "None"]
  }
];

export default function MicroAuditPage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedProgram, setSelectedProgram] = useState('');
  
  const progress = Math.round((currentStep / QUESTIONS.length) * 100);

  const handleNext = () => {
    if (currentStep < QUESTIONS.length) {
      setCurrentStep(curr => curr + 1);
    } else {
      router.push('/student/results');
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(curr => curr - 1);
    }
  };

  if (currentStep === 0) {
    return (
      <div className="max-w-2xl mx-auto mt-10">
        <Card>
          <CardHeader>
            <h2 className="text-2xl font-bold">Start Micro-Audit</h2>
            <p className="text-gray-500 mt-2">Select your degree program to tailor the assessment.</p>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {['BS Computer Science', 'BS Computer Engineering', 'BS Information Technology'].map(program => (
                <label key={program} className="flex items-center space-x-3 p-4 border rounded cursor-pointer hover:bg-gray-50">
                  <input 
                    type="radio" 
                    name="program" 
                    value={program} 
                    onChange={(e) => setSelectedProgram(e.target.value)}
                    className="h-4 w-4 text-blue-600" 
                  />
                  <span className="text-gray-900">{program}</span>
                </label>
              ))}
              <div className="pt-4 flex justify-end">
                <Button onClick={handleNext} disabled={!selectedProgram}>Start Assessment</Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  const question = QUESTIONS[currentStep - 1];

  return (
    <div className="max-w-2xl mx-auto mt-10">
      <Card>
        <CardHeader>
          <ProgressBar progress={progress} label={`Question ${currentStep} of ${QUESTIONS.length}`} />
          <h2 className="text-xl font-bold mt-6">{question.question}</h2>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {question.options.map(option => (
              <label key={option} className="flex items-center space-x-3 p-4 border rounded cursor-pointer hover:bg-gray-50">
                <input type="radio" name={`question-${question.id}`} className="h-4 w-4 text-blue-600" />
                <span className="text-gray-900">{option}</span>
              </label>
            ))}
          </div>
          <div className="mt-8 flex justify-between">
            <Button variant="outline" onClick={handlePrev}>Previous</Button>
            <Button onClick={handleNext}>{currentStep === QUESTIONS.length ? 'Submit' : 'Next'}</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
