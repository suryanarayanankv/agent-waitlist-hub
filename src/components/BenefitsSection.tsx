
import React from 'react';
import { Zap, Shield, Cog, Network } from 'lucide-react';

const benefits = [
  {
    icon: Zap,
    title: "Runs in the background, not in your way",
    description: "Your agent works silently while you focus on strategic tasks. No interruptions, no manual monitoring."
  },
  {
    icon: Shield,
    title: "Works with your system—not against it",
    description: "Seamlessly integrates with your existing tools and workflows. No migration headaches or learning curves."
  },
  {
    icon: Cog,
    title: "Custom agents for custom workflows",
    description: "Every business is unique. Your agent adapts to your specific processes and requirements."
  },
  {
    icon: Network,
    title: "Talks to other agents. Automates everything",
    description: "Multi-agent coordination handles complex workflows end-to-end. True autonomous operation."
  }
];

const BenefitsSection: React.FC = () => {
  return (
    <section id="benefits" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Why Choose AutoAgent?
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Built for professionals who need automation that actually works in the real world.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {benefits.map((benefit, index) => (
            <div 
              key={index}
              className="group p-8 rounded-2xl bg-gradient-to-br from-gray-50 to-white border border-gray-200 hover:border-emerald-300 hover:shadow-xl transition-all duration-300"
            >
              <div className="mb-6">
                <div className="w-16 h-16 bg-gradient-to-r from-emerald-500 to-blue-500 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <benefit.icon className="h-8 w-8 text-white" />
                </div>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                {benefit.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {benefit.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BenefitsSection;
