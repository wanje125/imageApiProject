import express, { query } from 'express';
import path from 'path';
import {
  errorFinder,
  makeDir,
  changeSize,
    checkImage1,
    checkImage2
} from './utilities/middlewares';
import { check } from 'prettier';

const app = express();
const port = 3000;

//routes*/
app.get(
  '/api/images',
  errorFinder,
    makeDir,
    checkImage1,
  changeSize,
    checkImage2,
    (req: express.Request, res: express.Response): void => {
    const image: string = req.query.image as string;

    const imagepath = path.join(__dirname, `../resources/thumbs/${image}.jpg`);
    res.sendFile(imagepath);
  }
);

app.listen(port, () => {
  console.log(`server started at http://localhost::${port}`);
});

export default app;
