const bcrypt = require('bcrypt');

const validateUser = async (req, res, next) => {
    // Unique Email Check
    let uniqueUserCheck;
    
        await User.find({ email: req.body.email }).then(users => {
            uniqueUserCheck = users;
    });

    if (uniqueUserCheck.length > 0) 
        return res.status(403)
        .send({ Error: `User with email${req.body.email} alreqady exists.`});
    next();
};

const encryptUserPasssword = async (req, res, next ) => {
    const rounds = 10;
    const salt = await bcrypt.genSalt(rounds);
    const passHash = await bcrypt.hash(req.body.password, salt);
    req.body.password = passHash;
    next();
};

const loginUser = async (req, res, next) => {
    let userEmail = req.body.email.toLowerCase();
    let pass = req.body.password;
    let match = false;

    await User.findOne({ email: userEmail })
        .then(user => {
            if (!user) return res.status(404).send({ message: "Access Denied!"})
            match = bcrypt.compareSync(pass, user.password);
            if (match) {
                req.user = user;
                return next();
            } else {
                res.status(401).send({ message: "Access Denied!"});
            }
        });
    
};

module.exports = { validateUser, encryptUserPasssword, loginUser };