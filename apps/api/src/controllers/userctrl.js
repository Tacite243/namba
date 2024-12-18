import prisma from "../utils/prisma.config.js";
import vars from "../utils/vars.js";

const create = async (req, res) => {
  const { username, email, password, role } = req.body;
  //   const passwordHash = vars.encryptPassword(password);

  const verifyUserName = await prisma.user.findUnique({ where: { username } });
  const verifyEmail = await prisma.user.findUnique({ where: { email } });
  if (!verifyEmail && !verifyUserName) {
    await prisma.user
      .create({
        data: { username, email, password },
      })
      .then(async (user) => {
        console.log("VERIFICATION CODE : ");
        vars.setResponse(
          res,
          vars.status.SUCCESS.message,
          vars.status.SUCCESS.code
        );
      })
      .catch((err) => {
        vars.setResponse(
          res,
          vars.status.INTERNAL_SERVER_ERROR.message,
          vars.status.INTERNAL_SERVER_ERROR.code,
          err
        );
      });
  } else {
    vars.setResponse(
      res,
      `Un utilisateur avec le meme username ou meme email de télephone exste déja dans le system | ${vars.status.CONFLICT.message}`,
      vars.status.CONFLICT.code
    );
  }
};

export default { create };
