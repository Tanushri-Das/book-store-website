export const getCarts = async (email: string) => {
  try {
    const response = await fetch(`./my-bookings/api/${email}`); // Corrected the fetch URL
    const data = await response.json();
    console.log("carts", data.mybookings); // Log the data to ensure it's correct
    return data.mybookings; // Ensure this matches your API response structure
  } catch (error) {
    console.error("Failed to fetch cart value:", error);
    return [];
  }
};
