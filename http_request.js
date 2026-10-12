import axios from "axios";

// Demoblaze API endpoint from which product data is retrieved.
const apiUrl = "https://api.demoblaze.com/entries";

export async function getProducts() {
	// Returns the response body of the GET request to the caller.
	const response = await axios.get(apiUrl);
	return response.data;
}
