import api from "../api/axios-instance";


  const fetchProperties =
  async () => {
  try {
    const response = await api.get('/api/properties');
    const fetchedProperties = response.data;
    return fetchedProperties;
  } catch (error) {
    console.error('Error fetching properties:', error);
    throw error;
  }
}


export default fetchProperties;
