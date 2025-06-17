import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { ArrowLeft, ArrowRight, CheckCircle, Loader2 } from 'lucide-react';

interface WaitlistFormProps {
  onClose: () => void;
}

const WaitlistForm: React.FC<WaitlistFormProps> = ({ onClose }) => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    full_name: '',
    email: user?.email || '',
    company: '',
    job_title: '',
    primary_use_case: '',
    company_size: '',
    first_task: '',
    current_tools: '',
    pain_points: '',
    how_did_you_hear: '',
    monthly_budget: '',
    urgency: 'medium'
  });

  const updateFormData = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const nextStep = () => {
    if (currentStep < 3) setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  const handleSubmit = async () => {
    if (!user) return;

    setLoading(true);
    try {
      // Insert waitlist entry
      const { error: waitlistError } = await supabase
        .from('waitlist')
        .insert({
          user_id: user.id,
          ...formData
        });

      if (waitlistError) throw waitlistError;

      // Update profile to mark as on waitlist
      const { error: profileError } = await supabase
        .from('profiles')
        .update({ is_on_waitlist: true })
        .eq('user_id', user.id);

      if (profileError) throw profileError;

      toast({
        title: "Welcome to the waitlist! 🎉",
        description: "You'll receive updates about early access soon.",
      });

      onClose();
    } catch (error) {
      console.error('Error submitting waitlist form:', error);
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const renderStep1 = () => (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h3 className="text-2xl font-bold text-gray-900 mb-2">Tell us about yourself</h3>
        <p className="text-gray-600">Help us understand your background</p>
      </div>
      
      <div className="space-y-4">
        <div>
          <Label htmlFor="full_name">Full Name *</Label>
          <Input
            id="full_name"
            value={formData.full_name}
            onChange={(e) => updateFormData('full_name', e.target.value)}
            required
          />
        </div>
        
        <div>
          <Label htmlFor="email">Email *</Label>
          <Input
            id="email"
            type="email"
            value={formData.email}
            onChange={(e) => updateFormData('email', e.target.value)}
            required
            disabled
          />
        </div>
        
        <div>
          <Label htmlFor="company">Company</Label>
          <Input
            id="company"
            value={formData.company}
            onChange={(e) => updateFormData('company', e.target.value)}
            placeholder="Your company name"
          />
        </div>
        
        <div>
          <Label htmlFor="job_title">Job Title</Label>
          <Input
            id="job_title"
            value={formData.job_title}
            onChange={(e) => updateFormData('job_title', e.target.value)}
            placeholder="Your role"
          />
        </div>
      </div>
    </div>
  );

  const renderStep2 = () => (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h3 className="text-2xl font-bold text-gray-900 mb-2">Your automation needs</h3>
        <p className="text-gray-600">Help us understand how you'll use Axiom</p>
      </div>
      
      <div className="space-y-4">
        <div>
          <Label htmlFor="primary_use_case">Primary Use Case *</Label>
          <Select value={formData.primary_use_case} onValueChange={(value) => updateFormData('primary_use_case', value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select your main use case" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="workflow_automation">Workflow Automation</SelectItem>
              <SelectItem value="data_processing">Data Processing</SelectItem>
              <SelectItem value="customer_support">Customer Support</SelectItem>
              <SelectItem value="content_creation">Content Creation</SelectItem>
              <SelectItem value="team_collaboration">Team Collaboration</SelectItem>
              <SelectItem value="other">Other</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div>
          <Label htmlFor="company_size">Company Size *</Label>
          <Select value={formData.company_size} onValueChange={(value) => updateFormData('company_size', value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select company size" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="solo">Solo</SelectItem>
              <SelectItem value="2-10">2-10 employees</SelectItem>
              <SelectItem value="11-50">11-50 employees</SelectItem>
              <SelectItem value="51-200">51-200 employees</SelectItem>
              <SelectItem value="200+">200+ employees</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div>
          <Label htmlFor="first_task">What's the first task you'd want to automate? *</Label>
          <Textarea
            id="first_task"
            value={formData.first_task}
            onChange={(e) => updateFormData('first_task', e.target.value)}
            placeholder="Describe the specific workflow or task you'd like to automate first"
            required
          />
        </div>
        
        <div>
          <Label htmlFor="current_tools">Current Tools</Label>
          <Input
            id="current_tools"
            value={formData.current_tools}
            onChange={(e) => updateFormData('current_tools', e.target.value)}
            placeholder="e.g., Slack, Notion, Gmail, Salesforce"
          />
        </div>
      </div>
    </div>
  );

  const renderStep3 = () => (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h3 className="text-2xl font-bold text-gray-900 mb-2">Final details</h3>
        <p className="text-gray-600">Just a few more questions to personalize your experience</p>
      </div>
      
      <div className="space-y-4">
        <div>
          <Label htmlFor="pain_points">What are your biggest workflow pain points?</Label>
          <Textarea
            id="pain_points"
            value={formData.pain_points}
            onChange={(e) => updateFormData('pain_points', e.target.value)}
            placeholder="Tell us about the challenges you face with current workflows"
          />
        </div>
        
        <div>
          <Label htmlFor="how_did_you_hear">How did you hear about us?</Label>
          <Select value={formData.how_did_you_hear} onValueChange={(value) => updateFormData('how_did_you_hear', value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select an option" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="twitter">Twitter</SelectItem>
              <SelectItem value="linkedin">LinkedIn</SelectItem>
              <SelectItem value="friend">Friend/Colleague</SelectItem>
              <SelectItem value="google">Google Search</SelectItem>
              <SelectItem value="newsletter">Newsletter</SelectItem>
              <SelectItem value="other">Other</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div>
          <Label htmlFor="monthly_budget">Monthly Budget Range</Label>
          <Select value={formData.monthly_budget} onValueChange={(value) => updateFormData('monthly_budget', value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select budget range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="under_50">Under $50</SelectItem>
              <SelectItem value="50-100">$50 - $100</SelectItem>
              <SelectItem value="100-250">$100 - $250</SelectItem>
              <SelectItem value="250-500">$250 - $500</SelectItem>
              <SelectItem value="500+">$500+</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div>
          <Label htmlFor="urgency">How urgently do you need this solution?</Label>
          <Select value={formData.urgency} onValueChange={(value) => updateFormData('urgency', value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select urgency level" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="low">Low - Nice to have</SelectItem>
              <SelectItem value="medium">Medium - Would be helpful</SelectItem>
              <SelectItem value="high">High - Critical need</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );

  const canProceed = () => {
    switch (currentStep) {
      case 1:
        return formData.full_name && formData.email;
      case 2:
        return formData.primary_use_case && formData.company_size && formData.first_task;
      case 3:
        return true;
      default:
        return false;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-emerald-50 py-12">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          {/* Progress Bar */}
          <div className="mb-8">
            <div className="flex justify-between items-center mb-4">
              <span className="text-sm font-medium text-gray-600">Step {currentStep} of 3</span>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-gray-600"
              >
                ×
              </button>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-gradient-to-r from-emerald-500 to-blue-500 h-2 rounded-full transition-all duration-300"
                style={{ width: `${(currentStep / 3) * 100}%` }}
              ></div>
            </div>
          </div>

          {/* Form Content */}
          {currentStep === 1 && renderStep1()}
          {currentStep === 2 && renderStep2()}
          {currentStep === 3 && renderStep3()}

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-8 pt-6 border-t border-gray-200">
            <Button
              variant="outline"
              onClick={prevStep}
              disabled={currentStep === 1}
              className="flex items-center space-x-2"
            >
              <ArrowLeft size={16} />
              <span>Previous</span>
            </Button>

            {currentStep < 3 ? (
              <Button
                onClick={nextStep}
                disabled={!canProceed()}
                className="bg-emerald-500 hover:bg-emerald-600 flex items-center space-x-2"
              >
                <span>Next</span>
                <ArrowRight size={16} />
              </Button>
            ) : (
              <Button
                onClick={handleSubmit}
                disabled={loading}
                className="bg-emerald-500 hover:bg-emerald-600 flex items-center space-x-2"
              >
                {loading ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    <span>Submitting...</span>
                  </>
                ) : (
                  <>
                    <CheckCircle size={16} />
                    <span>Join Waitlist</span>
                  </>
                )}
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default WaitlistForm;
