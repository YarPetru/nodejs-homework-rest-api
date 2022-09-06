const fs = require("fs/promises");
const path = require("path");

const { User } = require("../../models/user");

const Jimp = require("jimp");

// const nomalizedFile = file;
// Jimp.read(nomalizedFile)
//   .then((ava) => {
//     return ava
//       .resize(250, 250) // resize
//       .write(file); // save
//   })
//   .catch((err) => {
//     console.error(err);
//   });

const avatarsDir = path.join(__dirname, "../../", "public", "avatars");

const updateAvatar = async (req, res) => {
  try {
    const { path: tempUpload, filename } = req.file;
    const { _id } = req.user;
    const [extention] = filename.split(".").reverse();
    const avatarName = `avatar-${_id}.${extention}`;
    const resUpload = path.join(avatarsDir, avatarName);
    await fs.rename(tempUpload, resUpload);
    await Jimp.read(resUpload)
      .then((ava) => {
        return ava
          .cover(250, 250) // resize
          .write(resUpload); // save
      })
      .catch((err) => {
        console.error(err);
      });
    const avatarURL = path.join("avatars", resUpload);
    await User.findByIdAndUpdate(_id, { avatarURL });
    res.json({
      avatarURL,
    });
  } catch (error) {
    await fs.unlink(req.file.path);
    throw error;
  }
};

module.exports = updateAvatar;
