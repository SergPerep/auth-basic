const express = require("express");
const app = express();
const cors = require("cors");
const PORT = 5000;
const basicAuth = require("express-basic-auth");
const path = require("path");

const authUser = (email, password) => {

    const isEmailMatches = basicAuth.safeCompare(email, 'bob-the-builder@gmail.com');
    const isPasswordMatches = basicAuth.safeCompare(password, 'lalaland');

    console.log({ email, password });
    
    return isEmailMatches && isPasswordMatches;
}

app.use(cors());
app.use(express.json());
app.use("/auth", basicAuth({
    authorizer: authUser
}))

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "/src/index.html"));
})

app.get("/auth", (req, res) => {
    console.log(req.headers.authorization);
    res.json("You are authenticated");
});

app.listen(PORT, () => console.log(`server is running on ${PORT}`));