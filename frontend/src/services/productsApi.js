const API_URL = "http://localhost:8000/api";
const headers = {
  "Content-Type": "application/json",
  "Access-Control-Allow-Headers": "Content-Type",
};

export async function fetchProducts() {
  const response = await fetch(`${API_URL}/products/`, headers);

  if (!response.ok) {
    throw new Error("Failed to fetch products");
  }

  const data = await response.json();

  return data;
}

export async function fetchCategories() {
  const response = await fetch(`${API_URL}/category/`, headers);

  // if (!response.ok) {
  //   throw new Error("Failed to fetch products");
  // }

  const data = await response.json();

  return data;
}
