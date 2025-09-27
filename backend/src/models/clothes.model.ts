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
  let query = `SELECT * FROM cloth WHERE user_id = $1`;
  const params: any[] = [userId];
  let paramIndex = 2;
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

const getSuggestedOutfit = async (userId: number, colour: string[] | null) => {
  if (!colour || colour.length === 0) {
    return { randomTop: [], randomBottom: [] };
  }

  const randomTop: any[] = await db.any(
    `SELECT id, color, type, img_path FROM cloth WHERE user_id = $1 AND category = 'top' AND color = ANY($2) ORDER BY RANDOM() LIMIT 1`,
    [userId, colour]
  );

  const randomBottom: any[] = await db.any(
    `SELECT id, color, type, img_path FROM cloth WHERE user_id = $1 AND category = 'bottom' AND color = ANY($2) ORDER BY RANDOM() LIMIT 1`,
    [userId, colour]
  );

  return { randomTop, randomBottom };
};

export const getNeutralOutfit = async (userId: number) => {
  const neutrals = ['black', 'white', 'gray', 'brown'];
  const neutralOutfit: { randomTop: any[]; randomBottom: any[] } =
    await getSuggestedOutfit(userId, neutrals);

  return neutralOutfit;
};

export const getComplementaryOutfit = async (userId: number) => {
  const complementaryMap: Record<string, string> = {
    red: 'green',
    green: 'red',
    blue: 'orange',
    orange: 'blue',
    yellow: 'purple',
    purple: 'yellow',
    pink: 'green',
    brown: 'blue',
    gray: 'red',
    black: 'white',
    white: 'black',
    beige: 'blue',
  };

  const topResult = await db.any(
    `SELECT id, color, type, img_path 
     FROM cloth 
     WHERE user_id = $1 AND category = 'top'
     ORDER BY RANDOM() LIMIT 1`,
    [userId]
  );

  if (!topResult.length) return { randomTop: [], randomBottom: [] };

  const randomTop = topResult[0];
  const compColor = complementaryMap[randomTop.color];
  if (!compColor) return { randomTop: [], randomBottom: [] };

  const bottomResult = await db.any(
    `SELECT id, color, type, img_path
     FROM cloth
     WHERE user_id = $1 AND category = 'bottom' AND LOWER(color) = $2
     ORDER BY RANDOM() LIMIT 1`,
    [userId, compColor]
  );

  if (!bottomResult.length) return { randomTop: [], randomBottom: [] };

  const randomBottom = bottomResult[0];

  return {
    randomTop: [randomTop],
    randomBottom: [randomBottom]
  };
};


