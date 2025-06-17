
import React from 'react';
import { Clock, Zap, Shield, TrendingUp } from 'lucide-react';

const BenefitsSection = () => {
  const benefits = [
    {
      icon: Clock,
      title: "Save 10+ Hours Weekly",
      description: "Automate repetitive tasks and focus on strategic work that drives real growth."
    },
    {
      icon: Zap,
      title: "Lightning Fast Setup",
      description: "Get your first automation running in under 5 minutes with our intuitive interface."
    },
    {
      icon: Shield,
      title: "Enterprise Security",
      description: "Bank-grade encryption and compliance standards keep your data protected."
    },
    {
      icon: TrendingUp,
      title: "Scale Without Limits",
      description: "Handle increasing workloads effortlessly as your business grows."
    }
  ];

  return (
    <section id="benefits" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Why Choose Axiom?
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Join thousands of professionals who've transformed their workflows with intelligent automation
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon;
            return (
              <div key={index} className="text-center group">
                <div className="bg-gradient-to-br from-emerald-500 to-blue-500 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Icon className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  {benefit.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {benefit.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default BenefitsSection;
