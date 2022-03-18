"use strict";

// This is the global list of the stories, an instance of StoryList
let storyList;

const $storySubmitForm = $("#submit-form");
const $author = $("#author");
const $title = $("#title");
const $url = $("#url");
const $favStar = $(".fa-star");
const $storiesList = $(".stories-list");
const $favoritesPage = $("#favorited-stories");

/** Get and show stories when site first loads. */

async function getAndShowStoriesOnStart() {
  storyList = await StoryList.getStories();
  $storiesLoadingMsg.remove();

  putStoriesOnPage();
}

/**
 * A render method to render HTML for an individual Story instance
 * - story: an instance of Story
 *
 * Returns the markup for the story.
 */

function generateStoryMarkup(story) {
  // console.debug("generateStoryMarkup", story);
  console.log("story=", story);
  console.log("favs=", currentUser.favorites);
  let isFav = "far";

  // given a story currentUser.favorites.map(fav => fav.storyId).includes(story.storyId)
  // loop through currentUser.favorites if story.storyId === currentUser.favorites
  if (currentUser.favorites.map((fav) => fav.storyId).includes(story.storyId)) {
    isFav = "fas";
  }

  const hostName = story.getHostName();
  return $(`
      <li id="${story.storyId}">
        <span class="star"> <i class="${isFav} fa-star"></i> </span>
        <a href="${story.url}" target="a_blank" class="story-link">
          ${story.title}
        </a>
        <small class="story-hostname">(${hostName})</small>
        <small class="story-author">by ${story.author}</small>
        <small class="story-user">posted by ${story.username}</small>
      </li>
    `);
}

/** Toggles class for favorite "star" and calls addFavorite and unFavorite functions to update the API
 *
 * @param {obj} evt
 * @return void
 */

async function favStarMarkup(evt) {
  const $target = $(evt.target);
  const closestLi = $target.closest("li");
  const storyId = closestLi.attr("id");

  console.log("target =", $target);

  if ($target.hasClass("far")) {
    await User.addFavorite(storyId);
    $target.closest("i").toggleClass("fas far");
  } else {
    await User.unFavorite(storyId);
    $target.closest("i").toggleClass("fas far");
  }

  console.log("storyID=", storyId);
  console.log(closestLi);
}

$storiesList.on("click", ".star", favStarMarkup); //favorite "star" event listener

/** Gets list of stories from server, generates their HTML, and puts on page. */

function putStoriesOnPage() {
  console.debug("putStoriesOnPage");

  $allStoriesList.empty();

  // loop through all of our stories and generate HTML for them
  for (let story of storyList.stories) {
    const $story = generateStoryMarkup(story);
    $allStoriesList.append($story);
  }

  $allStoriesList.show();
}

/** Gets Story from Submit Form and Adds it to Story List
 *
 * @param {obj} evt
 * @return void
 */
async function getAndAddStory(evt) {
  evt.preventDefault();
  console.log(evt);
  let author = $author.val();
  let title = $title.val();
  let url = $url.val();

  let data = { author, title, url };
  let token = localStorage.getItem("token");

  console.log("data=", data, "token= ", token);

  let response = await storyList.addStory(token, data);
  console.log(response);

  $storySubmitForm.hide();
  getAndShowStoriesOnStart();
}

$storySubmitForm.submit(getAndAddStory); //submit form button event listener

/**
 * A render method to render HTML for an individual Story instance
 * - story: an instance of Story
 *
 * Returns the markup for each favorited story.
 */

function generateFavoritesMarkup(story) {
  return $(`
    <li id="${story.storyId}">
      <span class="star"> <i class="fas fa-star"></i> </span>
      <a href="${story.url}" target="a_blank" class="story-link">
        ${story.title}
      </a>
      <small class="story-author">by ${story.author}</small>
      <small class="story-user">posted by ${story.username}</small>
    </li>
  `);
}

/** Gets list of favorited stories from server, generates their HTML, and puts on page. */

function putFavoritesOnPage(){
  $favoritesPage.empty();

  for (let story of currentUser.favorites) {
    const favorites = generateFavoritesMarkup(story);
    $favoritesPage.append(favorites);
  }
}

// function putMyStoriesOnPage(stories){
//   $myStoriesList.empty();

//   for (let story of stories) {
//     const favorites = generateFavoritesMarkup(story);
//     $favoritesPage.append(favorites);
//   }
// }

