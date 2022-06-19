import "dotenv/config";
import bodyParser from "body-parser";
import express, { Request } from "express";
import { ApiResponse } from "unsplash-js/dist/helpers/response";
import { Random } from "unsplash-js/dist/methods/photos/types";
import { unsplash } from "./api/unsplash";
import { Site2backgrounds } from "./types";
const app = express();

let site2backgrounds: Site2backgrounds = {};

const PORT = process.env.PORT || 3000;
app.use(express.json());

setInterval(() => {
  site2backgrounds = {};
  console.log({ log: "Interval for clean site2backgrounds has fired off" });
}, 1000 * 60 * 60 * 24);

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.get(
  "/background",
  async (req: Request<any, any, any, { msId: string; query: string }>, res) => {
    const { msId, query } = req.query;
    if (site2backgrounds[msId]) {
      return res.send(site2backgrounds[msId]);
    }
    const background = await getBackground(query);
    site2backgrounds[msId] = background!;
    return res.send(background);
  }
);

export const getBackground = async (query: string) => {
  const background = (await unsplash.photos.getRandom({
    query,
  })) as ApiResponse<Random>;
  return background.response?.urls.raw;
};

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
