export default function changeMetaTags({ title, content }) {
  const setTitle = (newTitle) => {
    document.title = newTitle;
  };
  const setContent = (newContent) => {
    document.getElementsByTagName("META")[3].content = newContent;
  };

  title && setTitle(title);
  content && setContent(content);
}
