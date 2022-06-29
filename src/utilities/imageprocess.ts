import { promises as fsPromises } from 'fs';
import fs from 'fs';
import sharp from 'sharp';


// resize image in the image folder and move it to thumbs folder 
export const readData = async (
  image: string,
  width?: number,
  height?: number
) => {
  const myFile = await fsPromises.readFile(`resources/images/${image}.jpg`);
  await sharp(myFile)
    .resize(width, height)
    .toFile(`resources/thumbs/${image}.jpg`);
  const check = await fs.existsSync(`resources/thumbs/${image}.jpg`);
  await console.log(check);
};
