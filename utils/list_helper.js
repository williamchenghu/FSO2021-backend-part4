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

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
};
