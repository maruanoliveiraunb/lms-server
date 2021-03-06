const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const config = require("../configs/auth.config");
const User = require("../models/user.model");
const Role = require("../models/role.model");
const Request = require('./request');

exports.signup = (req, res) => {
    const { body } = req;
    const { name, username, email, password } = body;

    const user = new User({
        name: name,
        username: username,
        email: email,
        password: bcrypt.hashSync(password, 8)
    });

    user.save((err, user) => {
        if (err) {
            res.status(500).send({ message: err });
            return;
        }

        if (req.body.roles) {
            Role.find(
                {
                    name: { $in: req.body.roles }
                },
                (err, roles) => {
                    if (err) {
                        res.status(500).send({ message: err });
                        return;
                    }

                    user.roles = roles.map(role => role._id);
                    user.save(err => {
                        if (err) {
                            res.status(500).send({ message: err });
                            return;
                        }

                        const result = Request.success({}, 'Usuário cadastrado com sucesso');
                        res.send(result);
                    });
                }
            );
        } else {
            Role.findOne({ name: "user" }, (err, role) => {
                if (err) {
                    res.status(500).send({ message: err });
                    return;
                }

                user.roles = [role._id];
                user.save(err => {
                    if (err) {
                        res.status(500).send({ message: err });
                        return;
                    }

                    const result = Request.success({}, 'Usuário cadastrado com sucesso');
                    res.send(result);
                });
            });
        }
    });
};

exports.signin = (req, res) => {
    User.findOne({
        username: req.body.username
    })
        .populate("roles", "-__v")
        .exec((err, user) => {
            if (err) {
                res.status(500).send({ message: err });
                return;
            }

            if (!user) {
                return res.status(404).send({ message: "User Not found." });
            }

            var passwordIsValid = bcrypt.compareSync(
                req.body.password,
                user.password
            );

            if (!passwordIsValid) {
                return res.status(401).send({
                    accessToken: null,
                    message: "Invalid Password!"
                });
            }

            var token = jwt.sign({ id: user.id }, config.secret, {
                expiresIn: 86400 // 24 hours
            });

            var authorities = [];

            for (let i = 0; i < user.roles.length; i++) {
                authorities.push("ROLE_" + user.roles[i].name.toUpperCase());
            }

            const data = {
                id: user._id,
                name: user.name,
                username: user.username,
                email: user.email,
                roles: authorities,
                accessToken: token
            }

            const result = Request.success(data, 'Usuário autenticado com sucesso');

            res.status(200).send(result);
        });
};
