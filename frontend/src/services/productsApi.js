const API_URL = "http://localhost:8000/api";
const HEADERS = {
  "Content-Type": "application/json",
};

export async function fetchProducts() {
  const response = await fetch(`${API_URL}/products/`, HEADERS);

  if (!response.ok) {
    throw new Error("Failed to fetch products");
  }

  const data = await response.json();

  return data;
}

export async function fetchCartItems() {
  const response = await fetch(`${API_URL}/cart/`, HEADERS);

  if (!response.ok) {
    throw new Error("Failed to fetch products");
  }

  const data = await response.json();

  return data;
}

export async function postCartItem(item) {
  const response = await fetch(`${API_URL}/cart/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      product: item.id,
      quantity: 1,
    }),
  });

  if (!response.ok) {
    throw new Error("Failed to fetch products");
  }
}

export async function patchCartItem(item, method) {
  let newQty = item.quantity + 1;
  if (method === "DECREMENT") newQty = item.quantity - 1;

  const response = await fetch(`${API_URL}/cart/${item.id}/`, {
    method: "PATCH",
    headers: HEADERS,
    body: JSON.stringify({
      quantity: newQty,
    }),
  });

  if (!response.ok) {
    throw new Error("Failed to fetch products");
  }

  return response;
}

export async function deleteCartItem(item) {
  const response = await fetch(`${API_URL}/cart/${item.id}/`, {
    method: "DELETE",
    headers: HEADERS,
  });

  if (!response.ok) {
    throw new Error("Failed to fetch products");
  }

  return response;
}
