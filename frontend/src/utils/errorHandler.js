export const getErrorMessage = (error, fallback = 'Something went wrong') => {
  // No response from server (network issue)
  if (error.request && !error.response) {
    return 'Cannot reach server. Please check your internet or backend URL.';
  }

  // Server responded with error
  if (error.response) {
    const data = error.response.data;

    if (data?.detail) {
      if (typeof data.detail === 'string') return data.detail;
      if (Array.isArray(data.detail)) {
        return data.detail.map(d => d.msg || 'Invalid input').join('\n');
      }
    }
    if (error.response.status === 401) return 'Unauthorized. Please login again.';
    if (error.response.status === 400) return 'Bad request.';
    if (error.response.status >= 500) return 'Server error. Try again later.';
  }

  return fallback;
};
