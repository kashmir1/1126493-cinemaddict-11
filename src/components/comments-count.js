export const createCommentCount = (comment) => {
  const [{commentCount}] = comment;

  return (
    `<h3 class="film-details__comments-title">Comments <span class="film-details__comments-count">${commentCount}</span></h3>`
  );
};
