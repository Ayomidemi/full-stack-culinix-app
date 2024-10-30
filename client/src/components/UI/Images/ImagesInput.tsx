import React, { useEffect, useState } from "react";
import axios from "axios";
import { RiDeleteBin6Line } from "react-icons/ri";

import styles from "./styles.module.scss";
import Input from "../input";

const cloud_name = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
const upload_preset = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;
const base_url = import.meta.env.VITE_CLOUDINARY_BASEURL;

interface Props {
  setRawImage: (url: string) => void;
  imageUrl: string;
}

const ImagesInput: React.FC<Props> = ({ setRawImage, imageUrl }) => {
  const [image, setImage] = useState<File | null>(null);
  const [imageLink, setImageLink] = useState<string>("");
  const [imagePreview, setImagePreview] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const [openImage, setOpenImage] = useState(false);

  const handleImageLinkChange = (e: { value: string }) => {
    const link = e.value;

    setImageLink(link);
    setImagePreview(link);
    setRawImage(link);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    if (file) {
      setImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleUploadImage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!image) return;

    setIsLoading(true);
    const formData = new FormData();
    formData.append("file", image);
    formData.append("upload_preset", upload_preset);
    formData.append("cloud_name", cloud_name);

    try {
      const response = await axios.post(base_url, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: false,
      });
      const uploadedUrl = response.data.secure_url;
      setRawImage(uploadedUrl);
      setImageLink(uploadedUrl);
      setOpenImage(false);
    } catch (error) {
      console.error("Image upload failed:", error);
    } finally {
      setIsLoading(false);
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
            <p className="my-2 text-lg">File size 3MB max</p>

            <div className={styles.image_input_btn}>
              <input
                type="file"
                accept=".png, .jpg, .jpeg"
                onChange={handleFileChange}
                className="mb-8"
              />

              <button
                onClick={handleUploadImage}
                disabled={!image || isLoading}
              >
                {isLoading ? "Uploading..." : "Upload"}
              </button>
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
