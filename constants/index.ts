export const ACCEPTED_IMAGE_TYPES = {
  "image/*": [".jpeg", ".jpg", ".png", ".gif", ".bmp", ".webp"],
} as const;

export const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB

export const ERROR_MESSAGES = {
  FILE_TOO_LARGE: "Image file is too large. Maximum size is 10MB.",
  INVALID_TYPE: "Invalid file type. Please upload an image file.",
  LOAD_ERROR: "Failed to load image. Please try another file.",
} as const;

export const DEMO_IMAGES = [{ src: "/PictoAI/Demo/home.jpg", alt: "Home" }];
