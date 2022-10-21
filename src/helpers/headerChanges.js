const headerChanges = () => {
  const pageHeader = document.querySelector('.page-header h1');
  pageHeader.innerText = 'Mix & Match';

  const newBreadcrumbItem = `<li itemprop="itemListElement" itemscope="" itemtype="https://schema.org/ListItem">
    <a href="/pages/build-a-gift" itemprop="item" title="Back"><span itemprop="name">Back</span><span aria-hidden="true" class="breadcrumb-divider"><svg aria-hidden="true" class="icon icon-chevron-right" viewBox="0 0 6 10"><path d="M1.203 10 0 8.746 3.602 5 0 1.254 1.203 0 6 5l-4.797 5z"></path></svg><svg aria-hidden="true" class="icon icon-arrow-left" viewBox="0 0 16 14"><path d="m6.59 0 1.012 1.074L2.74 6.238H16v1.524H2.74l4.862 5.164L6.591 14 0 7l6.59-7z"></path></svg></span></a>
    <meta itemprop="position" content="1">
    </li>   `;

  const breadcrumbAnchor = document.querySelector('.full-breadcrumbs ol');
  const mealDealBreadcrumb = document.querySelector('.meal-deal-breadcrumb');

  !mealDealBreadcrumb && (breadcrumbAnchor.innerHTML = newBreadcrumbItem);
};

export default headerChanges;
