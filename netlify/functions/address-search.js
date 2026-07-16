const PHOTON_SEARCH_URL = 'https://photon.komoot.io/api';
const MINIMUM_QUERY_LENGTH = 4;
const MAXIMUM_QUERY_LENGTH = 160;
const RESULT_LIMIT = 5;

const jsonResponse = (statusCode, body) => ({
  statusCode,
  headers: {
    'Content-Type': 'application/json; charset=utf-8',
    'Cache-Control': 'public, max-age=300, s-maxage=3600',
  },
  body: JSON.stringify(body),
});

const asString = (value) =>
  typeof value === 'string' ? value.trim() : '';

const getMunicipality = (properties) =>
  asString(properties.city) ||
  asString(properties.locality) ||
  asString(properties.district) ||
  asString(properties.county);

const formatSuggestion = (feature) => {
  const properties = feature?.properties;
  if (!properties || typeof properties !== 'object') return null;

  const houseNumber = asString(properties.housenumber);
  const street = asString(properties.street) || asString(properties.name);
  const municipality = getMunicipality(properties);
  const postcode = asString(properties.postcode);
  const state = asString(properties.state);
  const countryCode = asString(properties.countrycode).toUpperCase();

  if (countryCode && countryCode !== 'CA') return null;
  if (!street || !municipality) return null;

  const streetAddress = [houseNumber, street].filter(Boolean).join(' ');
  const address = [streetAddress, postcode].filter(Boolean).join(', ');
  const label = [streetAddress, municipality, state, postcode]
    .filter(Boolean)
    .join(', ');
  const osmId = String(properties.osm_id ?? '');
  const osmType = asString(properties.osm_type);

  return {
    id: `${osmType}-${osmId}-${label}`,
    address,
    municipality,
    label,
  };
};

export const handler = async (event) => {
  if (event.httpMethod !== 'GET') {
    return jsonResponse(405, { error: 'Method not allowed' });
  }

  const query = asString(event.queryStringParameters?.q).slice(
    0,
    MAXIMUM_QUERY_LENGTH
  );
  if (query.length < MINIMUM_QUERY_LENGTH) {
    return jsonResponse(400, { error: 'Invalid query' });
  }

  const parameters = new URLSearchParams({
    q: query,
    limit: String(RESULT_LIMIT),
    lang: 'fr',
    countrycode: 'CA',
  });

  try {
    const response = await fetch(`${PHOTON_SEARCH_URL}?${parameters}`, {
      headers: { Accept: 'application/json' },
      signal: AbortSignal.timeout(8000),
    });

    if (!response.ok) {
      console.error('Address provider rejected the search.', {
        status: response.status,
      });
      return jsonResponse(502, { error: 'Address search unavailable' });
    }

    const result = await response.json();
    const features = Array.isArray(result?.features) ? result.features : [];
    const suggestions = features
      .map(formatSuggestion)
      .filter(Boolean)
      .slice(0, RESULT_LIMIT);

    return jsonResponse(200, { suggestions });
  } catch (error) {
    console.error('Address search failed.', {
      name: error instanceof Error ? error.name : 'UnknownError',
    });
    return jsonResponse(502, { error: 'Address search unavailable' });
  }
};
