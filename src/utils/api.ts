export async function fetchDashboardData() {
  try {
    const response = await fetch('/api/admin/dashboard/stats', {
      credentials: 'include',
    });
    if (!response.ok) throw new Error('Failed to fetch dashboard data');
    return await response.json();
  } catch (error) {
    console.error('Dashboard data fetch error:', error);
    throw error;
  }
}

export async function logout() {
  try {
    const response = await fetch('/api/admin/auth/logout', {
      method: 'POST',
      credentials: 'include',
    });
    if (!response.ok) throw new Error('Logout failed');
    window.location.href = '/admin/login';
  } catch (error) {
    console.error('Logout error:', error);
    throw error;
  }
}