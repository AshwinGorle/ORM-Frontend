export const loadOrdersFromStorage = () => {
  try {
    const orders = localStorage.getItem('orders');
    return orders ? JSON.parse(orders) : { new: [], inProgress: [], completed: [] };
  } catch (error) {
    console.error('Error loading orders from localStorage:', error);
    return { new: [], inProgress: [], completed: [] };
  }
};

export const saveOrdersToStorage = (orders) => {
  try {
    localStorage.setItem('orders', JSON.stringify(orders));
  } catch (error) {
    console.error('Error saving orders to localStorage:', error);
  }
}; 