const API_URL = "https://localhost:5000/api/rectangle"; // Update with your API URL

export const fetchRectangle = async () => {
  try {
    const response = await fetch(API_URL);
    if (!response.ok) {
      throw new Error("Failed to fetch rectangle data");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching rectangle:", error);
    throw error;
  }
};

export const updateRectangle = async (rectangle) => {
    try {
      const response = await fetch(API_URL, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          x: rectangle.x,
          y: rectangle.y,
          width: rectangle.width,
          height: rectangle.height,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to update rectangle");
      }

      // Parse the response as JSON
      const data = await response.json();
      return data;  // data will now be { message: "Rectangle dimensions saved." }
    } catch (error) {
      console.error("Error updating rectangle:", error);
      throw error;
    }
  };
