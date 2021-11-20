exports.cookieToken = async(user, res) => {
    const cookieOptions = {
        expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
        httpOnly: true
    }
    return res.status(200).cookie("token", user.token, cookieOptions).json({
        user: user,
        success: true
    });
}