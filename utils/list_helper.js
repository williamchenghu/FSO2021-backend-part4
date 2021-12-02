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

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
};
