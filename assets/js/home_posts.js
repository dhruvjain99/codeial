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
                },
                error: function(err){
                    console.log("Error in sending ajax request ::", err.res);
                }
            });
        });
    };


    let newPostDom = function(post){
        return $(`<li id="post-${ post.id }">
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

    createPost();
}