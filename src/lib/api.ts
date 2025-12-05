const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// Helper function to get auth token
const getToken = (): string | null => {
  return localStorage.getItem('auth_token');
};

// Helper function to set auth token
export const setToken = (token: string): void => {
  localStorage.setItem('auth_token', token);
};

// Helper function to remove auth token
export const removeToken = (): void => {
  localStorage.removeItem('auth_token');
};

// Generic API request function
async function apiRequest<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const token = getToken();
  const url = `${API_BASE_URL}${endpoint}`;

  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    ...options.headers,
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  try {
    const response = await fetch(url, {
      ...options,
      headers,
    });

    if (!response.ok) {
      let errorMessage = 'An error occurred';
      try {
        const error = await response.json();
        errorMessage = error.message || error.error || `HTTP error! status: ${response.status}`;
      } catch {
        errorMessage = `HTTP error! status: ${response.status}`;
      }
      throw new Error(errorMessage);
    }

    return response.json();
  } catch (error: any) {
    // Handle network errors (backend not running, CORS, etc.)
    if (error.name === 'TypeError' && (error.message.includes('fetch') || error.message.includes('Failed to fetch'))) {
      throw new Error(`Cannot connect to server at ${API_BASE_URL}. Please make sure the backend is running on http://localhost:5000`);
    }
    throw error;
  }
}

// Auth API
export const authAPI = {
  register: async (email: string, password: string, name: string) => {
    const data = await apiRequest<any>('/auth/register', {
      method: 'POST',
      body: JSON.stringify({ email, password, name }),
    });
    // Support both flat responses { id,name,email,token } and nested { user: {..}, token }
    const token = data.token || (data.user && data.user.token) || null;
    if (token) setToken(token);
    return data;
  },

  login: async (email: string, password: string) => {
    const data = await apiRequest<any>('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
    const token = data.token || (data.user && data.user.token) || null;
    if (token) setToken(token);
    return data;
  },

  getMe: async () => {
    // `/auth/me` may return a flat user object or { user: {...} }
    const data = await apiRequest<any>('/auth/me');
    if (data.user) return data.user;
    return data;
  },
};

// Accounts API
export const accountsAPI = {
  getAll: async () => {
    return apiRequest<any[]>('/accounts');
  },

  getById: async (id: string) => {
    return apiRequest<any>(`/accounts/${id}`);
  },

  create: async (name: string, type: 'checking' | 'savings' | 'credit', initialBalance?: number) => {
    return apiRequest<any>('/accounts', {
      method: 'POST',
      body: JSON.stringify({ name, type, initialBalance }),
    });
  },

  update: async (id: string, data: { name?: string; status?: string }) => {
    return apiRequest<any>(`/accounts/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  },

  delete: async (id: string) => {
    return apiRequest<{ message: string }>(`/accounts/${id}`, {
      method: 'DELETE',
    });
  },
};

// Transactions API
export const transactionsAPI = {
  getAll: async (params?: { status?: string; type?: string; limit?: number }) => {
    const queryString = params ? '?' + new URLSearchParams(params as any).toString() : '';
    return apiRequest<any[]>(`/transactions${queryString}`);
  },

  getById: async (id: string) => {
    return apiRequest<any>(`/transactions/${id}`);
  },

  create: async (data: {
    fromAccount?: string;
    toAccount?: string;
    amount: number;
    description: string;
    type?: string;
    category?: string;
  }) => {
    return apiRequest<any>('/transactions', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  approve: async (id: string) => {
    return apiRequest<any>(`/transactions/${id}/approve`, {
      method: 'POST',
    });
  },

  reject: async (id: string) => {
    return apiRequest<any>(`/transactions/${id}/reject`, {
      method: 'POST',
    });
  },
};

// Rewards API
export const rewardsAPI = {
  getProfile: async () => {
    return apiRequest<any>('/rewards/profile');
  },

  checkIn: async () => {
    return apiRequest<{ success: boolean; message: string; points?: number; profile: any }>('/rewards/check-in', {
      method: 'POST',
    });
  },

  getQuests: async () => {
    return apiRequest<any[]>('/rewards/quests');
  },

  initializeQuests: async () => {
    return apiRequest<any[]>('/rewards/quests/initialize', {
      method: 'POST',
    });
  },

  getBadges: async () => {
    return apiRequest<any[]>('/rewards/badges');
  },

  getEvents: async (limit?: number) => {
    const queryString = limit ? `?limit=${limit}` : '';
    return apiRequest<any[]>(`/rewards/events${queryString}`);
  },

  getLevelInfo: async () => {
    return apiRequest<any>('/rewards/level-info');
  },
};

// Admin API
export const adminAPI = {
  getUsers: async () => {
    return apiRequest<any[]>('/admin/users');
  },

  getAccounts: async () => {
    return apiRequest<any[]>('/admin/accounts');
  },

  getTransactions: async (params?: { status?: string; limit?: number }) => {
    const queryString = params ? '?' + new URLSearchParams(params as any).toString() : '';
    return apiRequest<any[]>(`/admin/transactions${queryString}`);
  },

  approveTransaction: async (id: string) => {
    return apiRequest<any>(`/admin/transactions/${id}/approve`, {
      method: 'POST',
    });
  },

  rejectTransaction: async (id: string) => {
    return apiRequest<any>(`/admin/transactions/${id}/reject`, {
      method: 'POST',
    });
  },

  getStats: async () => {
    return apiRequest<any>('/admin/stats');
  },
};

