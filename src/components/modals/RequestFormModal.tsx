// src/components/modals/RequestFormModal.tsx
import { useState } from 'react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { X, AlertTriangle, Clock, CheckCircle } from 'lucide-react';

interface RequestFormModalProps {
  onClose: () => void;
  onSubmit?: (data: any) => void;
}

export const RequestFormModal = ({ onClose, onSubmit }: RequestFormModalProps) => {
  const [formData, setFormData] = useState({
    type: 'food' as 'food' | 'money' | 'essentials',
    title: '',
    description: '',
    urgency: 'medium' as 'low' | 'medium' | 'high',
    amount: '',
    items: [''],
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In real app, this would call an API
    console.log('Submitting request:', formData);
    onSubmit?.(formData);
    onClose();
  };

  const addItem = () => {
    setFormData(prev => ({
      ...prev,
      items: [...prev.items, '']
    }));
  };

  const updateItem = (index: number, value: string) => {
    setFormData(prev => ({
      ...prev,
      items: prev.items.map((item, i) => i === index ? value : item)
    }));
  };

  const urgencyOptions = [
    { value: 'low', label: 'Low', icon: CheckCircle, color: 'text-green-500' },
    { value: 'medium', label: 'Medium', icon: Clock, color: 'text-amber-500' },
    { value: 'high', label: 'High', icon: AlertTriangle, color: 'text-rose-500' },
  ];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h3 className="text-xl font-bold text-gray-900">Create New Request</h3>
          <Button variant="outline" size="sm" onClick={onClose}>
            <X className="w-4 h-4" />
          </Button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Request Type */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              What do you need help with?
            </label>
            <div className="grid grid-cols-3 gap-3">
              {[
                { value: 'food', label: 'Food', emoji: '🍽️' },
                { value: 'money', label: 'Money', emoji: '💰' },
                { value: 'essentials', label: 'Essentials', emoji: '🛍️' },
              ].map((type) => (
                <button
                  key={type.value}
                  type="button"
                  onClick={() => setFormData(prev => ({ ...prev, type: type.value as any }))}
                  className={`p-4 border-2 rounded-xl text-center transition-all KSH{
                    formData.type === type.value
                      ? 'border-primary-500 bg-primary-50 shadow-md'
                      : 'border-gray-200 hover:border-primary-300'
                  }`}
                >
                  <div className="text-2xl mb-2">{type.emoji}</div>
                  <div className="font-medium text-gray-900">{type.label}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Title */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Request Title
            </label>
            <input
              type="text"
              required
              value={formData.title}
              onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              placeholder="e.g., Weekly groceries, Textbook funds..."
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <textarea
              rows={4}
              required
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              placeholder="Tell donors more about your situation and needs..."
            />
          </div>

          {/* Urgency */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Urgency Level
            </label>
            <div className="grid grid-cols-3 gap-3">
              {urgencyOptions.map((option) => {
                const Icon = option.icon;
                return (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => setFormData(prev => ({ ...prev, urgency: option.value as any }))}
                    className={`p-3 border-2 rounded-xl text-center transition-all KSH{
                      formData.urgency === option.value
                        ? 'border-primary-500 bg-primary-50'
                        : 'border-gray-200 hover:border-primary-300'
                    }`}
                  >
                    <Icon className={`w-5 h-5 mx-auto mb-1 KSH{option.color}`} />
                    <div className="text-sm font-medium text-gray-900">{option.label}</div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Amount (for money requests) */}
          {formData.type === 'money' && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Amount Needed (KSH)
              </label>
              <input
                type="number"
                min="1"
                value={formData.amount}
                onChange={(e) => setFormData(prev => ({ ...prev, amount: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                placeholder="Enter amount"
              />
            </div>
          )}

          {/* Items (for food/essentials) */}
          {(formData.type === 'food' || formData.type === 'essentials') && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Specific Items Needed
              </label>
              <div className="space-y-2">
                {formData.items.map((item, index) => (
                  <input
                    key={index}
                    type="text"
                    value={item}
                    onChange={(e) => updateItem(index, e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    placeholder={`Item KSH{index + 1} (optional)`}
                  />
                ))}
                <Button
                  type="button"
                  variant="outline"
                  onClick={addItem}
                  className="w-full"
                >
                  + Add Another Item
                </Button>
              </div>
            </div>
          )}

          {/* Submit */}
          <div className="flex gap-4 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button type="submit" className="flex-1">
              Submit Request
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
};