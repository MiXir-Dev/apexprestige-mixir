const HTTP_METHOD = Object.freeze({
  OPTIONS: 'OPTIONS',
  POST: 'POST',
});

const HTTP_STATUS = Object.freeze({
  OK: 200,
  NO_CONTENT: 204,
  BAD_REQUEST: 400,
  FORBIDDEN: 403,
  METHOD_NOT_ALLOWED: 405,
  BAD_GATEWAY: 502,
  INTERNAL_SERVER_ERROR: 500,
});

const CONTENT_TYPE = Object.freeze({
  JSON: 'application/json',
});

const TELEGRAM = Object.freeze({
  API_BASE_URL: 'https://api.telegram.org',
  SEND_MESSAGE_PATH: 'sendMessage',
  PARSE_MODE: Object.freeze({
    HTML: 'HTML',
  }),
  MAX_MESSAGE_LENGTH: 4096,
});

const RESPONSE_MESSAGE = Object.freeze({
  METHOD_NOT_ALLOWED: 'Method not allowed',
  INVALID_REQUEST: 'Invalid request',
  FORBIDDEN_ORIGIN: 'Forbidden origin',
  SERVER_ERROR: 'Server error',
});

const FALLBACK_LABEL = Object.freeze({
  UNKNOWN: 'Non précisé',
  NO_MESSAGE: 'Aucun message.',
  NO_SERVICE: 'Aucun service sélectionné',
  NO_ADDRESS: 'Non précisée',
});

const FIELD_LIMITS = Object.freeze({
  name: 120,
  email: 160,
  phone: 40,
  address: 200,
  city: 100,
  floors: 40,
  message: 2500,
});

const BUILDING_TYPE_LABELS = Object.freeze({
  residential: 'Résidentiel',
  commercial: 'Commercial',
  industrial: 'Industriel',
});

const SERVICE_LABELS = Object.freeze({
  exteriorWindows: 'Nettoyage de vitres extérieur',
  interiorWindows: 'Nettoyage de vitres intérieur',
  gutterCleaning: 'Vidage de gouttières',
});

const SERVICE_KEYS = Object.freeze(Object.keys(SERVICE_LABELS));
const BUILDING_TYPE_KEYS = Object.freeze(Object.keys(BUILDING_TYPE_LABELS));

/**
 * @typedef {Object} SubmissionPayload
 * @property {string} name
 * @property {string} email
 * @property {string} phone
 * @property {string} address
 * @property {string} city
 * @property {string} buildingType
 * @property {string} floors
 * @property {string} message
 * @property {Record<string, boolean>} services
 */

class AppError extends Error {
  /**
   * @param {number} statusCode
   * @param {string} publicMessage
   * @param {string} code
   */
  constructor(statusCode, publicMessage, code) {
    super(publicMessage);
    this.name = 'AppError';
    this.statusCode = statusCode;
    this.publicMessage = publicMessage;
    this.code = code;
  }
}

/**
 * @param {unknown} value
 * @returns {value is Record<string, unknown>}
 */
function isPlainObject(value) {
  return Boolean(value) && typeof value === 'object' && !Array.isArray(value);
}

/**
 * @param {unknown} value
 * @returns {string}
 */
function toTrimmedString(value) {
  return typeof value === 'string' ? value.trim() : '';
}

/**
 * @param {unknown} value
 * @param {number} maxLength
 * @returns {string}
 */
function toBoundedString(value, maxLength) {
  const normalized = toTrimmedString(value);
  return normalized.slice(0, maxLength);
}

/**
 * @param {Record<string, unknown> | undefined} headers
 * @param {string} name
 * @returns {string}
 */
function getHeaderValue(headers, name) {
  if (!isPlainObject(headers)) {
    return '';
  }

  const target = name.toLowerCase();

  for (const [key, value] of Object.entries(headers)) {
    if (key.toLowerCase() !== target) {
      continue;
    }

    if (Array.isArray(value)) {
      return toTrimmedString(String(value[0] || ''));
    }

    return toTrimmedString(String(value));
  }

  return '';
}

/**
 * @param {string} value
 * @returns {string}
 */
function escapeHtml(value) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

/**
 * @param {string} value
 * @returns {string}
 */
function truncate(value) {
  if (value.length <= TELEGRAM.MAX_MESSAGE_LENGTH) {
    return value;
  }

  const suffix = '\n...[message tronqué]';
  return `${value.slice(0, TELEGRAM.MAX_MESSAGE_LENGTH - suffix.length)}${suffix}`;
}

/**
 * @param {string} email
 * @returns {boolean}
 */
function isLikelyEmail(email) {
  if (!email) {
    return false;
  }
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

/**
 * @param {unknown} rawServices
 * @returns {Record<string, boolean>}
 */
function normalizeServices(rawServices) {
  if (!isPlainObject(rawServices)) {
    return {};
  }

  /** @type {Record<string, boolean>} */
  const normalized = {};

  for (const key of SERVICE_KEYS) {
    normalized[key] = Boolean(rawServices[key]);
  }

  return normalized;
}

/**
 * @param {unknown} rawPayload
 * @returns {SubmissionPayload}
 */
function normalizePayload(rawPayload) {
  if (!isPlainObject(rawPayload)) {
    throw new AppError(
      HTTP_STATUS.BAD_REQUEST,
      RESPONSE_MESSAGE.INVALID_REQUEST,
      'INVALID_PAYLOAD_SHAPE'
    );
  }

  const buildingTypeRaw = toBoundedString(rawPayload.buildingType, 40);
  const buildingType = BUILDING_TYPE_KEYS.includes(buildingTypeRaw)
    ? buildingTypeRaw
    : '';

  const normalized = {
    name: toBoundedString(rawPayload.name, FIELD_LIMITS.name),
    email: toBoundedString(rawPayload.email, FIELD_LIMITS.email),
    phone: toBoundedString(rawPayload.phone, FIELD_LIMITS.phone),
    address: toBoundedString(rawPayload.address, FIELD_LIMITS.address),
    city: toBoundedString(rawPayload.city, FIELD_LIMITS.city),
    buildingType,
    floors: toBoundedString(rawPayload.floors, FIELD_LIMITS.floors),
    message: toBoundedString(rawPayload.message, FIELD_LIMITS.message),
    services: normalizeServices(rawPayload.services),
  };

  if (normalized.email && !isLikelyEmail(normalized.email)) {
    normalized.email = '';
  }

  return normalized;
}

/**
 * @param {Record<string, boolean>} services
 * @returns {string}
 */
function formatServices(services) {
  const selected = SERVICE_KEYS
    .filter((key) => services[key])
    .map((key) => `• ${escapeHtml(SERVICE_LABELS[key])}`);

  return selected.length > 0 ? selected.join('\n') : FALLBACK_LABEL.NO_SERVICE;
}

/**
 * @param {SubmissionPayload} payload
 * @returns {string}
 */
function buildGoogleMapsUrl(payload) {
  const query = [payload.address, payload.city].filter(Boolean).join(', ');
  if (!query) {
    return '';
  }
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;
}

/**
 * @param {SubmissionPayload} payload
 * @returns {string}
 */
function buildTelegramMessage(payload) {
  const safeName = escapeHtml(payload.name || FALLBACK_LABEL.UNKNOWN);
  const safePhone = escapeHtml(payload.phone || FALLBACK_LABEL.UNKNOWN);
  const safeEmail = escapeHtml(payload.email || FALLBACK_LABEL.UNKNOWN);
  const safeAddress = escapeHtml(payload.address || FALLBACK_LABEL.NO_ADDRESS);
  const safeFloors = escapeHtml(payload.floors);
  const safeMessage = escapeHtml(payload.message || FALLBACK_LABEL.NO_MESSAGE);
  const buildingLabel = payload.buildingType
    ? BUILDING_TYPE_LABELS[payload.buildingType]
    : FALLBACK_LABEL.UNKNOWN;
  const safeBuildingType = escapeHtml(buildingLabel || FALLBACK_LABEL.UNKNOWN);
  const servicesText = formatServices(payload.services);
  const mapUrl = buildGoogleMapsUrl(payload);
  const escapedMapUrl = escapeHtml(mapUrl);

  const lines = [
    '<b>Nouvelle soumission Mr. Clear</b>',
    '',
    '<b>Client</b>',
    `Nom: ${safeName}`,
    `Téléphone: ${safePhone}`,
    `Courriel: ${safeEmail}`,
    '',
    '<b>Localisation</b>',
    `📍 ${safeAddress}`,
    ...(mapUrl ? [`<a href="${escapedMapUrl}">Ouvrir dans Google Maps</a>`] : []),
    `Type de bâtiment: ${safeBuildingType}`,
  ];

  if (safeFloors) {
    lines.push(`Étages: ${safeFloors}`);
  }

  lines.push('', '<b>Services demandés</b>', servicesText, '', '<b>Détails</b>', safeMessage);

  return truncate(lines.join('\n'));
}

/**
 * @param {string | undefined} rawOrigins
 * @returns {string[]}
 */
function parseAllowedOrigins(rawOrigins) {
  return (rawOrigins || '')
    .split(',')
    .map((origin) => origin.trim())
    .filter(Boolean);
}

/**
 * @param {string} requestOrigin
 * @param {string[]} allowedOrigins
 * @returns {boolean}
 */
function isOriginAllowed(requestOrigin, allowedOrigins) {
  if (allowedOrigins.length === 0) {
    return true;
  }

  return Boolean(requestOrigin) && allowedOrigins.includes(requestOrigin);
}

/**
 * @param {string} requestOrigin
 * @param {string[]} allowedOrigins
 * @returns {string}
 */
function resolveCorsOrigin(requestOrigin, allowedOrigins) {
  if (allowedOrigins.length === 0) {
    return '*';
  }

  return isOriginAllowed(requestOrigin, allowedOrigins) ? requestOrigin : 'null';
}

/**
 * @param {string} origin
 * @returns {Record<string, string>}
 */
function buildCorsHeaders(origin) {
  return {
    'Access-Control-Allow-Origin': origin,
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': `${HTTP_METHOD.POST}, ${HTTP_METHOD.OPTIONS}`,
    'Content-Type': CONTENT_TYPE.JSON,
  };
}

/**
 * @param {number} statusCode
 * @param {Record<string, unknown>} body
 * @param {string} origin
 * @returns {{statusCode: number, headers: Record<string, string>, body: string}}
 */
function jsonResponse(statusCode, body, origin) {
  return {
    statusCode,
    headers: buildCorsHeaders(origin),
    body: JSON.stringify(body),
  };
}

/**
 * @param {string} origin
 * @returns {{statusCode: number, headers: Record<string, string>, body: string}}
 */
function noContentResponse(origin) {
  return {
    statusCode: HTTP_STATUS.NO_CONTENT,
    headers: buildCorsHeaders(origin),
    body: '',
  };
}

/**
 * @param {Record<string, string | undefined>} env
 * @returns {{botToken: string, channelId: string}}
 */
function getTelegramConfig(env) {
  const botToken = toTrimmedString(env.TELEGRAM_BOT_TOKEN);
  const channelId = toTrimmedString(env.TELEGRAM_CHANNEL_ID);

  if (!botToken || !channelId) {
    throw new AppError(
      HTTP_STATUS.INTERNAL_SERVER_ERROR,
      RESPONSE_MESSAGE.SERVER_ERROR,
      'MISSING_TELEGRAM_CONFIG'
    );
  }

  return { botToken, channelId };
}

/**
 * @param {unknown} rawBody
 * @returns {unknown}
 */
function parseRequestBody(rawBody) {
  if (!rawBody) {
    return {};
  }

  if (typeof rawBody === 'string') {
    try {
      return JSON.parse(rawBody);
    } catch {
      throw new AppError(
        HTTP_STATUS.BAD_REQUEST,
        RESPONSE_MESSAGE.INVALID_REQUEST,
        'INVALID_JSON'
      );
    }
  }

  return rawBody;
}

/**
 * @param {{botToken: string, channelId: string}} config
 * @param {string} text
 * @returns {Promise<void>}
 */
async function sendTelegramMessage(config, text) {
  const url = `${TELEGRAM.API_BASE_URL}/bot${config.botToken}/${TELEGRAM.SEND_MESSAGE_PATH}`;

  const response = await fetch(url, {
    method: HTTP_METHOD.POST,
    headers: {
      'Content-Type': CONTENT_TYPE.JSON,
    },
    body: JSON.stringify({
      chat_id: config.channelId,
      text,
      parse_mode: TELEGRAM.PARSE_MODE.HTML,
      disable_web_page_preview: true,
    }),
  });

  if (!response.ok) {
    const providerError = await response.text();
    logError('TELEGRAM_API_ERROR', {
      status: response.status,
      response: providerError.slice(0, 500),
    });

    throw new AppError(
      HTTP_STATUS.BAD_GATEWAY,
      RESPONSE_MESSAGE.SERVER_ERROR,
      'TELEGRAM_SEND_FAILED'
    );
  }
}

/**
 * @param {string} code
 * @param {Record<string, unknown>} [details]
 */
function logError(code, details = {}) {
  console.error('[send-quote]', {
    code,
    ...details,
  });
}

/**
 * @param {unknown} error
 * @returns {AppError}
 */
function toAppError(error) {
  if (error instanceof AppError) {
    return error;
  }

  return new AppError(
    HTTP_STATUS.INTERNAL_SERVER_ERROR,
    RESPONSE_MESSAGE.SERVER_ERROR,
    'UNEXPECTED_ERROR'
  );
}

/**
 * @param {{headers?: Record<string, unknown>, httpMethod?: string, body?: unknown}} event
 */
export async function handler(event) {
  const requestOrigin = getHeaderValue(event?.headers, 'origin');
  const allowedOrigins = parseAllowedOrigins(process.env.ALLOWED_ORIGINS);
  const corsOrigin = resolveCorsOrigin(requestOrigin, allowedOrigins);

  try {
    const method = toTrimmedString(event?.httpMethod).toUpperCase();

    if (method === HTTP_METHOD.OPTIONS) {
      if (!isOriginAllowed(requestOrigin, allowedOrigins)) {
        return jsonResponse(
          HTTP_STATUS.FORBIDDEN,
          { error: RESPONSE_MESSAGE.FORBIDDEN_ORIGIN },
          corsOrigin
        );
      }

      return noContentResponse(corsOrigin);
    }

    if (method !== HTTP_METHOD.POST) {
      return jsonResponse(
        HTTP_STATUS.METHOD_NOT_ALLOWED,
        { error: RESPONSE_MESSAGE.METHOD_NOT_ALLOWED },
        corsOrigin
      );
    }

    if (!isOriginAllowed(requestOrigin, allowedOrigins)) {
      return jsonResponse(
        HTTP_STATUS.FORBIDDEN,
        { error: RESPONSE_MESSAGE.FORBIDDEN_ORIGIN },
        corsOrigin
      );
    }

    const telegramConfig = getTelegramConfig(process.env);
    const requestBody = parseRequestBody(event?.body);
    const payload = normalizePayload(requestBody);
    const message = buildTelegramMessage(payload);

    await sendTelegramMessage(telegramConfig, message);

    return jsonResponse(HTTP_STATUS.OK, { ok: true }, corsOrigin);
  } catch (error) {
    const appError = toAppError(error);

    logError(appError.code, {
      statusCode: appError.statusCode,
      message: appError.message,
    });

    return jsonResponse(
      appError.statusCode,
      { error: appError.publicMessage },
      corsOrigin
    );
  }
}
