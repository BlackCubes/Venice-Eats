const cloudinary = require('cloudinary').v2;
const DatauriParser = require('datauri/parser');
const multer = require('multer');
const path = require('path');
const AppError = require('./../utils/appError');
const catchAsync = require('./../utils/catchAsync');

const multerStorage = multer.memoryStorage();

const parser = new DatauriParser();

// MULTER SETUP
const multerFilter = (req, file, cb) => {
  const fileTypes = /jpeg|jpg|png/;
  const extName = fileTypes.test(path.extname(file.originalname).toLowerCase());
  const mimeType = fileTypes.test(file.mimetype);

  if (file.mimetype.startsWith('image') && extName && mimeType) {
    cb(null, true);
  } else {
    cb(new AppError('Please upload only images', 400), false);
  }
};

const upload = multer({
  storage: multerStorage,
  limits: { fileSize: 1024000 },
  fileFilter: multerFilter
});

// BUFFER THE PHOTO
exports.bufferPhoto = (key1, key2) =>
  catchAsync(async (req, res, next) => {
    // const streamUpload = upload.single(`${key}`);
    const streamUpload = upload.fields([
      { name: `${key1}`, maxCount: 1 },
      { name: `${key2}`, maxCount: 1 }
    ]);

    streamUpload(req, res, function(err) {
      if (err instanceof multer.MulterError)
        return next(new AppError(`${err.message}`, 400));

      if (err) return next(new AppError(`${err.message}`, 400));

      next();
    });
  });

// CONVERT THE BUFFER
const formatBufferTo64 = file =>
  parser.format(path.extname(file.originalname).toString(), file.buffer);

// ClOUDINARY
const cloudinaryUpload = (file, preset) =>
  cloudinary.uploader.upload(file, {
    upload_preset: `${preset}`
  });
const cloudinaryDelete = file => cloudinary.uploader.destroy(file);

// UPLOAD
exports.uploadPhoto = (...presets) =>
  catchAsync(async (req, res, next) => {
    const { foodtruckPhoto, menufoodPhoto } = req.files;
    const foodtruckPreset = presets[0];
    const menufoodPreset = presets[1];

    if (!foodtruckPhoto)
      return next(
        new AppError('You must provide an image for the foodtruck!', 400)
      );

    const foodtruckFile64 = formatBufferTo64(foodtruckPhoto[0]);

    const foodtruckCloudinaryResult = await cloudinaryUpload(
      foodtruckFile64.content,
      foodtruckPreset
    );

    if (!foodtruckCloudinaryResult)
      return next(
        new AppError(
          'There is a problem uploading your foodtruck image! Please contact the system admin.'
        )
      );

    req.body.cloudinaryPhoto = {
      cloudinaryId: foodtruckCloudinaryResult.public_id,
      cloudinaryUrl: foodtruckCloudinaryResult.secure_url
    };

    if (menufoodPhoto) {
      const menufoodFile64 = formatBufferTo64(menufoodPhoto[0]);
      console.log(menufoodFile64);

      const menufoodCloudinaryResult = await cloudinaryUpload(
        menufoodFile64.content,
        menufoodPreset
      );

      if (!menufoodCloudinaryResult)
        return next(
          new AppError(
            'There is a problem uploading your menu food image! Please contact the system admin.'
          )
        );

      req.body.menu.cloudinaryPhoto = {
        cloudinaryId: menufoodCloudinaryResult.public_id,
        cloudinaryUrl: menufoodCloudinaryResult.secure_url
      };
    }

    console.log('Req.body: ', req.body);

    next();
  });

// DELETE
exports.deletePhoto = photoType =>
  catchAsync(async (req, res, next) => {
    const cloudinaryResult = await cloudinaryDelete(
      `veniceeats/${photoType}/${req.params.photo}`
    );

    if (cloudinaryResult.result !== 'ok')
      return next(
        new AppError(
          'There is a problem deleting your image! Please contact the system admin.',
          422
        )
      );

    next();
  });
