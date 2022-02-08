import express from 'express';
import { Users } from '../../../models';
import bcrypt from 'bcrypt';

const Auth_Router = express.Router()


Auth_Router.route("/login").get((req, res) => {
    const searchParam = req.body.national_Id;
    res.json("here we go")
    // Users.findOne({ national_Id: searchParam })
    //     .then(async (user) => {
    //         if (user) {
    //             const password = await bcrypt.compare(req.body.password, user.password);
    //             if (password) {
    //                 const currentUser = {
    //                     firstName: user.firstName,
    //                     lastName: user.lastName,
    //                     user_Id: user.user_Id,
    //                     account_Type: user.accountType,
    //                 };
    //             } else {
    //                 res.json({ message: "password is incorrect" });
    //             }
    //         }
    //     })
    //     .catch((e) => console.log(e));
});

Auth_Router.route("/register").post(async (req, res) => {
    const user = new Users({
        names: {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
        },
        user_Id: req.body.user_Id,
        email: req.body.email,
        password: await bcrypt.hash(req.body.password, 12),
        accountType: "user",
    })

    user
        .save()
        .then((user: any) => res.json("user Registered" + user))
        .catch((e: Error) => res.json("Error " + e));
});

Auth_Router.route("/logout").get((req, res) => {
    res.json({ accessToken: null, currentUser: null });
});

export { Auth_Router };