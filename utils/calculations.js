export const calculateOrderTotal = (order) => {
    if (!order?.dishes || !Array.isArray(order.dishes)) {
      return 0;
    }
    
    return order.dishes.reduce((sum, dish) => {
      const price = Number(dish?.dishId?.price) || 0;
      const quantity = Number(dish?.quantity) || 0;
      return sum + (price * quantity);
    }, 0);
  };
  
  export const calculateMultipleOrdersTotal = (orders) => {
    if (!Array.isArray(orders)) {
      return 0;
    }
    
    return orders.reduce((sum, order) => {
      return sum + calculateOrderTotal(order);
    }, 0);
  };
  