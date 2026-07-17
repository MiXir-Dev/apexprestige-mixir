const PHOTON_SEARCH_URL = 'https://photon.komoot.io/api';

const jsonResponse = (statusCode, body) => ({
  statusCode,
  headers: {
    'Content-Type': 'application/json; charset=utf-8',
    'Cache-Control': 'public, max-age=300, s-maxage=3600',
  },
  body: JSON.stringify(body),
});

export const handler = async (event) => {
  if (event.httpMethod !== 'GET') {
    return jsonResponse(405, { error: 'Method not allowed' });
  }

  const query = String(event.queryStringParameters?.q ?? '')
    .trim()
    .slice(0, 160);
  if (query.length < 4) {
    return jsonResponse(400, { error: 'Invalid query' });
  }

  const parameters = new URLSearchParams({
    q: query,
    limit: '5',
    lang: 'fr',
    countrycode: 'CA',
  });

  try {
    const response = await fetch(`${PHOTON_SEARCH_URL}?${parameters}`, {
      headers: { Accept: 'application/json' },
      signal: AbortSignal.timeout(8000),
    });

    if (!response.ok) {
      return jsonResponse(502, { error: 'Address search unavailable' });
    }

    const result = await response.json();
    return jsonResponse(200, {
      features: Array.isArray(result?.features) ? result.features : [],
    });
  } catch {
    return jsonResponse(502, { error: 'Address search unavailable' });
  }
};
