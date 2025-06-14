import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { useToast } from '@/hooks/use-toast';
import { CheckCircle, Loader2 } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

interface WaitlistFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: (email: string) => void;
}

const WaitlistFormModal: React.FC<WaitlistFormModalProps> = ({ isOpen, onClose, onSuccess }) => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    full_name: '',
    email: '',
    type: '',
    company: '',
    job_role: '',
    primary_use_case: '',
    budget_rupees: ''
  });

  const updateFormData = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.full_name || !formData.email || !formData.type || !formData.primary_use_case) {
      toast({
        title: "Missing Fields",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }

    if (formData.type === 'company' && !formData.company) {
      toast({
        title: "Missing Company Name",
        description: "Please provide your company name.",
        variant: "destructive"
      });
      return;
    }

    if (formData.type === 'individual' && !formData.job_role) {
      toast({
        title: "Missing Job Role",
        description: "Please provide your job role.",
        variant: "destructive"
      });
      return;
    }

    setLoading(true);
    try {
      console.log('Submitting form data:', formData);
      
      const { data, error } = await supabase
        .from('waitlist')
        .insert({
          full_name: formData.full_name,
          email: formData.email.toLowerCase(),
          type: formData.type,
          company: formData.type === 'company' ? formData.company : null,
          job_role: formData.type === 'individual' ? formData.job_role : null,
          primary_use_case: formData.primary_use_case,
          use_case: formData.primary_use_case,
          budget_rupees: formData.budget_rupees
        });

      if (error) {
        console.error('Error submitting to database:', error);
        toast({
          title: "Error",
          description: "Failed to submit form. Please try again.",
          variant: "destructive"
        });
        return;
      }

      console.log('Form submitted successfully:', data);
      
      toast({
        title: "Form Submitted! 🎉",
        description: "Thank you for your interest. Redirecting you now...",
      });

      setTimeout(() => {
        onClose();
        if (onSuccess) {
          onSuccess(formData.email);
        }
      }, 1500);
    } catch (error) {
      console.error('Error submitting form:', error);
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
      <DialogContent className="sm:max-w-lg max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-center text-2xl font-bold">
            Join AutoAgent Waitlist
          </DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-6 mt-4">
          <div className="space-y-2">
            <Label htmlFor="full_name">Name *</Label>
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
              placeholder="your.email@example.com"
            />
          </div>

          <div className="space-y-3">
            <Label>Type *</Label>
            <RadioGroup value={formData.type} onValueChange={(value) => updateFormData('type', value)}>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="individual" id="individual" />
                <Label htmlFor="individual">Individual</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="company" id="company" />
                <Label htmlFor="company">Company</Label>
              </div>
            </RadioGroup>
          </div>

          {formData.type === 'company' && (
            <div className="space-y-2">
              <Label htmlFor="company">Company Name *</Label>
              <Input
                id="company"
                value={formData.company}
                onChange={(e) => updateFormData('company', e.target.value)}
                placeholder="Your company name"
              />
            </div>
          )}

          {formData.type === 'individual' && (
            <div className="space-y-2">
              <Label htmlFor="job_role">Job Role *</Label>
              <Input
                id="job_role"
                value={formData.job_role}
                onChange={(e) => updateFormData('job_role', e.target.value)}
                placeholder="Your job role"
              />
            </div>
          )}

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
            <Label htmlFor="budget_rupees">Monthly Budget (₹)</Label>
            <Select value={formData.budget_rupees} onValueChange={(value) => updateFormData('budget_rupees', value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select budget range in rupees" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="under_2000">Under ₹2,000</SelectItem>
                <SelectItem value="2000-5000">₹2,000 - ₹5,000</SelectItem>
                <SelectItem value="5000-10000">₹5,000 - ₹10,000</SelectItem>
                <SelectItem value="10000-25000">₹10,000 - ₹25,000</SelectItem>
                <SelectItem value="25000+">₹25,000+</SelectItem>
              </SelectContent>
            </Select>
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
                  <span>Done</span>
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
