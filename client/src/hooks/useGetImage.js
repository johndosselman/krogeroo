import { useState, useEffect } from "react";
import getProductImage from "../services/kroger/images/getProductImage";

const useGetImage = (imageUrl) => {
  const [url, setUrl] = useState("");
  const [error, setError] = useState(null);
  useEffect(() => {
    const fetchImage = async () => {
      const { url: fetchedImageUrl, error } = await getProductImage({
        imageUrl: encodeURIComponent(imageUrl),
      });
      setError(error);
      setUrl(fetchedImageUrl);
    };
    fetchImage();
  }, [imageUrl]);
  return { url, error };
};

export default useGetImage;
