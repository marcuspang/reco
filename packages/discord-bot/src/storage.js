const store = new Map();

export function storeDiscordTokens(userId, tokens) {
  store.set(`discord-${userId}`, tokens);
}

export async function getDiscordTokens(userId) {
  return store.get(`discord-${userId}`);
}
