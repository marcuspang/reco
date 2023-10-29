import pg from "pg";

const pool = new pg.Pool({
  connectionString: process.env.DATABASE_URL,
});

export async function getDiscordUserAddress(name) {
  try {
    const res = await pool.query('SELECT * FROM "User" WHERE name=$1', [name]);

    if (res.rows.length === 0) {
      return;
    }

    return res.rows[0]["address"];
  } catch (e) {
    console.log("Error fetching discord user", e);
  }
}

export async function setWelcomeMessage(
  guildId,
  channelId,
  message,
  isEnabled = true
) {
  await pool.query(
    'INSERT INTO "ServerWelcomeMessage" (id, "guildId", message, "isEnabled") VALUES ($1, $2, $3, $4) ON CONFLICT (id) DO UPDATE SET message = $3, "guildId" = $2, "isEnabled" = $4',
    [channelId, guildId, message, isEnabled]
  );
}

export async function getWelcomeMessage(guildId, channelId) {
  const response = await pool.query(
    'SELECT * FROM "ServerWelcomeMessage" WHERE id=$1 AND "guildId"=$2',
    [channelId, guildId]
  );
  if (response.rows.length === 0) {
    return;
  }
  return response.rows[0];
}
