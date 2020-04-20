export const createFooterStatistics = (filmsCount) => {

  const statisticsTitle = filmsCount !== 0 ? `${filmsCount} movies inside` : `0 movies inside`;

  return (
    `<section class="footer__statistics">
    <p>${statisticsTitle}</p>
  </section>`
  );
};
