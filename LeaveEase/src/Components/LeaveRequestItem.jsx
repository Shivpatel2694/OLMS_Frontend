import React from 'react';

const LeaveRequestItem = ({ request, onApprove, onReject }) => {
  // Function to format date in a more readable format
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  // Calculate duration in days
  const calculateDuration = (from, to) => {
    const start = new Date(from);
    const end = new Date(to);
    const diffTime = Math.abs(end - start);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1; // +1 to include both start and end dates
    return diffDays === 1 ? '1 day' : `${diffDays} days`;
  };

  // Determine badge color based on leave type
  const getLeaveTypeBadgeColor = (type) => {
    switch (type.toLowerCase()) {
      case 'annual':
        return 'bg-blue-100 text-blue-800';
      case 'sick':
        return 'bg-red-100 text-red-800';
      case 'personal':
        return 'bg-yellow-100 text-yellow-800';
      case 'bereavement':
        return 'bg-purple-100 text-purple-800';
      case 'maternity':
      case 'paternity':
        return 'bg-pink-100 text-pink-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  // Determine status badge color
  const getStatusBadgeColor = (status) => {
    switch (status.toLowerCase()) {
      case 'approved':
        return 'bg-green-100 text-green-800';
      case 'rejected':
        return 'bg-red-100 text-red-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <li className="p-4 hover:bg-gray-50 transition-colors">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
        {/* Employee Info */}
        <div className="md:col-span-3">
          <h3 className="font-medium text-primary-darker">{request.employeeName}</h3>
          <div className="text-sm text-gray-500 mt-1">
            <span>ID: {request.employeeId}</span>
            <span className="mx-2">|</span>
            <span>{request.department}</span>
          </div>
        </div>

        {/* Leave Type */}
        <div className="md:col-span-2">
          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getLeaveTypeBadgeColor(request.leaveType)}`}>
            {request.leaveType}
          </span>
        </div>

        {/* Duration */}
        <div className="md:col-span-3">
          <div className="text-sm">
            <span className="font-medium">Duration:</span> {calculateDuration(request.fromDate, request.toDate)}
          </div>
          <div className="text-sm text-gray-500 mt-1">
            {formatDate(request.fromDate)} - {formatDate(request.toDate)}
          </div>
        </div>

        {/* Status */}
        <div className="md:col-span-2">
          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusBadgeColor(request.status)}`}>
            {request.status.charAt(0).toUpperCase() + request.status.slice(1)}
          </span>
          <div className="text-xs text-gray-500 mt-1">
            Applied: {formatDate(request.appliedOn)}
          </div>
        </div>

        {/* Actions */}
        <div className="md:col-span-2 flex items-center justify-end space-x-2">
          {request.status === 'pending' && (
            <>
              <button
                onClick={onApprove}
                className="inline-flex items-center px-3 py-1 border border-transparent text-xs font-medium rounded shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
              >
                Approve
              </button>
              <button
                onClick={onReject}
                className="inline-flex items-center px-3 py-1 border border-transparent text-xs font-medium rounded shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
              >
                Reject
              </button>
            </>
          )}
          {request.status !== 'pending' && (
            <button
              className="inline-flex items-center px-3 py-1 border border-gray-300 text-xs font-medium rounded shadow-sm text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-light"
            >
              View Details
            </button>
          )}
        </div>
      </div>
      
      {/* Reason - Shown on all requests */}
      <div className="mt-2 text-sm text-gray-600">
        <span className="font-medium">Reason:</span> {request.reason}
      </div>
    </li>
  );
};

export default LeaveRequestItem;