async function fetchQuestionAPI(handleResponse, handleError, setloading) {
  setloading(true);
  try {
    const baseURL = import.meta.VITE_APP_API_BASE_URL;
    const endPoint = "/api/v1/questions";

    const url = new URL(endPoint, baseURL);

    const response = await fetch(url);
    const jsonData = await response.json();

    if (!response.ok) {
      const errorMessage = jsonData.message || "Unknown error occured";
      throw new Error(error);
    }
    handleResponse(jsonData);
  } catch (error) {
    handleError(error);
  } finally {
    setloading(false);
  }
}

export default fetchQuestionAPI;
