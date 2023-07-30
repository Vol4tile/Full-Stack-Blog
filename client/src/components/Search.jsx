import React from "react";
import SearchCSS from "../css/Search.module.css";
const Search = ({ posts, filteredPosts, setFilteredPosts }) => {
  return (
    <div className={SearchCSS.container}>
      <input
        type="text"
        placeholder="Ara..."
        onChange={(e) => {
          const newFiltered = posts.filter((post) => {
            return (
              post.baslik
                .toLowerCase()
                .includes(e.target.value.toLowerCase()) ||
              post.metin.toLowerCase().includes(e.target.value.toLowerCase()) ||
              post.etiket
                .toLowerCase()
                .includes(e.target.value.toLowerCase()) ||
              post.baslik
                .toLowerCase()
                .includes(e.target.value.toLowerCase()) ||
              post.paylasanAdi
                .toLowerCase()
                .includes(e.target.value.toLowerCase())
            );
          });
          const isEqual =
            JSON.stringify(newFiltered) == JSON.stringify(filteredPosts);
          if (newFiltered.length > 0 && !isEqual) {
            setFilteredPosts(newFiltered);
          }
        }}
      />
    </div>
  );
};

export default Search;
