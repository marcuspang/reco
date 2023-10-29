import pg from "pg";

const pool = new pg.Pool({
  connectionString: process.env.DATABASE_URL,
});

export async function getDiscordUserAddress(name) {
  try {
    console.log("input", name);
    const res = await pool.query('SELECT * FROM "User" WHERE name=$1', [name]);

    await pool.end();
    console.log(JSON.stringify(res.rows));

    if (res.rows.length === 0) {
      return;
    }

    return res.rows[0]["address"];
  } catch (e) {
    console.log("Error fetching discord user", e);
  }
}
