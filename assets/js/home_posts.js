{
    let createPost = function(){
        let newPostForm = $('#new-post-form');
        newPostForm.submit(function(e){
            e.preventDefault();
            $.ajax({
                type: 'POST',
                url: '/posts/create',
                data: newPostForm.serialize(),
                success: function(data){
                    let newPost = newPostDom(data.data.post);
                    $('#posts-list-container>ul').prepend(newPost);
                    deletePost($(' .post-delete-button', newPost));
                    displayFlash(data.data.flash);
                },
                error: function(err){
                    console.log("Error in sending ajax request ::", err.responseText);
                }
            });
        });
    };


    let newPostDom = function(post){
        return $(`<li id="post-${ post._id }">
        <p>
                <a class="post-delete-button" href="/posts/destroy/${ post._id }">X</a>
                Content : ${ post.content }
                <br>
                <small>By ${ post.user.name }</small>
                <div class="post-comments">
                    <ul class="comments-list">

                    </ul>
                    <form action="/comments/create" method="POST">
                            <input type="text" placeholder="Write a comment" name="comment">
                            <input type="hidden" name="post" value="${ post._id }">
                            <input type="submit" value="Comment">
                    </form>
                </div>
        </p>
</li>`);
    }

    let deletePost = function (deleteLink){
        $(deleteLink).click(function(e){
            e.preventDefault();

            $.ajax({
                type: 'get',
                url: $(deleteLink).prop('href'),
                success: function(data){
                    $(`#post-${data.data.post_id}`).remove();
                    displayFlash(data.data.flash);
                },
                error: function(err){
                    console.log("Error in sending ajax request to delete ::", err.responseText)
                }
            })

        });
    }

    createPost();
    var allDeletePostButtons = $('#posts-list-container ul li .post-delete-button');
    for(let deleteButtonLink of allDeletePostButtons){
        deletePost(deleteButtonLink);
    }
}