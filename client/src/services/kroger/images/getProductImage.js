import { URL_IMAGES } from "../../../constants/constants";
import axios from "axios";

const getProductImage = async (params) => {
  try {
    const { imageUrl } = params;
    if (!imageUrl) {
      throw new Error("No imageUrl provided");
    }
    const { data, headers } = await axios.get(`/api${URL_IMAGES}/${imageUrl}`, {
      responseType: "arraybuffer",
    });
    const blob = new Blob([data], { type: headers["content-type"] });
    const url = URL.createObjectURL(blob);
    return { url, error: null };
  } catch (error) {
    // TODO: error handling
    return { url: null, error };
  }
};

export default getProductImage;
