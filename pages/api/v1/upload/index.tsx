// Core
import { NextApiRequest, NextApiResponse } from "next";

// Vendors
import multer from "multer";
import AWS from "aws-sdk";
import multerS3 from "multer-s3";

// AWS Bucket configuration
const S3 = new AWS.S3({
  endpoint: new AWS.Endpoint(process.env.DO_SPACES_ENDPOINT),
  accessKeyId: process.env.DO_SPACES_KEY,
  secretAccessKey: process.env.DO_SPACES_SECRET,
});

// Upload functions using Multer and AWS SDK
const upload = multer({
  storage: multerS3({
    // @ts-ignore: Stupid code error
    s3: S3,
    bucket: process.env.DO_SPACES_NAME,
    contentType: multerS3.AUTO_CONTENT_TYPE,
    acl: "public-read",
    key: (request: any, file: any, cb: any) => {
      const now = new Date();
      const months = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ];
      const month = months[now.getMonth()];
      const year = now.getFullYear();

      cb(null, `${year}/${month}/${file.originalname}`);
    },
  }),
})
  // 'upload' is the keyname for the FormData
  .array("upload", 1);

// Exported route
const api = async (req: NextApiRequest, res: NextApiResponse) => {
  return new Promise(() => {
    switch (req.method) {
      // "POST" method for adding new files onto the Space
      case "POST": {
        try {
          upload(req as any, res as any, function (error: any) {
            if (error) {
              return res.redirect("/error");
            }
            return res.status(200).json((req as any).files);
          });
        } catch (error) {
          // Error
        }
        break;
      }
    }
  });
};

export const config = {
  api: {
    bodyParser: false, // Disallow body parsing, consume as stream
  },
};

export default api;
