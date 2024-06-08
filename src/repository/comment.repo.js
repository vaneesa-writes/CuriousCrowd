const NotFoundError = require("../error/notFoundError");
const {User, Answer, Comment} = require("../models");
class CommentRepo{
    async addComment(commentData){
        const user = await User.findById(commentData.userId);
        if(!user){
            throw new NotFoundError("user",commentData.userId);
        }
        const commentId = commentData.parentId;
        const comment = await Comment.findById(commentId);
        if(!comment){
            throw new NotFoundError("question",commentData.parentId);
        }
        return Comment.create(commentData);
    }

    async findCommentByParentId(parentId, parentModel){
        // console.log(parentId,parentModel);
        const ParentModel = parentModel === 'Answer' ? Answer : Comment;
        const parent = await ParentModel.findById(parentId);
        if (!parent) {
            throw new NotFoundError(parentModel, parentId);
        }
        return Comment.find({parentId: parentId});
    }
}

module.exports = CommentRepo;