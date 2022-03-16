import User from '../Schema/user-schema.js';
import bcrypt from "bcrypt";
import crypto from "crypto"
import constants from '../Constance/constance.js'
import jwt from 'jsonwebtoken';
let jwtKey = "jwt"

export const addUser = async (req, res) => {

    let email = req.body.email;
    let pass = req.body.password;
    let dataSave = req.body

    try {
        let getUser = await User.findOne({ email: email })

        if (getUser) {
            return res.status(500).json("User already exits...")
        }
        else {
            const data = await new User(dataSave)
            // data.password = convertPass(pass)

            data.token = ""

            return data.save().then(async (data) => {
                return res.status(200).send({
                    statusCode: constants.code.ok,
                    statusMessage: constants.message.addUser,
                    data
                });
            })
        }
    } catch (error) {
        console.log("err", error);
        res.status(500).json(error)
    }
}

export const getUser = async (req, res) => {
    try {
        let user = await User.find()

        res.status(200).json({
            statusCode: constants.code.ok,
            statusMessaage: constants.message.getUser,
            user
        });

    } catch (error) {
        res.status(500).json(error)
    }
}

export const loginUser = async (req, res) => {

    var email = req.body.email;
    var password = req.body.password;

    try {
        let getUser = await User.findOne({ email: email })

        if (!getUser) {
            res.status(400).json('email not matched please entred valid email ...');
        }

        else {

            const checkPassword = await bcrypt.compare(password, getUser.password)

            if (checkPassword === true) {

                try {
                    const token = await jwt.sign({ getUser: getUser.email }, jwtKey, { expiresIn: '300s' });

                    if (getUser.token.length <= 0)
                        await User.updateOne({ email: email }, { token: token })

                    // return { firstname: getUser.firstname, lastname: getUser.lastname, token, email: getUser.email };
                    res.status(200).json({
                        firstname: getUser.firstName,
                        lastname: getUser.lastName,
                        role: getUser.role,
                        statusCode: constants.code.ok,
                        statusMessage: constants.message.loginUser,
                        token
                    });

                } catch (error) {
                    console.log(error);
                }
            } else {
                res.status(400).json('password not matched..');
            }
        }
    } catch (error) {
        res.status(500).json(error)
    }
}

export const resetPassword = async (req, res) => {

    crypto.randomBytes(32, (err, buffer) => {
        if (err) {
            console.log(err);
        }
        const token = buffer.toString("hex")
        User.findOne({ email: req.body.email })
            .then(user => {
                if (!user) {
                    return res.status(404).json({
                        statusCode: constants.code.dataNotFound,
                        statusMessage: constants.message.noUser
                    })
                }
                user.resetToken = token
                user.expireToken = Date.now() + 360000
                user.save().then((result) => {
                    transporter.sendMail({
                        to: user.email,
                        from: "no-reply@web.com",
                        subject: "Password Reset",
                        html: `
                            <p>You are requested for reset password</p>
                            <h5>Click this <a href="http://localhost:3000/resetpassword/${token}" >link</a></h5>
                            `
                    })
                    res.json({ statusMessage: constants.message.email })
                })

            })
    })
}

export const newPassword = async (req, res) => {

    const newPassword = req.body.password
    const sentToken = req.body.token
    User.findOne({ resetToken: sentToken, expireToken: { $gt: Date.now() } })
        .then(user => {
            if (!user) {
                return res.status(404).json({
                    statusCode: constants.code.dataNotFound,
                    statusMessage: constants.message.noUser
                })
            }
            bcrypt.hash(newPassword, 12).then(hashedPassword => {
                user.password = hashedPassword
                user.resetToken = undefined
                user.expireToken = undefined
                user.save().then((saveduser) => {
                    res.json({ statusMessage: constants.message.password })
                })
            })
        }).catch(err => {
            console.log(err);
        })
}

export const countUser = async (req, res) => {
    try {
        const result = await User.find({ role: "ARTIST" }).countDocuments();
        console.log(result);
        res.status(200).json({
            statusCode: constants.code.ok,
            statusMessaage: constants.message.getUser,
            result
        });
    } catch (err) {
        console.log(err);
    }
}

export const verifyToken = async (req, res, next) => {
    try {
        const bearerHeader = req.headers['authorization'];

        if (typeof bearerHeader !== 'undefined') {

            const bearer = bearerHeader.split(' ')

            req.token = bearer[1]

            jwt.verify(req.token, jwtKey, (err, authData) => {
                console.log(req.token);
                console.log("jwtKey-----", jwtKey);
                if (err) {
                    res.json({ result: err })
                }
                else {
                    next();
                }
            })
        }
        else {
            res.send({ "result": "Token not provided" })
        }
    } catch (err) {
        console.log(err);
    }
}

// export const resetPassword = async (req, res) => {

//     var oldPassword = req.body.password;
//     var id = req.params.id

//     try {
//         const checkPassword = await bcrypt.compare(password, oldPassword)

//         if (checkPassword) {
//             await User.updateOne({ password: req.body.password })
//         }

//     } catch (err) {
//         res.status(500).json(error)
//     }
// }

// function resetPassword(id, oldPassword, newPassword) {
//     if (!id || !ObjectId.isValid(id) || !oldPassword || !newPassword) {
//         return mapper.responseMapping(usrConst.CODE.BadRequest, usrConst.MESSAGE.InvalidDetails)
//     } else {
//         let query = {
//             _id: id
//         }
//         return dao.getUserDetails(query).then((userDetails) => {
//             if (userDetails) {
//                 let passObj = {
//                     password: oldPassword
//                 }
//                 return appUtils.verifyPassword(passObj, userDetails).then(async (isPasswordMatch) => {
//                     if (isPasswordMatch) {
//                         let password = newPassword;
//                         let newPass = await appUtils.convertPass(password);
//                         let updateObj = {
//                             password: newPass
//                         }
//                         if (!userDetails.isPasswordReset) {
//                             updateObj.isPasswordReset = true
//                         }
//                         return dao.updateProfile(query, updateObj).then(async (updateDone) => {
//                             if (updateDone) {
//                                 let userNotificationSettings = userDetails.notifications
//                                 let notificationObj = userNotificationSettings.find(obj => obj.type == constants.TEMPLATE_TYPES.EMAIL && obj.name == constants.EMAIL_TEMPLATES.USER_RESET_PASSWORD && obj.status == constants.STATUS.ACTIVE)
//                                 console.log({ notificationObj })
//                                 if (notificationObj) {
//                                     let thirdPartyServiceQuery = {
//                                         type: constants.THIRD_PARTY_SERVICES.MAIL_GATEWAY,
//                                         status: constants.STATUS.ACTIVE
//                                     }
//                                     let serviceDetails = await dao.getServiceDetails(thirdPartyServiceQuery)
//                                     if (serviceDetails) {
//                                         let query = {
//                                             mailName: constants.EMAIL_TEMPLATES.USER_RESET_PASSWORD,
//                                             status: constants.STATUS.ACTIVE
//                                         }
//                                         let templateDetails = await dao.getTemplateDetails(query)
//                                         if (!updateDone.fullName) {
//                                             updateDone.fullName = 'User'
//                                         }
//                                         let mailBodyDetails = updateDone
//                                         let mailConfig = mailHandler.SEND_MAIL(mailBodyDetails, templateDetails, serviceDetails)
//                                     }
//                                 }
//                                 return mapper.responseMapping(usrConst.CODE.Success, usrConst.MESSAGE.PasswordUpdateSuccess)
//                             } else {
//                                 console.log("Failed to reset password");
//                                 return mapper.responseMapping(usrConst.CODE.INTRNLSRVR, usrConst.MESSAGE.internalServerError)
//                             }
//                         }).catch((e) => {
//                             console.log({ e });
//                             return mapper.responseMapping(usrConst.CODE.INTRNLSRVR, usrConst.MESSAGE.internalServerError)
//                         })
//                     } else {
//                         return mapper.responseMapping(usrConst.CODE.BadRequest, usrConst.MESSAGE.OldPasswordNotMatch)
//                     }
//                 }).catch((e) => {
//                     console.log({ e });
//                     return mapper.responseMapping(usrConst.CODE.INTRNLSRVR, usrConst.MESSAGE.internalServerError)
//                 })
//             } else {
//                 return mapper.responseMapping(usrConst.CODE.DataNotFound, usrConst.MESSAGE.InvalidCredentials)
//             }
//         }).catch((err) => {
//             console.log({ err })
//             return mapper.responseMapping(usrConst.CODE.INTRNLSRVR, usrConst.MESSAGE.internalServerError)
//         })
//     }
// }

// export const forgotPassword = async (req, res) => {
//     var
// }

// function forgotPassword(email, role) {
//     if (!email && !role) {
//         return mapper.responseMapping(usrConst.CODE.BadRequest, usrConst.MESSAGE.InvalidDetails)
//     } else {
//         let query = {
//             email: email.toLowerCase(),
//             role
//         }
//         return dao.getUserDetails(query).then(async (isExist) => {
//             if (isExist) {
//                 let obj = {
//                     type: 'FORGOT',
//                     userId: isExist._id,
//                     email: isExist.email.toLowerCase(),
//                     isActive: true,
//                     expiryTime: (new Date().getTime() + (30 * 60 * 1000))
//                 }
//                 let redisId = await redisServer.setRedisDetails(obj);
//                 let thirdPartyServiceQuery = {
//                     type: constants.THIRD_PARTY_SERVICES.MAIL_GATEWAY,
//                     status: constants.STATUS.ACTIVE
//                 }
//                 let serviceDetails = await dao.getServiceDetails(thirdPartyServiceQuery)
//                 if (serviceDetails) {
//                     let mailQuery = {
//                         type: constants.TEMPLATE_TYPES.EMAIL,
//                         mailName: constants.EMAIL_TEMPLATES.USER_FORGOT_PASSWORD,
//                         status: constants.STATUS.ACTIVE
//                     }
//                     if(role === 'Esponsors'){
//                         mailQuery.mailName = constants.EMAIL_TEMPLATES.ESPONSOR_FORGOT_PASSWORD
//                     }else if(role === 'Estates'){
//                         mailQuery.mailName = constants.EMAIL_TEMPLATES.ESTATE_FORGOT_PASSWORD
//                     }else if(role === 'Admin'){
//                         mailQuery.mailName = constants.EMAIL_TEMPLATES.ADMIN_FORGOT_PASSWORD
//                     }
//                     let templateDetails = await dao.getTemplateDetails(mailQuery);
//                     if (templateDetails) {
//                         let usrObj = {
//                             fullName: isExist.fullName || 'User',
//                             email: isExist.email.toLowerCase(),
//                             redisId: isExist._id
//                         }
//                         console.log('usrObj', usrObj)
//                         try {
//                             let mailSent = await mailHandler.SEND_MAIL(usrObj, templateDetails, serviceDetails)
//                             console.log('mailSent', mailSent)
//                         } catch (err) {
//                             console.log('errr', err)
//                         }
//                     }
//                 }
//                 return mapper.responseMapping(usrConst.CODE.Success, usrConst.MESSAGE.ResetPasswordMailSent)
//             } else {
//                 return mapper.responseMapping(usrConst.CODE.DataNotFound, usrConst.MESSAGE.InvalidCredentials)
//             }
//         }).catch((e) => {
//             console.log({ e })
//             return mapper.responseMapping(usrConst.CODE.INTRNLSRVR, usrConst.MESSAGE.internalServerError)
//         })
//     }
// }
