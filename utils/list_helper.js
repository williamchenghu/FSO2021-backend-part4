const { countBy, maxBy, groupBy, sumBy, map } = require('lodash');

const dummy = () => 1;

const totalLikes = (blogs) =>
  blogs.length === 0 ? 0 : blogs.reduce((sum, item) => sum + item.likes, 0);

const favoriteBlog = (blogs) => {
  const maxLikes = Math.max(...blogs.map((e) => e.likes));
  const favBlog = blogs.find((e) => e.likes === maxLikes);
  delete favBlog._id;
  delete favBlog.__v;
  delete favBlog.url;
  return favBlog;
};

const mostBlogs = (blogs) => {
  const authorObj = blogs
    .map((e) => e.author)
    .reduce((obj, item) => {
      return obj[item]
        ? { ...obj, [item]: obj[item] + 1 }
        : { ...obj, [item]: 1 };
    }, {});
  const authors = Object.keys(authorObj);
  const blogQty = Object.values(authorObj);
  const freqAuthor = authors.find((e) => authorObj[e] === Math.max(...blogQty));
  return {
    author: freqAuthor,
    blogs: Math.max(...blogQty),
  };
};

const mostBlogsLodash = (blogs) => {
  const authorObj = countBy(blogs, 'author');
  const authors = Object.keys(authorObj);
  const authorArr = Array.from(authors, (_, i) => ({
    author: authors[i],
    blogs: authorObj[authors[i]],
  }));
  return maxBy(authorArr, (e) => e.blogs);
};

const mostLikes = (blogs) => {
  const authorLikesArr = Array.from(blogs, (e) => ({
    author: e.author,
    likes: e.likes,
  }));
  const authorGroupObj = groupBy(authorLikesArr, 'author');
  const authorLikesSum = map(authorGroupObj, (objs, key) => ({
    author: key,
    likes: sumBy(objs, 'likes'),
  }));
  return maxBy(authorLikesSum, (e) => e.likes);
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostBlogsLodash,
  mostLikes,
};
