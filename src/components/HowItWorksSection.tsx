
import React from 'react';
import { MessageSquare, Bot, CheckCircle } from 'lucide-react';

const steps = [
  {
    icon: MessageSquare,
    title: "Tell us what you want",
    description: "Describe your workflow challenges and automation goals. Our team understands your unique needs.",
    color: "from-blue-500 to-indigo-500"
  },
  {
    icon: Bot,
    title: "We create or deploy the right agent",
    description: "Our experts build custom agents tailored to your processes, or configure existing solutions.",
    color: "from-emerald-500 to-teal-500"
  },
  {
    icon: CheckCircle,
    title: "It runs quietly and gets things done",
    description: "Your agent executes tasks autonomously, learns from patterns, and improves over time.",
    color: "from-purple-500 to-pink-500"
  }
];

const HowItWorksSection: React.FC = () => {
  return (
    <section id="how-it-works" className="py-24 bg-gradient-to-br from-gray-50 to-emerald-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            How It Works
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            From concept to autonomous execution in three simple steps.
          </p>
        </div>

        <div className="relative">
          {/* Connection Lines */}
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-500 via-emerald-500 to-purple-500 transform -translate-y-1/2"></div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-8">
            {steps.map((step, index) => (
              <div key={index} className="relative">
                {/* Step Number */}
                <div className="flex justify-center mb-8">
                  <div className={`w-20 h-20 rounded-full bg-gradient-to-r ${step.color} flex items-center justify-center text-white font-bold text-2xl shadow-lg`}>
                    {index + 1}
                  </div>
                </div>
                
                {/* Content */}
                <div className="text-center">
                  <div className="flex justify-center mb-6">
                    <div className={`w-16 h-16 bg-gradient-to-r ${step.color} rounded-2xl flex items-center justify-center`}>
                      <step.icon className="h-8 w-8 text-white" />
                    </div>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">
                    {step.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed max-w-sm mx-auto">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
