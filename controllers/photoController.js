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

// BUFFER THE PHOTO(S)
// -- for buffering 1 photo
exports.bufferSingle = key =>
  catchAsync(async (req, res, next) => {
    const streamUpload = upload.single(`${key}`);

    streamUpload(req, res, function(err) {
      if (err instanceof multer.MulterError)
        return next(new AppError(`${err.message}`, 400));

      if (err) return next(new AppError(`${err.message}`, 400));

      next();
    });
  });

// -- for buffering more than 1 photo
exports.bufferArray = catchAsync(async (req, res, next) => {
  const streamUpload = upload.fields([
    { name: 'foodtruckPhoto', maxCount: 1 },
    { name: 'menufoodPhoto', maxCount: 1 }
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
// -- upload single
exports.uploadSinglePhoto = (preset, required = true) =>
  catchAsync(async (req, res, next) => {
    if (!req.file && required)
      return next(new AppError('You must provide an image!', 400));
    if (!req.file && !required) return next();

    const file64 = formatBufferTo64(req.file);

    const cloudinaryResult = await cloudinaryUpload(file64.content, preset);

    if (!cloudinaryResult)
      return next(
        new AppError(
          'There is a problem uploading your image! Please contact the system admin.',
          422
        )
      );

    switch (required) {
      case true: {
        req.body.cloudinaryPhoto = {
          cloudinaryId: cloudinaryResult.public_id,
          cloudinaryUrl: cloudinaryResult.secure_url
        };
        break;
      }
      case false: {
        req.body.menu.cloudinaryPhoto = {
          cloudinaryId: cloudinaryResult.public_id,
          cloudinaryUrl: cloudinaryResult.secure_url
        };
        break;
      }
      default: {
        return next(
          new AppError(
            'There was a problem storing the image. Please contact the system admin.',
            500
          )
        );
        // break;
      }
    }

    next();
  });

// -- upload array
exports.uploadArrayPhotos = catchAsync(async (req, res, next) => {
  if (!req.files.foodtruckPhoto)
    return next(
      new AppError('You must provide an image for the foodtruck!', 400)
    );

  req.body.cloudinaryPhoto = { cloudinaryId: '', cloudinaryUrl: '' };
  req.body.menu.cloudinaryPhoto = { cloudinaryId: '', cloudinaryUrl: '' };

  await Promise.all(
    Object.entries(req.files).map(async ([key, val]) => {
      const preset = `veniceeats-${key.split('P')[0]}s`;
      const file64 = formatBufferTo64(val[0]);

      const cloudinaryResult = await cloudinaryUpload(file64.content, preset);

      if (!cloudinaryResult)
        return next(
          new AppError(
            'There is a problem uploading your image! Please contact the system admin.'
          )
        );

      if (key === 'foodtruckPhoto')
        req.body.cloudinaryPhoto = {
          cloudinaryId: cloudinaryResult.public_id,
          cloudinaryUrl: cloudinaryResult.secure_url
        };
      if (key === 'menufoodPhoto')
        req.body.menu.cloudinaryPhoto = {
          cloudinaryId: cloudinaryResult.public_id,
          cloudinaryUrl: cloudinaryResult.secure_url
        };
    })
  );

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
