export async function onRequest(context) {
  // Get the URL from the query parameter
  const url = new URL(context.request.url).searchParams.get('url');

  if (!url) {
    return new Response('URL parameter is missing', { status: 400 });
  }

  // Make a HEAD request to the target URL
  const response = await fetch(url, {
    method: 'HEAD',
    headers: {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
    }
  });

  // Get the 'Date' header from the response
  const serverDate = response.headers.get('Date');

  if (!serverDate) {
    return new Response('Could not get Date header from the target server.', { status: 404 });
  }

  // Create a new response with the Date header and appropriate CORS headers
  const newHeaders = new Headers({
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'HEAD, GET, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Date': serverDate,
  });

  return new Response(null, {
    status: 200,
    headers: newHeaders
  });
}
