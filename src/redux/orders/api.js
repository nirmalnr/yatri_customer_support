const KEY = "";
const URL = "http://localhost";

const fetchOrders = async params => {
    let apiUrl = `${URL}/orders?`;
    for (const property in params) {
        apiUrl += `${property}=${params[property]}&`
    }
    apiUrl = baseUrl.slice(0, -1); // Removing the trailing &
    console.log(apiUrl);
    const response = await fetch(apiUrl);
    const data = await response.json();
    if(response.status >= 400) {
        throw new Error(data.errors);
    }
    return data;
}