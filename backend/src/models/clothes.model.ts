import db from '../config/database.js';

export const getAllClothes = (): Promise<any[]> => {
  return db.any('SELECT * FROM cloth');
};

export const getAllTops = (userId: string) => {
  return db.any(
    "SELECT id, color, type, img_path FROM cloth WHERE user_id = $1 AND category = 'top'",
    [userId]
  );
};

export const getClohtesBydUserId = (userId: string) => {};

export const getClothesById = (id: number) => {
  return db.one('SELECT * FROM cloth where id = $1', [id]);
};

export const getAllBottoms = (userId: string) => {
  return db.any(
    "SELECT id, color, type, img_path FROM cloth WHERE user_id = $1 AND category = 'bottom'",
    [userId]
  );
};

export const getAllOnepieces = (userId: string) => {
  return db.any(
    "SELECT id, color, type, img_path FROM cloth WHERE user_id = $1 AND category = 'onepiece'",
    [userId]
  );
};

export const createClothes = (
  type: string,
  color: string,
  season: string,
  userId: string,
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
  userId: string,
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

const selectValidColour: (userId: string) => Promise<string[] | null> = async (
  userId: string
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

export const getMatchingColourOutfit: (userId: string) => Promise<{
  randomTop: any[];
  randomBottom: any[];
}> = async (userId: string) => {
  const colour = await selectValidColour(userId);

  const monoChromaticOutfit: { randomTop: any[]; randomBottom: any[] } =
    await getSuggestedOutfit(userId, colour);
  return monoChromaticOutfit;
};

const getSuggestedOutfit = async (
  userId: string,
  colour?: string[] | null,
  season?: string | null
) => {
  const paramsTop: any[] = [userId];
  const paramsBottom: any[] = [userId];
  let paramIndexTop = 2;
  let paramIndexBottom = 2;

  let topQuery = `SELECT id, color, type, img_path FROM cloth WHERE user_id = $1 AND category = 'top'`;
  let bottomQuery = `SELECT id, color, type, img_path FROM cloth WHERE user_id = $1 AND category = 'bottom'`;

  if (colour && colour.length > 0) {
    topQuery += ` AND color = ANY($${paramIndexTop})`;
    bottomQuery += ` AND color = ANY($${paramIndexBottom})`;
    paramsTop.push(colour);
    paramsBottom.push(colour);
    paramIndexTop++;
    paramIndexBottom++;
  }

  if (season) {
    topQuery += ` AND (LOWER(season) = LOWER($${paramIndexTop}) OR LOWER(season) = 'all seasons')`;
    bottomQuery += ` AND (LOWER(season) = LOWER($${paramIndexBottom}) OR LOWER(season) = 'all seasons')`;
    paramsTop.push(season);
    paramsBottom.push(season);
    paramIndexTop++;
    paramIndexBottom++;
  }

  topQuery += ` ORDER BY RANDOM() LIMIT 1`;
  bottomQuery += ` ORDER BY RANDOM() LIMIT 1`;

  const randomTop: any[] = await db.any(topQuery, paramsTop);
  const randomBottom: any[] = await db.any(bottomQuery, paramsBottom);
  return {
    randomTop: randomTop.length ? randomTop : [],
    randomBottom: randomBottom.length ? randomBottom : [],
  };
};



export const getNeutralOutfit = async (userId: string) => {
  const neutrals = ['black', 'white', 'gray', 'brown'];
  const neutralOutfit: { randomTop: any[]; randomBottom: any[] } =
    await getSuggestedOutfit(userId, neutrals);

  return neutralOutfit;
};

export const getComplementaryOutfit = async (userId: string) => {
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
    randomBottom: [randomBottom],
  };
};

export const colourAndSeasonOutfit = async (
  userId: string,
  colours: string[],
  seasons: string | null
) => {
  const outfit: { randomTop: any[]; randomBottom: any[] } =
    await getSuggestedOutfit(userId, colours, seasons);
  return outfit;
};

export const getNumberOfClothes = async(userId:number)=>{
  return db.one(`SELECT COUNT(*) FROM cloth WHERE user_id = $1;`,[userId]);
};
