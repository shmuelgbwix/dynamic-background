export type Site2backgrounds = Record<string, Record<string, string>>;

export type RandomBackgroundReq = {
  msId: string;
  query: string;
  orientation: OrientationReq;
};

export type OrientationReq = "landscape" | "portrait" | "squarish";
