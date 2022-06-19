import "dotenv/config";
import bodyParser from "body-parser";
import express, { Request } from "express";
import { ApiResponse } from "unsplash-js/dist/helpers/response";
import { Random } from "unsplash-js/dist/methods/photos/types";
import { unsplash } from "./api/unsplash";
import { Site2backgrounds } from "./types";
const app = express();

const site2backgrounds: Site2backgrounds = {};

const PORT = process.env.PORT || 3000;
app.use(express.json());
// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.get(
  "/background",
  async (
    req: Request<any, any, any, { msId: string; topics: string }>,
    res
  ) => {
    const { msId, topics } = req.query;
    if (site2backgrounds[msId]) {
      return res.send(site2backgrounds[msId]);
    }
    const topicIds = topics.split(",");
    const background = await getBackground(topicIds);
    site2backgrounds[msId] = background!;
    return res.send(background);
  }
);

export const getBackground = async (topicIds: string[]) => {
  const background = (await unsplash.photos.getRandom({
    topicIds,
  })) as ApiResponse<Random>;
  return background.response?.urls.raw;
};

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
