import React from 'react';

const EmployeeListItem = ({ employee, isSelectable, isSelected, onSelect }) => {
  // Color palette from HolidayList page
  const colorPalette = {
    primary: "#3C7EFC",
    dark: "#404258",
    medium: "#474E68",
    light: "#6B728E",
    background: "#F5F5F9",
    white: "#FFFFFF"
  };

  // Enhanced type styling using the color palette
  const getRoleStyles = (role) => {
    switch (role) {
      case 'ADMIN':
        return {
          bg: `bg-purple-50`,
          text: "text-purple-700",
          label: "Admin"
        };
      case 'MANAGER':
        return {
          bg: "bg-blue-50",
          text: `text-blue-700`,
          label: "Manager"
        };
      case 'EMPLOYEE':
        return {
          bg: "bg-gray-100",
          text: `text-gray-700`,
          label: "Employee"
        };
      default:
        return {
          bg: "bg-gray-100",
          text: `text-gray-700`,
          label: role ? role.replace('_', ' ') : 'Unknown'
        };
    }
  };

  // Format date in a clean, readable format
  const formatDate = (dateString) => {
    if (!dateString) return '';
    
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const roleStyle = getRoleStyles(employee.role);

  return (
    <div 
      className="rounded-lg overflow-hidden shadow-sm transition-all duration-200 hover:shadow"
      style={{ backgroundColor: colorPalette.white, borderRadius: "12px" }}
    >
      <div className="p-4">
        <div className="flex justify-between items-start">
          <div>
            <h3 
              className="text-lg font-semibold mb-1"
              style={{ color: colorPalette.dark }}
            >
              {employee.name}
            </h3>
            <p 
              className="text-sm mb-2"
              style={{ color: colorPalette.light }}
            >
              {employee.email}
            </p>
            
            <p 
              className="text-sm mb-2"
              style={{ color: colorPalette.medium }}
            >
              Department: {employee.department}
            </p>
            
            {employee.joinDate && (
              <p 
                className="text-sm mb-3"
                style={{ color: colorPalette.medium }}
              >
                Joined: {formatDate(employee.joinDate)}
              </p>
            )}
            
            <span 
              className={`inline-flex items-center px-3 py-1 rounded-md text-xs font-medium ${roleStyle.bg} ${roleStyle.text}`}
              style={{ 
                backgroundColor: roleStyle.label === "Manager" ? "rgba(60, 126, 252, 0.1)" : roleStyle.label === "Admin" ? "rgba(128, 90, 213, 0.1)" : "#F0F0F4",
                color: roleStyle.label === "Manager" ? colorPalette.primary : roleStyle.label === "Admin" ? "#805AD5" : colorPalette.medium
              }}
            >
              {roleStyle.label}
            </span>
          </div>
          
          {isSelectable && (
            <div>
              <input
                type="checkbox"
                checked={isSelected}
                onChange={() => onSelect(employee.id)}
                className="w-5 h-5 rounded focus:ring-2 focus:ring-offset-2"
                style={{ accentColor: colorPalette.primary }}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EmployeeListItem;