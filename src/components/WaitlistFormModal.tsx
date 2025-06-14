
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { CheckCircle, Loader2 } from 'lucide-react';

interface WaitlistFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

const WaitlistFormModal: React.FC<WaitlistFormModalProps> = ({ isOpen, onClose, onSuccess }) => {
  const { user } = useAuth();
  const { toast } = useToast();
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) {
      toast({
        title: "Error",
        description: "You must be logged in to join the waitlist.",
        variant: "destructive"
      });
      return;
    }

    if (!formData.full_name || !formData.primary_use_case || !formData.company_size || !formData.first_task) {
      toast({
        title: "Missing Fields",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }

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
      if (onSuccess) {
        onSuccess();
      }
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

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-center text-2xl font-bold">
            Join AutoAgent Waitlist
          </DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-6 mt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="full_name">Full Name *</Label>
              <Input
                id="full_name"
                value={formData.full_name}
                onChange={(e) => updateFormData('full_name', e.target.value)}
                required
                placeholder="Your full name"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="email">Email *</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => updateFormData('email', e.target.value)}
                required
                disabled
                className="bg-gray-100"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="company">Company/Individual</Label>
              <Input
                id="company"
                value={formData.company}
                onChange={(e) => updateFormData('company', e.target.value)}
                placeholder="Company name or 'Individual'"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="job_title">Job Title</Label>
              <Input
                id="job_title"
                value={formData.job_title}
                onChange={(e) => updateFormData('job_title', e.target.value)}
                placeholder="Your role"
              />
            </div>
          </div>

          <div className="space-y-2">
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
          
          <div className="space-y-2">
            <Label htmlFor="company_size">Company Size *</Label>
            <Select value={formData.company_size} onValueChange={(value) => updateFormData('company_size', value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select company size" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="individual">Individual</SelectItem>
                <SelectItem value="2-10">2-10 employees</SelectItem>
                <SelectItem value="11-50">11-50 employees</SelectItem>
                <SelectItem value="51-200">51-200 employees</SelectItem>
                <SelectItem value="200+">200+ employees</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="first_task">What's the first task you'd want to automate? *</Label>
            <Textarea
              id="first_task"
              value={formData.first_task}
              onChange={(e) => updateFormData('first_task', e.target.value)}
              placeholder="Describe the specific workflow or task you'd like to automate first"
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="current_tools">Current Tools</Label>
            <Input
              id="current_tools"
              value={formData.current_tools}
              onChange={(e) => updateFormData('current_tools', e.target.value)}
              placeholder="e.g., Slack, Notion, Gmail, Salesforce"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="pain_points">What are your biggest workflow pain points?</Label>
            <Textarea
              id="pain_points"
              value={formData.pain_points}
              onChange={(e) => updateFormData('pain_points', e.target.value)}
              placeholder="Tell us about the challenges you face with current workflows"
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
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
            
            <div className="space-y-2">
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
          </div>

          <div className="flex justify-end space-x-4 pt-6 border-t">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              disabled={loading}
            >
              Cancel
            </Button>
            <Button
              type="submit"
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
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default WaitlistFormModal;
