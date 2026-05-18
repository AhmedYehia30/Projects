export async function handler(event) {
  const apiKey =
    process.env.VITE_YELP_API_KEY || process.env.REACT_APP_YELP_API_KEY;
  if (!apiKey) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Missing Yelp API key" }),
    };
  }

  const path = event.queryStringParameters?.path || "";
  if (!path) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: "Missing path parameter" }),
    };
  }

  const params = new URLSearchParams();
  Object.entries(event.queryStringParameters || {}).forEach(([key, value]) => {
    if (key !== "path" && value !== undefined && value !== null) {
      params.set(key, value);
    }
  });

  const url = `https://api.yelp.com/v3${path}${params.toString() ? `?${params.toString()}` : ""}`;

  try {
    const response = await fetch(url, {
      method: event.httpMethod || "GET",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        Accept: "application/json",
      },
    });

    const body = await response.text();
    return {
      statusCode: response.status,
      headers: {
        "Content-Type": "application/json",
      },
      body,
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({
        error: "Yelp proxy failed",
        details: error.message,
      }),
    };
  }
}
