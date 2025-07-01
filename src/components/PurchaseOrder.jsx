import { useState } from 'react';

const PurchaseOrder = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    orderNumber: `PO-${Math.floor(10000 + Math.random() * 90000)}`,
    vendor: '',
    amount: '',
    description: '',
    date: new Date().toISOString().split('T')[0],
    assignTo: '',
    urgency: 'medium',
    dueBy: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // Default 7 days from now
    observers: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
    
    // Reset form with new order number after submission
    setFormData({
      orderNumber: `PO-${Math.floor(10000 + Math.random() * 90000)}`,
      vendor: '',
      amount: '',
      description: '',
      date: new Date().toISOString().split('T')[0],
      assignTo: '',
      urgency: 'medium',
      dueBy: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      observers: '',
    });
  };

  // Team members for dropdown
  const teamMembers = [
    { id: 1, name: 'Mina Chen', role: 'Project Manager' },
    { id: 2, name: 'David Rodriguez', role: 'Financial Analyst' },
    { id: 3, name: 'Sarah Johnson', role: 'Procurement Specialist' },
    { id: 4, name: 'Alex Patel', role: 'Department Head' },
  ];

  // Helper component for form labels with required indicator
  const FormLabel = ({ htmlFor, required, children }) => (
    <label htmlFor={htmlFor} className="block text-xs text-gray-400 mb-1">
      {required && <span className="text-red-500 mr-1">*</span>}
      {children}
    </label>
  );

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <div className="grid grid-cols-2 gap-3">
        <div>
          <FormLabel htmlFor="orderNumber">
            Order Number
          </FormLabel>
          <input
            type="text"
            id="orderNumber"
            name="orderNumber"
            value={formData.orderNumber}
            onChange={handleChange}
            className="w-full bg-gray-600 text-white text-sm rounded px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
            readOnly
          />
        </div>
        <div>
          <FormLabel htmlFor="date" required>
            Date
          </FormLabel>
          <input
            type="date"
            id="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            className="w-full bg-gray-600 text-white text-sm rounded px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
            required
          />
        </div>
      </div>

      <div>
        <FormLabel htmlFor="vendor">
          Vendor
        </FormLabel>
        <input
          type="text"
          id="vendor"
          name="vendor"
          value={formData.vendor}
          onChange={handleChange}
          placeholder="Enter vendor name"
          className="w-full bg-gray-600 text-white text-sm rounded px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
        />
      </div>

      <div>
        <FormLabel htmlFor="amount">
          Amount
        </FormLabel>
        <div className="relative">
          <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
            $
          </span>
          <input
            type="number"
            id="amount"
            name="amount"
            value={formData.amount}
            onChange={handleChange}
            placeholder="0.00"
            className="w-full bg-gray-600 text-white text-sm rounded pl-7 pr-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
            step="0.01"
            min="0"
          />
        </div>
      </div>

      <div>
        <FormLabel htmlFor="assignTo" required>
          Assign To
        </FormLabel>
        <select
          id="assignTo"
          name="assignTo"
          value={formData.assignTo}
          onChange={handleChange}
          className="w-full bg-gray-600 text-white text-sm rounded px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
          required
        >
          <option value="">Select a team member</option>
          {teamMembers.map(member => (
            <option key={member.id} value={member.name}>
              {member.name} ({member.role})
            </option>
          ))}
        </select>
      </div>

      <div>
        <FormLabel htmlFor="urgency" required>
          Urgency
        </FormLabel>
        <div className="flex gap-3">
          <label className="inline-flex items-center">
            <input
              type="radio"
              name="urgency"
              value="low"
              checked={formData.urgency === 'low'}
              onChange={handleChange}
              className="text-blue-600 focus:ring-blue-500 h-4 w-4 mr-1"
              required
            />
            <span className="text-sm text-gray-300">Low</span>
          </label>
          <label className="inline-flex items-center">
            <input
              type="radio"
              name="urgency"
              value="medium"
              checked={formData.urgency === 'medium'}
              onChange={handleChange}
              className="text-blue-600 focus:ring-blue-500 h-4 w-4 mr-1"
            />
            <span className="text-sm text-gray-300">Medium</span>
          </label>
          <label className="inline-flex items-center">
            <input
              type="radio"
              name="urgency"
              value="high"
              checked={formData.urgency === 'high'}
              onChange={handleChange}
              className="text-blue-600 focus:ring-blue-500 h-4 w-4 mr-1"
            />
            <span className="text-sm text-gray-300">High</span>
          </label>
        </div>
      </div>

      <div>
        <FormLabel htmlFor="dueBy" required>
          Due By
        </FormLabel>
        <input
          type="date"
          id="dueBy"
          name="dueBy"
          value={formData.dueBy}
          onChange={handleChange}
          className="w-full bg-gray-600 text-white text-sm rounded px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
          required
        />
      </div>

      <div>
        <FormLabel htmlFor="observers">
          Observers (select additional users to notify)
        </FormLabel>
        <select
          id="observers"
          name="observers"
          value={formData.observers}
          onChange={handleChange}
          className="w-full bg-gray-600 text-white text-sm rounded px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
          multiple
        >
          {teamMembers.map(member => (
            <option key={member.id} value={member.name}>
              {member.name} ({member.role})
            </option>
          ))}
        </select>
        <p className="text-xs text-gray-500 mt-1">Hold Ctrl/Cmd to select multiple users</p>
      </div>

      <div>
        <FormLabel htmlFor="description">
          Description
        </FormLabel>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Enter purchase details"
          className="w-full bg-gray-600 text-white text-sm rounded px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500 min-h-[80px]"
        />
      </div>

      <div className="pt-2">
        <p className="text-xs text-gray-400 mb-2"><span className="text-red-500">*</span> Required fields</p>
        <div className="flex justify-end">
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white text-sm py-2 px-4 rounded transition-colors"
          >
            Create Purchase Order
          </button>
        </div>
      </div>
    </form>
  );
};

export default PurchaseOrder;