const domain = process.env.NEXT_PUBLIC_API_DOMAIN || null;

//to get properties from the API
async function fetchProperties({ showFeatured = false } = {}) {
  //handle the case when domain is not set
  if (!domain) {
    return [];
  }

  try {
    const response = await fetch(
      `${domain}/properties${showFeatured ? "/featured" : ""}`,
      { cache: "no-store" }
    );
    if (!response.ok) {
      return new Error("Failed to fetch properties");
    }
    return response.json();
  } catch (error) {
    console.error("Error fetching properties:", error);
    return [];
  }
}

//to get single properties from the API
async function fetchProperty(id) {
  //handle the case when domain is not set
  if (!domain) {
    return null;
  }
  try {
    const response = await fetch(`${domain}/properties/${id}`);
    if (!response.ok) {
      throw new Error("Failed to fetch properties");
    }
    return response.json();
  } catch (error) {
    console.error("Error fetching properties:", error);
    return null;
  }
}

export { fetchProperties, fetchProperty };
