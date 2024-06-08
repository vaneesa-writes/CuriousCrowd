const {isValidMongoObjectId} = require("../utility/index");
const NotFoundError = require("../error/notFoundError");

class CommentService {
    constructor(commentRepo) {
        this.commentRepo = commentRepo;
    }

    async addComment(commentId, userId, text) {
        if (!isValidMongoObjectId(commentId)) {
            throw new NotFoundError("comment", commentId);
        }
        if (!isValidMongoObjectId(userId)) {
            throw new NotFoundError("user", userId);
        }

        const commentData = {parentId: commentId, userId: userId, text: text, parentModel: "Comment"};

        return await this.commentRepo.addComment(commentData);
    }

    async findCommentByParentId(parentId, parentModel) {
        if (!isValidMongoObjectId(parentId)) {
            throw new NotFoundError(parentModel, parentId);
        }
        return await this.commentRepo.findCommentByParentId(parentId, parentModel);
    }
}

module.exports = CommentService;