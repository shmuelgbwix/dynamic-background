import "dotenv/config";
import express, { Request } from "express";
import { ApiResponse } from "unsplash-js/dist/helpers/response";
import { Random } from "unsplash-js/dist/methods/photos/types";
import { unsplash } from "./api/unsplash";
import { OrientationReq, RandomBackgroundReq, Site2backgrounds } from "./types";
import cors from "cors";

const PORT = process.env.PORT || 3000;

const app = express();
app.use(cors());
app.use(express.json());

let site2backgrounds: Site2backgrounds = {};

setInterval(() => {
  site2backgrounds = {};
  console.log({ log: "Interval for clean site2backgrounds has fired off" });
}, 1000 * 60 * 60 * 24);

app.get("/", (_req, res) => {
  res.send("Hello World");
});

app.get(
  "/background",
  async (req: Request<any, any, any, RandomBackgroundReq>, res) => {
    let { msId, query, orientation } = req.query;
    if (site2backgrounds[msId]?.[query]) {
      return res.send(site2backgrounds[msId][query]);
    }
    const background = await getBackground(query, orientation);
    if (!site2backgrounds[msId]) {
      site2backgrounds[msId] = {};
    }
    site2backgrounds[msId][query] = background!;
    return res.send(background);
  }
);

export const getBackground = async (
  query: string,
  orientation: OrientationReq = "landscape"
) => {
  try {
    console.log({ orientation });

    const background = (await unsplash.photos.getRandom({
      query,
      orientation: "landscape",
    })) as ApiResponse<Random>;
    return background.response?.urls.regular;
  } catch (err: any) {
    console.log({ err });
  }
};

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
