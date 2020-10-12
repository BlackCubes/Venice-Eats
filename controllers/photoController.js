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
const formatBufferTo64 = (...files) =>
  files.forEach(file =>
    parser.format(path.extname(file.originalname).toString(), file.buffer)
  );

// ClOUDINARY
const cloudinaryUpload = (file, preset) =>
  cloudinary.uploader.upload(file, {
    upload_preset: `${preset}`
  });
const cloudinaryDelete = file => cloudinary.uploader.destroy(file);

// UPLOAD
exports.uploadPhoto = (preset, required = true) =>
  catchAsync(async (req, res, next) => {
    const { foodtruckPhoto, productPhoto } = req.files;

    if (!foodtruckPhoto && required)
      return next(
        new AppError('You must provide an image for the foodtruck!', 400)
      );
    if (!foodtruckPhoto && !required) return next();

    const file64 = formatBufferTo64(foodtruckPhoto[0], productPhoto[0]);
    console.log('File64: ', file64);

    // const cloudinaryResult = await cloudinaryUpload(file64.content, preset);

    // if (!cloudinaryResult)
    //   return next(
    //     new AppError(
    //       'There is a problem uploading your image! Please contact the system admin.'
    //     )
    //   );

    req.body.cloudinaryPhoto = {
      cloudinaryId: cloudinaryResult.public_id,
      cloudinaryUrl: cloudinaryResult.secure_url
    };

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
