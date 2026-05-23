import jwt from "jsonwebtoken";

const adminAuth = async (req, res, next) => {
  const { Token } = req.cookies;
  if (!Token) {
    return res.json({ success: false, message: "Not Authorized" });
  }

  try {
    const toktnDecode = jwt.verify(Token, process.env.JWT_SECRET);
    if (toktnDecode.email === process.env.EMAIL) {
      next();
    } else {
      return res.json({ success: true, message: "Authorized" });
    }
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};

export default adminAuth;