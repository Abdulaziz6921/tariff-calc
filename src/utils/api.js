export const fetchTariffs = async () => {
  try {
    const response = await fetch("https://t-core.fit-hub.pro/Test/GetTariffs");
    if (!response.ok) {
      throw new Error("Failed to fetch tariffs");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching tariffs:", error);
  }
};
