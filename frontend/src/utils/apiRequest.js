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
}
