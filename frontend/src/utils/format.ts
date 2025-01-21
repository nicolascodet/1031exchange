export function formatCurrency(value: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(value);
}

export function formatPropertyType(type: string): string {
  return type.charAt(0).toUpperCase() + type.slice(1);
}

export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(date);
}

export const formatSquareFootage = (value: number): string => {
  return `${value.toLocaleString()} sq ft`;
};

export const formatPercentage = (value: number): string => {
  return `${(value * 100).toFixed(1)}%`;
};

export const formatStatus = (status: string): string => {
  return status.charAt(0).toUpperCase() + status.slice(1);
};

export const formatPriceDifference = (difference: number): string => {
  const prefix = difference > 0 ? '+' : '';
  return prefix + formatCurrency(difference);
}; 