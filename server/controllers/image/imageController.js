import axios from "axios";

const getImage = async (req, res, next) => {
  try {
    const { imageUrl } = req.params;
    const response = await axios.get(imageUrl, { responseType: "arraybuffer" });
    const imageBuffer = Buffer.from(response.data);
    const contentType = response.headers["content-type"];
    res.set("Access-Control-Allow-Origin", "*"); // Allow requests from any domain (NOTE: Don't use in production)
    // res.set('Access-Control-Allow-Origin', 'website.com');
    res.set("Access-Control-Allow-Methods", "GET");
    res.type(contentType);
    res.send(imageBuffer);
  } catch (error) {
    next(error);
  }
};

export default getImage;
