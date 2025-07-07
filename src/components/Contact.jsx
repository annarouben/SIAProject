import StarRating from './StarRating';

const Contact = ({ contact, isSelected }) => {
  const getStressLevelColor = (stress) => {
    switch (stress) {
      case 'High stress':
        return 'bg-red-500';
      case 'Moderate stress':
        return 'bg-yellow-500';
      case 'Low stress':
        return 'bg-green-500';
      case 'Bored':
        return 'bg-blue-500';
      default:
        return 'bg-gray-500';
    }
  };

  const truncateText = (text, maxLength) => {
    return text.length > maxLength ? text.slice(0, maxLength) + '...' : text;
  };

  return (
    <div className={`bg-gray-800 rounded-lg p-4 shadow-lg transition-colors flex items-center gap-4 ${
      isSelected ? 'bg-gray-700' : 'hover:bg-gray-700'
    }`}>
      <div className="relative">
        <img
          src={contact.avatar}
          alt={contact.name}
          className={`w-14 h-14 rounded-full object-cover border-2 ${
            isSelected ? 'border-blue-500' : 'border-gray-700'
          }`}
        />
        {isSelected && (
          <div className="absolute -top-1 -right-1 w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center">
            <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
        )}
      </div>
      <div className="flex-1">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-lg font-semibold text-gray-100">{contact.name}</h3>
            <StarRating rating={contact.rating} />
          </div>
          <div className="group relative">
            <button 
              className="px-4 py-1 text-xs rounded-full bg-gray-700 text-gray-300 hover:bg-gray-600 transition-colors w-24 truncate text-center"
            >
              {truncateText(contact.goodAtTask, 10)}
            </button>
            <div className="absolute hidden group-hover:block w-auto p-2 bg-gray-900 text-gray-300 text-xs rounded shadow-lg -bottom-8 right-0 whitespace-nowrap">
              {contact.goodAtTask}
            </div>
          </div>
        </div>
        <div className="text-xs mt-1 text-gray-400 flex gap-8">
          <div>
            <div className="w-32 mb-1">
              <span>{contact.workCapacity.label}</span>
              <span className="ml-2">({contact.capacityPercentage}%)</span>
            </div>
            <div className="w-32 h-1 bg-gray-700 rounded-full overflow-hidden">
              <div
                className="bg-gray-400 h-full rounded-full"
                style={{ width: `${Math.min(contact.capacityPercentage, 100)}%` }}
              />
            </div>
          </div>
          <div className="flex items-start gap-2">
            <span className={`w-2 h-2 rounded-full ${getStressLevelColor(contact.workCapacity.stress)} mt-0.5`} />
            <span>{contact.workCapacity.stress}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;