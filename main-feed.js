function create_post() {
        const userName = localStorage.getItem("userName");
        let posts = [];
        const ratingsText = localStorage.getItem('ratings');
        if (ratingsText) {
          posts = JSON.parse(ratingsText);
        }
        let post = {"userName":userName, "rating":1}
        posts.push(post)
        // ratings = this.updateScores(userName, score, scores);
        console.log(post);
        localStorage.setItem('posts', JSON.stringify(posts));
        upload_post(post);
}

let posts = [];
        const ratingsText = localStorage.getItem('posts');
        if (ratingsText) {
          posts = JSON.parse(ratingsText);
        }
    // console.log(posts);
    function upload_post (post) {
    const feed = document.getElementById("feed");
    const div = document.createElement("div");
    div.innerHTML = `<p>Post from ${post.userName}</p>
    <fieldset class="star-rating">
      <label for="john_star1"></label>
      <input type="radio" id="john_star1" name="john_rating" value="1" />
      <label for="john_star2"></label>
      <input type="radio" id="john_star2" name="john_rating" value="2" />
      <label for="john_star3"></label>
      <input type="radio" id="john_star3" name="john_rating" value="3" />
      <label for="john_star4"></label>
      <input type="radio" id="john_star4" name="john_rating" value="4" />
      <label for="john_star5"></label>
      <input type="radio" id="john_star5" name="john_rating" value="5" />
      <span id="save-icon" class="material-symbols-outlined">
        bookmark
        </span>
    </fieldset>`
    feed.prepend(div);
}

posts.forEach(rating =>  {
    upload_post(rating);
});

