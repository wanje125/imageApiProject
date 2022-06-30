import { promises as fsPromises } from 'fs';
import fs from 'fs';
import sharp from 'sharp';


// resize image in the image folder and move it to thumbs folder 
export const resizeData = async (
  image: string,
  width?: number,
    height?: number
):Promise<void> =>  {
  const myFile = await fsPromises.readFile(`resources/images/${image}.jpg`);
  await sharp(myFile)
    .resize(width, height)
    .toFile(`resources/thumbs/${image}-${width}-${height}.jpg`);
    const check = await fs.existsSync(`resources/thumbs/${image}-${width}-${height}.jpg`);
  await console.log(check);
};
