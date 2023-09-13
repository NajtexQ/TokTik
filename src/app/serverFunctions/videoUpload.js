import fs from "fs/promises";
import path from "path";

export async function videoUpload(videoFile, folderName, fileName) {
  if (!videoFile) {
    return false;
  }

  console.log(videoFile);

  const filePath = path.join(process.cwd(), "public", folderName, fileName);

  const fileArrayBuffer = await videoFile.arrayBuffer();

  try {
    await fs.writeFile(filePath, new Uint8Array(fileArrayBuffer));
    return {
      file: fileName,
      url: `/${folderName}/${fileName}`,
      size: videoFile.size,
    };
  } catch (e) {
    console.log(e);
    return false;
  }
}
