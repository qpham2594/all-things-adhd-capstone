const {User} = require ("../models")

async function accountAccess(req,res) {
    try {
        const {username,password} = req.body

        if (!username || !password) {
          return res.status(401).json({ error: 'Need both username and password' });
        }

        const userAccess = await User.findOne({username})
        if (!userAccess) {
            return res.status(401).json({ error: 'Invalid username or password' });
          }

    const validPassword = await userAccess.comparePassword(password);

    if (!validPassword) {
      return res.status(401).json({ error: 'Invalid username and/or password' });
    }
    res.status(200).json();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

module.exports = accountAccess;
