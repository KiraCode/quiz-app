async function apiRequest(options) {
  // destructure the options object to get the endpoint, method, include auth and body
  const {
    endpoint,
    method = "GET",
    includeAuth = true,
    body = undefined,
  } = options;

  //   create a new header object
  const headers = new Headers();

  //   if the body is an object, set the "Content-Type" header to application/json and stringify the body
  let requestBody = body;
  if (body && typeof body === "object") {
    headers.append("COntent-type", "application/json");
    requestBody = JSON.stringify(requestBody);
  }

  //   if includeAuth is true and there is an access token in localStorage, append in "Authorization header with access token"
  if (includeAuth && localStorage.getItem("accessToken")) {
    headers.append(
      "Authorization",
      `Bearer ${localStorage.getItem("accessToken")}`
    );
  }

  // create a new URL object with the base URL from the environment variable and the endpoints
  const baseUrl = import.meta.env.VITE_API_BASE_URL;
  const url = new URL(endpoint, baseUrl);

  // make a fetch request to the API endpoint with specific methods, headers and body

  const response = await fetch(url, {
    method,
    headers,
    body: requestBody,
  });

  // return the response from the API
  return response;
}

export default apiResult;
