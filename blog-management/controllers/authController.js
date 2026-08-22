const fs = require("fs");
const path = require("path");

const usersFile = path.join(__dirname, "../data/users.json");

const getUsers = () => {
    const data = fs.readFileSync(usersFile, "utf-8");
    return JSON.parse(data);
};

const saveUsers = (users) => {
    fs.writeFileSync(usersFile, JSON.stringify(users, null, 4));
};

const signupPage = (req, res) => {
    res.render("auth/signup");
};

const signup = (req, res) => {
    const { name, email, password } = req.body;
    const users = getUsers();

    const existingUser = users.find(user => user.email === email);

    if (existingUser) {
        return res.send("Email already registered. <a href='/signup'>Go Back</a>");
    }

    const newUser = {
        id: users.length > 0 ? users[users.length - 1].id + 1 : 1,
        name,
        email,
        password
    };

    users.push(newUser);
    saveUsers(users);

    res.redirect("/signin");
};

const signinPage = (req, res) => {
    res.render("auth/signin");
};

const signin = (req, res) => {
    const { email, password } = req.body;
    const users = getUsers();

    const user = users.find(
        user => user.email === email && user.password === password
    );

    if (!user) {
        return res.send("Invalid email or password. <a href='/signin'>Try Again</a>");
    }

    res.cookie("userId", String(user.id), {
        httpOnly: true,
        sameSite: "lax"
    });

    res.redirect("/dashboard");
};

const logout = (req, res) => {
    res.clearCookie("userId");
    res.redirect("/signin");
};

module.exports = {
    signupPage,
    signup,
    signinPage,
    signin,
    logout
};