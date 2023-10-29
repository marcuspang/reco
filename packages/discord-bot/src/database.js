import pg from "pg";

const pool = new pg.Pool({
  connectionString: process.env.DATABASE_URL,
});

export async function getDiscordUserAddress(name) {
  try {
    const res = await pool.query('SELECT * FROM "User" WHERE name=$1', [name]);

    await pool.end();

    if (res.rows.length === 0) {
      return;
    }

    return res.rows[0]["address"];
  } catch (e) {
    console.log("Error fetching discord user", e);
  }
}
