export const getAllOrders = () => async (dispatch) => {
    try {
        dispatch({ type: 'order/getAllOrders/pending' });
        const response = await axios.get(`${getBaseUrl()}/orders`, {
            headers: {
                "Content-Type": "application/json",
            },
            withCredentials: true,
        });
        dispatch({ 
            type: 'order/getAllOrders/fulfilled', 
            payload: response.data.data 
        });
    } catch (error) {
        dispatch({ 
            type: 'order/getAllOrders/rejected', 
            payload: error.message 
        });
    }
}; 