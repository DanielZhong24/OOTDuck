import db from '../config/database.js';

export const getAllClothes = (): Promise<any[]> => {
  return db.any('SELECT * FROM cloth');
};

export const getAllTops = (userId: number) => {
  return db.any(
    "SELECT id, color, type, img_path FROM cloth WHERE user_id = $1 AND category = 'top'",
    [userId]
  );
};

export const getClohtesBydUserId = (userId: number) => {};

export const getClothesById = (id: number) => {
  return db.one('SELECT * FROM cloth where id = $1', [id]);
};

export const getAllBottoms = (userId: number) => {
  return db.any(
    "SELECT id, color, type, img_path FROM cloth WHERE user_id = $1 AND category = 'bottom'",
    [userId]
  );
};

export const getAllOnepieces = (userId: number) => {
  return db.any(
    "SELECT id, color, type, img_path FROM cloth WHERE user_id = $1 AND category = 'onepiece'",
    [userId]
  );
};

export const createClothes = (
  type: string,
  color: string,
  season: string,
  userId: number,
  imagePath: string,
  category: string,
  name: string
): Promise<null> => {
  return db.none(
    `INSERT INTO cloth (type,color,season,user_id,img_path,category, name) VALUES ($1,$2,$3,$4,$5,$6, $7)`,
    [type, color, season, userId, imagePath, category, `${color} ${type}`]
  );
};

export const deleteClothes = (id: number): Promise<null> => {
  return db.none(`DELETE FROM cloth WHERE id = $1`, id);
};

export const updateClothes = (id: number, name: string): Promise<null> => {
  return db.none(`UPDATE cloth SET name = $1 WHERE id = $2`, [name, id]);
};

export const filterClothes = (
  userId: number,
  type: string[],
  colour: string[],
  season: string[]
) => {
  let query: string = `SELECT * FROM cloth WHERE user_id = $1`;
  const params: any[] = [userId];
  let paramIndex: number = 2;
  if (type.length > 0) {
    query += ` AND (type = ANY($${paramIndex}))`;
    params.push(type);
    paramIndex++;
  }

  if (colour.length > 0) {
    query += ` AND (color = ANY($${paramIndex}))`;
    params.push(colour);
    paramIndex++;
  }

  if (season.length > 0) {
    query += ` AND (season = ANY($${paramIndex}))`;
    params.push(season);
    paramIndex++;
  }

  return db.any(query, params);
};

const selectValidColour: (userId: number) => Promise<string[] | null> = async (
  userId: number
) => {
  const colours = await db.any(
    `SELECT color FROM cloth WHERE user_id = $1 AND category = 'bottom' INTERSECT SELECT color FROM cloth WHERE user_id = $1 AND category = 'top'`,
    [userId]
  );

  if (colours.length === 0) {
    return null;
  }

  const colorArr: string[] = colours.map((obj) => obj.color);

  const randomColour = colorArr[Math.floor(Math.random() * colorArr.length)];

  return [randomColour] as string[];
};

export const getMatchingColourOutfit: (userId: number) => Promise<{
  randomTop: any[];
  randomBottom: any[];
}> = async (userId: number) => {
  const colour = await selectValidColour(userId);

  const monoChromaticOutfit: { randomTop: any[]; randomBottom: any[] } =
    await getSuggestedOutfit(userId, colour);
  return monoChromaticOutfit;
};

const getSuggestedOutfit = async (
  userId: number,
  colour?: string[] | null,
  season?: string | null
) => {
  let topQuery: string = `SELECT id, color, type, img_path FROM cloth WHERE user_id = $1 AND category = 'top'`;
  let bottomQuery: string = `SELECT id, color, type, img_path FROM cloth WHERE user_id = $1 AND category = 'bottom'`;
  const params: any[] = [userId];
  let paramIndex: number = 2;

  if (colour && colour.length > 0) {
    topQuery += ` AND color = ANY($${paramIndex})`;
    bottomQuery += ` AND color = ANY($${paramIndex})`;
    params.push(colour);
    paramIndex++;
  }

  if (season) {
    topQuery += ` AND season = $${paramIndex}`;
    bottomQuery += ` AND season = $${paramIndex}`;
    params.push(season);
    paramIndex++;
  }

  topQuery += ` ORDER BY RANDOM() LIMIT 1`;
  bottomQuery += ` ORDER BY RANDOM() LIMIT 1`;

  const randomTop: any[] = await db.any(topQuery, params);

  const randomBottom: any[] = await db.any(bottomQuery, params);

  if (!randomTop.length || !randomBottom.length) {
    return { randomTop: [], randomBottom: [] };
  }

  return { randomTop, randomBottom };
};

export const getNeutralOutfit = async (userId: number) => {
  const neutrals = ['black', 'white', 'gray', 'brown'];
  const neutralOutfit: { randomTop: any[]; randomBottom: any[] } =
    await getSuggestedOutfit(userId, neutrals);

  return neutralOutfit;
};

export const colourAndSeasonOutfit = async (
  userId: number,
  colours: string[],
  seasons: string | null
) => {
  const outfit: { randomTop: any[]; randomBottom: any[] } =
    await getSuggestedOutfit(userId, colours, seasons);
  return outfit;
};
