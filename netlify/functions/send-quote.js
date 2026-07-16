const TELEGRAM_API_URL = 'https://api.telegram.org';
const MAX_TELEGRAM_MESSAGE_LENGTH = 4096;

const PROPERTY_TYPE_LABELS = Object.freeze({
  residential: 'Résidentielle',
  commercial: 'Commerciale',
});

const SERVICE_LABELS = Object.freeze({
  'window-cleaning': 'Nettoyage de vitres, intérieur et extérieur',
  'gutter-cleaning': 'Nettoyage des gouttières, intérieur et extérieur',
  'soffit-cleaning': 'Nettoyage des soffites',
  'siding-cleaning': 'Nettoyage du revêtement extérieur',
  'pressure-washing': 'Lavage à pression',
  'roof-cleaning': 'Nettoyage de toiture',
  'paver-cleaning': 'Nettoyage de pavé uni',
  'pesticide-application': 'Application de pesticides',
  'branch-cutting': 'Coupe de branches',
  'polymeric-sand': 'Installation et remplacement de sable polymère',
});

const FIELD_LIMITS = Object.freeze({
  firstName: 100,
  lastName: 100,
  phone: 40,
  email: 160,
  address: 250,
  municipality: 120,
  details: 2500,
});

const jsonResponse = (statusCode, body) => ({
  statusCode,
  headers: {
    'Content-Type': 'application/json; charset=utf-8',
    'Cache-Control': 'no-store',
  },
  body: JSON.stringify(body),
});

const isPlainObject = (value) =>
  Boolean(value) && typeof value === 'object' && !Array.isArray(value);

const boundedString = (value, maximumLength) =>
  (typeof value === 'string' ? value.trim() : '').slice(0, maximumLength);

const escapeHtml = (value) =>
  value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');

const parsePayload = (event) => {
  if (!event.body) return null;

  try {
    const payload = JSON.parse(event.body);
    return isPlainObject(payload) ? payload : null;
  } catch {
    return null;
  }
};

const normalizePayload = (rawPayload) => {
  const propertyType = boundedString(rawPayload.propertyType, 40);
  const rawServices = isPlainObject(rawPayload.services)
    ? rawPayload.services
    : {};
  const services = Object.keys(SERVICE_LABELS).filter(
    (serviceKey) => rawServices[serviceKey] === true
  );

  return {
    firstName: boundedString(rawPayload.firstName, FIELD_LIMITS.firstName),
    lastName: boundedString(rawPayload.lastName, FIELD_LIMITS.lastName),
    phone: boundedString(rawPayload.phone, FIELD_LIMITS.phone),
    email: boundedString(rawPayload.email, FIELD_LIMITS.email),
    address: boundedString(rawPayload.address, FIELD_LIMITS.address),
    municipality: boundedString(
      rawPayload.municipality,
      FIELD_LIMITS.municipality
    ),
    propertyType: Object.hasOwn(PROPERTY_TYPE_LABELS, propertyType)
      ? propertyType
      : '',
    services,
    details: boundedString(rawPayload.details, FIELD_LIMITS.details),
    consent: rawPayload.consent === true,
    botField: boundedString(rawPayload.botField, 200),
  };
};

const isValidPayload = (payload) =>
  Boolean(
    payload.firstName &&
      payload.lastName &&
      payload.phone &&
      payload.email &&
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(payload.email) &&
      payload.address &&
      payload.municipality &&
      payload.propertyType &&
      payload.services.length > 0 &&
      payload.consent
  );

const buildTelegramMessage = (payload) => {
  const fullName = `${payload.firstName} ${payload.lastName}`;
  const services = payload.services
    .map((serviceKey) => `• ${escapeHtml(SERVICE_LABELS[serviceKey])}`)
    .join('\n');
  const locationQuery = encodeURIComponent(
    `${payload.address}, ${payload.municipality}`
  );
  const details = payload.details || 'Aucune précision supplémentaire.';

  const message = [
    '<b>Nouvelle demande de soumission</b>',
    '',
    `<b>👤 ${escapeHtml(fullName)}</b>`,
    `📞 ${escapeHtml(payload.phone)}`,
    `✉️ ${escapeHtml(payload.email)}`,
    '',
    '<b>🏠 Travaux</b>',
    escapeHtml(payload.address),
    escapeHtml(payload.municipality),
    `🏢 ${escapeHtml(
      PROPERTY_TYPE_LABELS[payload.propertyType]
    )}`,
    '',
    '<b>🧽 Services souhaités</b>',
    services,
    '',
    '<b>📝 Précisions supplémentaires</b>',
    escapeHtml(details),
    '',
    `📍 <a href="https://www.google.com/maps/search/?api=1&amp;query=${locationQuery}">Ouvrir dans Google Maps</a>`,
  ].join('\n');

  if (message.length <= MAX_TELEGRAM_MESSAGE_LENGTH) return message;

  const suffix = '\n…[message tronqué]';
  return `${message.slice(
    0,
    MAX_TELEGRAM_MESSAGE_LENGTH - suffix.length
  )}${suffix}`;
};

export const handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return jsonResponse(405, { error: 'Method not allowed' });
  }

  const rawPayload = parsePayload(event);
  if (!rawPayload) {
    return jsonResponse(400, { error: 'Invalid request' });
  }

  const payload = normalizePayload(rawPayload);
  if (payload.botField) {
    return jsonResponse(200, { success: true });
  }

  if (!isValidPayload(payload)) {
    return jsonResponse(400, { error: 'Invalid request' });
  }

  const botId = process.env.TELEGRAM_BOT_ID;
  const channelId = process.env.TELEGRAM_CHANNEL_ID;
  if (!botId || !channelId) {
    console.error('Telegram configuration is missing.');
    return jsonResponse(500, { error: 'Server configuration error' });
  }

  try {
    const response = await fetch(
      `${TELEGRAM_API_URL}/bot${botId}/sendMessage`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chat_id: channelId,
          text: buildTelegramMessage(payload),
          parse_mode: 'HTML',
          disable_web_page_preview: true,
        }),
        signal: AbortSignal.timeout(10000),
      }
    );

    const telegramResult = await response.json().catch(() => null);
    if (!response.ok || telegramResult?.ok !== true) {
      console.error('Telegram rejected the quote notification.', {
        status: response.status,
        errorCode: telegramResult?.error_code,
      });
      return jsonResponse(502, { error: 'Notification delivery failed' });
    }

    return jsonResponse(200, { success: true });
  } catch (error) {
    console.error('Telegram quote notification failed.', {
      name: error instanceof Error ? error.name : 'UnknownError',
    });
    return jsonResponse(502, { error: 'Notification delivery failed' });
  }
};
