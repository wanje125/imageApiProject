import express from 'express';
import { promises as fsPromises } from 'fs';
import fs from 'fs';
import { readData } from './imageprocess';

//middleware함수는 next가 필수다.

// finding error if req.query.image doesn't exists throw error
export const errorFinder = (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
): void => {
  if (req.query.image) {
    next();
  } else {
    res.send('There is a wrong image name. So please check urls.');
  }
};
// making thumbs folder for resized image
export const makeDir = async (
  req: express.Request,
  res: express.Response,
    next: express.NextFunction
): Promise<void> => {
  try {
    await fsPromises.rm('./resources/thumbs', { recursive: true });
  } catch {
    await next();
  } finally {
    await fsPromises.mkdir('./resources/thumbs');
    await console.log('thumbs folder build');
    await next();
  }
};
// check image in the imagess folder
export const checkImage1 = async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
): Promise<void> => {
    const image: string = req.query.image as string;
    const check = await fs.existsSync(`resources/images/${image}.jpg`);
    if (check) {
        await next();
    }
    else {
        res.send('There is a wrong image name. So please check urls.');

    }
};
// resize the image and save in thumbs folder
export const changeSize = async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
): Promise<void> => {
    const image: string = req.query.image as string;
    const width: number = Number(req.query.width) || 200;
    const height: number = Number(req.query.height) || 200;
    const check = await fs.existsSync(`resources/thumbs/${image}-${height}-${width}.jpg`);
    if (check) {
        await next();
    } else {
        await readData(image, width || 200, height || 200);
        await next();
    }
};
// check this image is created in the thumbs folder
export const checkImage2 = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) :Promise<void> => {
  const image: string = req.query.image as string;
  const width: number = Number(req.query.width) || 200;
  const height: number = Number(req.query.height) || 200;
  const check = await fs.existsSync(`resources/thumbs/${image}-${height}-${width}.jpg`);
    if (check) {
        await next();
    }
    else {
        res.send('There is a wrong image name. So please check urls.');
    } 
};
