import React, { useEffect, useState } from "react";
import { RiDeleteBin6Line, RiCloseLine } from "react-icons/ri";

import styles from "./styles.module.scss";
import Input from "../input";

interface Props {
  setRawImage: (url: string) => void;
  imageUrl: string;
  setImage: React.Dispatch<React.SetStateAction<File | null>>;
  setImageLink: React.Dispatch<React.SetStateAction<string>>;
  imageLink: string;
  setImagePreview: React.Dispatch<React.SetStateAction<string>>;
  imagePreview: string;
}

const ImagesInput: React.FC<Props> = ({
  setRawImage,
  imageUrl,
  setImage,
  setImageLink,
  imageLink,
  setImagePreview,
  imagePreview,
}) => {
  const [openImage, setOpenImage] = useState(false);

  const handleImageLinkChange = (e: { value: string }) => {
    const link = e.value;

    setImage(null);
    setImageLink(link);
    setImagePreview(link);
    setRawImage(link);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    if (file) {
      setRawImage("");
      setImageLink("");
      setImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleClearImage = () => {
    setImage(null);
    setImageLink("");
    setImagePreview("");
    setRawImage("");
  };

  useEffect(() => {
    if (imageUrl) {
      setImageLink(imageUrl);
      setImagePreview(imageUrl);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [imageUrl]);


  return (
    <div>
      <Input
        label="Image Link"
        type="text"
        onChange={handleImageLinkChange}
        defaultValue={imageLink}
      />

      {!openImage ? (
        <p className={styles.image_open_image}>
          click <span onClick={() => setOpenImage(!openImage)}>here</span> to
          view or upload image
        </p>
      ) : (
        <div className={styles.image_input_wrapper}>
          <div className={styles.image_input_wrapper_cont}>
            <button onClick={() => setOpenImage(!openImage)}>
              <RiCloseLine color="#3c0174" size={20} />
            </button>
            <p className="my-2 text-lg">File size 3MB max</p>

            <div className={styles.image_input_btn}>
              <input
                type="file"
                accept=".png, .jpg, .jpeg"
                onChange={handleFileChange}
                className="mb-8"
              />
            </div>
          </div>

          <div className={styles.image_prev}>
            {imagePreview ? (
              <div className={styles.image_preview}>
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="w-80 h-52 object-cover"
                />
                <RiDeleteBin6Line
                  onClick={handleClearImage}
                  color="red"
                  size={30}
                />
              </div>
            ) : (
              <p>Please upload or paste an image link to preview it here.</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ImagesInput;
