import { useState } from 'react';

const PurchaseOrder = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    orderNumber: `PO-${Math.floor(10000 + Math.random() * 90000)}`,
    vendor: '',
    amount: '',
    description: '',
    date: new Date().toISOString().split('T')[0],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label htmlFor="orderNumber" className="block text-xs text-gray-400 mb-1">
            Order Number
          </label>
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
          <label htmlFor="date" className="block text-xs text-gray-400 mb-1">
            Date
          </label>
          <input
            type="date"
            id="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            className="w-full bg-gray-600 text-white text-sm rounded px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
        </div>
      </div>

      <div>
        <label htmlFor="vendor" className="block text-xs text-gray-400 mb-1">
          Vendor
        </label>
        <input
          type="text"
          id="vendor"
          name="vendor"
          value={formData.vendor}
          onChange={handleChange}
          placeholder="Enter vendor name"
          className="w-full bg-gray-600 text-white text-sm rounded px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
          required
        />
      </div>

      <div>
        <label htmlFor="amount" className="block text-xs text-gray-400 mb-1">
          Amount
        </label>
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
            required
            step="0.01"
            min="0"
          />
        </div>
      </div>

      <div>
        <label htmlFor="description" className="block text-xs text-gray-400 mb-1">
          Description
        </label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Enter purchase details"
          className="w-full bg-gray-600 text-white text-sm rounded px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500 min-h-[80px]"
          required
        />
      </div>

      <div className="flex justify-end pt-2">
        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white text-sm py-2 px-4 rounded transition-colors"
        >
          Create Purchase Order
        </button>
      </div>
    </form>
  );
};

export default PurchaseOrder;