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
    addGenres: "Genres added successfully",
    loginUser: "Login Successfully",
    getAllGenres: "Get all genres",
    getGenres: "Getting genres",
    updateGenre: "Genre updated successfully",
    deleteGenre: "Genre deleted successfully"
}

const constance = {
    code: http_code,
    message: MESSAGES
}

export default constance;