const http_code = {
    ok: 200,
    dataNotFound: 404,
    internalServerError: 500,
    badRequest: 400,
    unAuthorized: 401,
    forbidden: 403
};

const MESSAGES = {
    addUser: "User added successfully",
    noUser: "User not found",
    email: "Check your email",
    password: "Password updated successfully",
    addGenres: "Genres added successfully",
    loginUser: "Login Successfully",
    userCount: "User count successfully",
    genresCount: "Genres count successfully",
    getAllGenres: "Get all genres",
    getGenres: "Getting genres",
    getUser: "Getting user",
    updateGenre: "Genre updated successfully",
    deleteGenre: "Genre deleted successfully"
}

const constance = {
    code: http_code,
    message: MESSAGES
}

export default constance;