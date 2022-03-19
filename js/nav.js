"use strict";

// So we don't have to keep re-finding things on page, find DOM elements:

const $submitNav = $("#nav-submit-story");
const $submitForm = $("#submit-form");
const $favoriteLink = $("#nav-favorites");
const $favoriteStoriesList = $("#favorited-stories");
const $navMyStoriesLink = $("#nav-my-stories");
const $myStoriesList = $('#my-stories');

/******************************************************************************
 * Handling navbar clicks and updating navbar
 */

/** Show main list of all stories when click site name */

function navAllStories(evt) {
  console.debug("navAllStories", evt);
  evt.preventDefault();
  hidePageComponents();
  putStoriesOnPage();
}

$body.on("click", "#nav-all", navAllStories);

/** Show login/signup on click on "login" */

function navLoginClick(evt) {
  console.debug("navLoginClick", evt);
  evt.preventDefault();
  hidePageComponents();
  $loginForm.show();
  $signupForm.show();
}

$navLogin.on("click", navLoginClick);

/** When a user first logins in, update the navbar to reflect that. */

function updateNavOnLogin() {
  console.debug("updateNavOnLogin");
  $(".main-nav-links").show();
  $navLogin.hide();
  $navLogOut.show();
  $navUserProfile.text(`${currentUser.username}`).show();
}

/**Show Submit Form
 * @params void
 * @return void
*/
function navNewStoryForm() {
  hidePageComponents();
  $submitForm.show();
}

$submitNav.on("click", navNewStoryForm); //"submit" navigation link event listener

/**Show Favorites List
 * @params void
 * @return void
*/
function navOpenFavorites() {
  hidePageComponents();
  putFavoritesOnPage();
  $favoriteStoriesList.show();
}

$favoriteLink.on("click", navOpenFavorites) //"favorites" navigation link event listener

function navOpenMyStories() {
  hidePageComponents();
  // let stories = await User.addUserStories();
  putMyStoriesOnPage();
  console.log("putMyStories called");
  $myStoriesList.show();
}
$navMyStoriesLink.on("click", navOpenMyStories)

