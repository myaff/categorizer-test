export default class Category {
  constructor({ id, name, parent, articles, shownArticles }) {
    this.id = id;
    this.name = name;
    this.parent = parent;
    this.children = {};
    this.articles = articles || [];
    this.shownArticles = shownArticles || [];
  }

  get childrenList() {
    return Object.values(this.children);
  }

  get articlesCount() {
    return this.childrenList.reduce(
      (sum, child) => (sum += child.articlesCount),
      this.articles.length
    );
  }
  get shownArticlesCount() {
    return this.childrenList.reduce(
      (sum, child) => (sum += child.shownArticlesCount),
      this.shownArticles.length
    );
  }
}