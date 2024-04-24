function logResponseBody(details) {
  if (details.url.includes("example.com")) {
    const responseBody = details.response.arrayBuffer();
    // process the response body here
    console.log(`Response Body: ${responseBody}`);
  }
}

browser.webRequest.onCompleted.addListener(
  logResponseBody,
  { urls: ["<all_urls>"] },
  ["response"]
);
