const store = new Map();

export function storeDiscordTokens(userId, tokens) {
  store.set(`discord-${userId}`, tokens);
}

export async function getDiscordTokens(userId) {
  return store.get(`discord-${userId}`);
}

export function storeWelcomeMessage(guildId, channelId, message) {
  store.set(`welcome-${guildId}-${channelId}`, message);
}

export async function getWelcomeMessage(guildId, channelId) {
  return store.get(`welcome-${guildId}-${channelId}`);
}

export function setWelcomeMessage(guildId, channelId, enabled) {
  store.set(`welcome-enabled-${guildId}-${channelId}`, enabled);
}

export async function isWelcomeMessageEnabled(guildId, channelId) {
  return store.get(`welcome-enabled-${guildId}-${channelId}`);
}
