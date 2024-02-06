module.exports = function (req, res, passwordCheck) {
    const { username, password } = req.body;
  
    if (username && password) {
      return passwordCheck();
    } else {
      return res.status(400).json({ error: "You do not have access to the content. Please sign in or create an account." });
    }
  };