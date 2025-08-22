const validateAnswerAPI = async (
  qId,
  answer,
  handleResponse,
  handleError,
  setLoading
) => {
  setLoading(true);
  try {
    const baseURL = import.meta.VITE_APP_API_BASE_URL;
    const endPoint = "/api/v1/questions/validate-answer";

    const url = new URL(endPoint, baseURL);

    const requestBody = JSON.stringify({
      qId: qId,
      answer,
    });

    const requestOptions = {
      method: "POST",
      header: {
        "Content-Type": "application/json",
      },
      body: requestBody,
    };

    const response = await fetch(url, requestOptions);
    const jsonData = await response.json();

    if (!response.ok) {
      const errorMessage = jsonData.message || "unknown error occured";
      throw new AggregateError(errorMessage);
    }
    handleResponse(jsonData);
  } catch (error) {
    handleError(error);
  } finally {
    setLoading(false);
  }
};

export default validateAnswerAPI;
