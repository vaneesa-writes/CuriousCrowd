const {StatusCodes} = require("http-status-codes");
const {CommentRepo} = require("../repository");
const {CommentService} = require("../service");

const commentService = new CommentService(new CommentRepo());

const addComment = async (req, res, next) =>{
    try{
        const commentId = req.params.commentId;
        const userId = req.body.userId;
        const text = req.body.text;
        const comment = await commentService.addComment(commentId,userId,text);
        return res.status(StatusCodes.CREATED).json({
            success: true,
            message: "Successfully added the comment",
            error: {},
            data: comment
        });
    }
    catch (error){
        next(error);
    }
}

const findCommentByParentId = async (req, res, next) => {
    try{
        const parentId = req.params.parentId;
        const parentModel = req.query.parentModel;
        const comment = await commentService.findCommentByParentId(parentId,parentModel);
        return res.status(StatusCodes.OK).json({
            success: true,
            message: "Successfully fetched the comment",
            error: {},
            data: comment
        });
    }
    catch (error){
        next(error);
    }
}

module.exports = {
    findCommentByParentId, addComment
};