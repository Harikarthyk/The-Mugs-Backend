exports.cookieToken = async(user, res) => {
    const cookieOptions = {
        expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
        httpOnly: true
    }
    return res.cookie("token", user.token, cookieOptions).status(200).json({
        user: user,
        success: true,
        token: user.token
    });
}