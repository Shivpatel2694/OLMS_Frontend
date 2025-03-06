import React, { useState, useEffect } from 'react';
// import axios from 'axios';
import LeaveRequestItem from '../Components/LeaveRequestItem';
import Layout from '../Components/Layout';

const AdminDashboard = () => {
  // State for dashboard metrics
  const [dashboardData, setDashboardData] = useState({
    totalManagers: 0,
    totalDepartments: 10, // Static value as specified
    pendingLeaveRequests: 0,
    rejectedLeaveRequests: 0,
    approvedLeaveRequests: 0,
  });

  // State for leave requests
  const [leaveRequests, setLeaveRequests] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Function to fetch dashboard data
    const fetchDashboardData = async () => {
      setIsLoading(true);
      setError(null);

      try {
        // COMMENTED AXIOS CALLS - Uncomment when backend is ready
        /*
        // Get dashboard metrics
        const metricsResponse = await axios.get('/api/admin/dashboard/metrics', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('authToken')}`
          }
        });

        // Get leave requests
        const requestsResponse = await axios.get('/api/admin/leave-requests', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('authToken')}`
          }
        });

        setDashboardData({
          totalManagers: metricsResponse.data.totalManagers,
          totalDepartments: 10, // Static value
          pendingLeaveRequests: metricsResponse.data.pendingLeaveRequests,
          rejectedLeaveRequests: metricsResponse.data.rejectedLeaveRequests,
          approvedLeaveRequests: metricsResponse.data.approvedLeaveRequests,
        });

        setLeaveRequests(requestsResponse.data.leaveRequests);
        */

        // DUMMY DATA FOR VISUALIZATION
        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 800));

        // Set dummy dashboard data
        setDashboardData({
          totalManagers: 24,
          totalDepartments: 10, // Static value
          pendingLeaveRequests: 8,
          rejectedLeaveRequests: 3,
          approvedLeaveRequests: 15,
        });

        // Set dummy leave requests
        setLeaveRequests([
          {
            id: 1,
            employeeName: 'John Smith',
            employeeId: 'EMP001',
            department: 'Engineering',
            leaveType: 'Annual',
            fromDate: '2025-03-10',
            toDate: '2025-03-15',
            reason: 'Family vacation',
            status: 'pending',
            appliedOn: '2025-03-01',
          },
          {
            id: 2,
            employeeName: 'Sarah Johnson',
            employeeId: 'EMP045',
            department: 'Marketing',
            leaveType: 'Sick',
            fromDate: '2025-03-08',
            toDate: '2025-03-09',
            reason: 'Medical appointment',
            status: 'pending',
            appliedOn: '2025-03-05',
          },
          {
            id: 3,
            employeeName: 'Michael Brown',
            employeeId: 'EMP023',
            department: 'Finance',
            leaveType: 'Personal',
            fromDate: '2025-03-20',
            toDate: '2025-03-20',
            reason: 'Important personal matter',
            status: 'pending',
            appliedOn: '2025-03-04',
          },
          {
            id: 4,
            employeeName: 'Emily Davis',
            employeeId: 'EMP067',
            department: 'Human Resources',
            leaveType: 'Annual',
            fromDate: '2025-04-01',
            toDate: '2025-04-05',
            reason: 'Planned holiday',
            status: 'pending',
            appliedOn: '2025-03-02',
          },
        ]);

      } catch (err) {
        setError('Failed to fetch dashboard data. Please try again later.');
        console.error('Error fetching dashboard data:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  // Function to handle leave request approval
  const handleApproveRequest = async (leaveId) => {
    try {
      // COMMENTED AXIOS CALL - Uncomment when backend is ready
      /*
      await axios.put(`/api/admin/leave-requests/${leaveId}/approve`, {}, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('authToken')}`
        }
      });

      // Refetch dashboard data
      fetchDashboardData();
      */

      // Update local state for visualization
      setLeaveRequests(prevRequests => 
        prevRequests.map(request => 
          request.id === leaveId ? { ...request, status: 'approved' } : request
        )
      );

      // Update dashboard metrics
      setDashboardData(prev => ({
        ...prev,
        pendingLeaveRequests: prev.pendingLeaveRequests - 1,
        approvedLeaveRequests: prev.approvedLeaveRequests + 1
      }));

    } catch (err) {
      console.error('Error approving leave request:', err);
      alert('Failed to approve leave request. Please try again.');
    }
  };

  // Function to handle leave request rejection
  const handleRejectRequest = async (leaveId) => {
    try {
      // COMMENTED AXIOS CALL - Uncomment when backend is ready
      /*
      await axios.put(`/api/admin/leave-requests/${leaveId}/reject`, {}, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('authToken')}`
        }
      });

      // Refetch dashboard data
      fetchDashboardData();
      */

      // Update local state for visualization
      setLeaveRequests(prevRequests => 
        prevRequests.map(request => 
          request.id === leaveId ? { ...request, status: 'rejected' } : request
        )
      );

      // Update dashboard metrics
      setDashboardData(prev => ({
        ...prev,
        pendingLeaveRequests: prev.pendingLeaveRequests - 1,
        rejectedLeaveRequests: prev.rejectedLeaveRequests + 1
      }));

    } catch (err) {
      console.error('Error rejecting leave request:', err);
      alert('Failed to reject leave request. Please try again.');
    }
  };

  if (isLoading) {
    return (
        <Layout>
            
      <div className="min-h-screen bg-gray-100 flex items-center justify-center" style={{ backgroundColor: "#F5F5F9" }}>
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 mx-auto" style={{ borderColor: "#3C7EFC" }}></div>
          <p className="mt-4" style={{ color: "#404258" }}>Loading dashboard data...</p>
        </div>
      </div>
      
      </Layout>
    );
  }

  if (error) {
    return (
        <Layout>
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: "#F5F5F9" }}>
        <div className="bg-white p-8 rounded-lg shadow-md text-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor" style={{ color: "#404258" }}>
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
          <h2 className="text-xl font-semibold mt-4" style={{ color: "#404258" }}>Error</h2>
          <p className="mt-2" style={{ color: "#6B728E" }}>{error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="mt-4 px-4 py-2 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2"
            style={{ backgroundColor: "#3C7EFC", boxShadow: "0 2px 4px rgba(60, 126, 252, 0.3)" }}
          >
            Retry
          </button>
        </div>
      </div>
      </Layout>
    );
  }

  return (
    <Layout>
    <div className="min-h-screen py-6" style={{ backgroundColor: "#F5F5F9" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-2xl font-semibold mb-6" style={{ color: "#404258" }}>Admin Dashboard</h1>
        
        {/* Dashboard Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-8">
          <div className="bg-white rounded-lg shadow-md p-4" style={{ borderRadius: "16px" }}>
            <h2 className="text-sm uppercase" style={{ color: "#6B728E" }}>Total Managers</h2>
            <div className="flex items-center mt-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" style={{ color: "#3C7EFC" }}>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              <p className="text-3xl font-bold ml-2" style={{ color: "#404258" }}>{dashboardData.totalManagers}</p>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-4" style={{ borderRadius: "16px" }}>
            <h2 className="text-sm uppercase" style={{ color: "#6B728E" }}>Total Departments</h2>
            <div className="flex items-center mt-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" style={{ color: "#3C7EFC" }}>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
              <p className="text-3xl font-bold ml-2" style={{ color: "#404258" }}>{dashboardData.totalDepartments}</p>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-4" style={{ borderRadius: "16px" }}>
            <h2 className="text-sm uppercase" style={{ color: "#6B728E" }}>Pending Requests</h2>
            <div className="flex items-center mt-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" style={{ color: "#6B728E" }}>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <p className="text-3xl font-bold ml-2" style={{ color: "#404258" }}>{dashboardData.pendingLeaveRequests}</p>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-4" style={{ borderRadius: "16px" }}>
            <h2 className="text-sm uppercase" style={{ color: "#6B728E" }}>Approved Requests</h2>
            <div className="flex items-center mt-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" style={{ color: "#3C7EFC" }}>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <p className="text-3xl font-bold ml-2" style={{ color: "#404258" }}>{dashboardData.approvedLeaveRequests}</p>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-4" style={{ borderRadius: "16px" }}>
            <h2 className="text-sm uppercase" style={{ color: "#6B728E" }}>Rejected Requests</h2>
            <div className="flex items-center mt-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" style={{ color: "#474E68" }}>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <p className="text-3xl font-bold ml-2" style={{ color: "#404258" }}>{dashboardData.rejectedLeaveRequests}</p>
            </div>
          </div>
        </div>
        
        {/* Leave Requests List */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden" style={{ borderRadius: "16px" }}>
          <div className="border-b border-gray-200 p-4" style={{ backgroundColor: "#F8F8FB", borderColor: "#E8E8EF" }}>
            <h2 className="text-lg font-medium" style={{ color: "#404258" }}>Leave Requests</h2>
          </div>
          
          {leaveRequests.length === 0 ? (
            <div className="p-6 text-center" style={{ color: "#6B728E" }}>
              No leave requests found.
            </div>
          ) : (
            <ul className="divide-y divide-gray-200" style={{ borderColor: "#E8E8EF" }}>
              {leaveRequests.map(request => (
                <LeaveRequestItem 
                  key={request.id}
                  request={request}
                  onApprove={() => handleApproveRequest(request.id)}
                  onReject={() => handleRejectRequest(request.id)}
                  colorPalette={{
                    primary: "#3C7EFC",
                    dark: "#404258",
                    medium: "#474E68",
                    light: "#6B728E",
                    background: "#F5F5F9",
                    white: "#FFFFFF"
                  }}
                />
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
    </Layout>
  );
};

export default AdminDashboard;