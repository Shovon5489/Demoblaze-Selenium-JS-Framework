import axios from "axios";

// Demoblaze API endpoint, jar theke product data ana hoy.
const apiUrl = "https://api.demoblaze.com/entries";

export async function getProducts() {
	// GET request-er response body caller-ke return kore.
	const response = await axios.get(apiUrl);
	return response.data;
}
