{
    let createComment = function(){
        let commentsForm = $('.post-comments form');
        commentsForm.submit(function(e){
            e.preventDefault();
            $.ajax({
                type: 'POST',
                url: '/comments/create',
                data: commentsForm.serialize(),
                success: function(data){
                    let newComment = newCommentDom(data.data.comment);
                    $(`#post-${data.data.comment.post} .comments-list`).prepend(newComment);
                    deleteComment($(' .delete-comment-button', newComment));
                    displayFlash(data.data.flash);
                },
                error: function(err){
                    console.log('Erro in creating a comment :: ', err.responseText);
                }
            });

        });
    }

    let newCommentDom = function(comment){
        return $(`<li id="comment-${ comment._id }">
        <p>
            <a class="delete-comment-button" href="/comments/destroy/${ comment._id }">X</a>
            ${ comment.user.name } : ${ comment.content }
        </p>
</li>`);
    }

    let deleteComment = function(deleteLink){
        $(deleteLink).click(function(e){
            e.preventDefault();

            $.ajax({
                type: 'GET',
                url: $(deleteLink).prop('href'),
                success: function(data){
                    $(`#comment-${data.data.comment_id}`).remove();
                    displayFlash(data.data.flash);
                },
                error: function(err){
                    console.log('Error in deleting a comment ::', err.responseText);
                }
            });

        });
    }

    let allDeleteButtons = $('.comments-list li .delete-comment-button');
    for(let button of allDeleteButtons){
        deleteComment(button);
    }

    createComment();

}