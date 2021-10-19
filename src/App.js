import React, { useMemo, useState, useEffect } from "react";
import axios from "axios";

import Table from "./Table";
import "./App.css";

const Genres = ({ values }) => {
  return (
    <>
      {values.map((genre, idx) => {
        return (
          <span key={idx} className="badge">
            {genre}
          </span>
        );
      })}
    </>
  );
};

function App() {
  const columns = useMemo(
    () => [
      {
        Header: "Books",
        columns: [
          {
            Header: "Title",
            accessor: "title"
          },
          {
            Header: "Author",
            accessor: "author_name[0]"
          },
          {
            Header: "Book Cover ",
            accessor: "cover_i"
          },
          {
            Header: "Published Date",
            accessor: "publish_date[0]"
          }
        ]
      },
    ],
    []
  );

  const [data, setData] = useState([]);

  useEffect(() => {
    (async () => {
      const result = await axios("http://openlibrary.org/search.json?q=the+great+gatsby");
      //const result = await axios("https://api.tvmaze.com/search/shows?q=snow");
      setData(result.data.docs);
    })();
  }, []);

  return (
    <div className="App">
      <Table columns={columns} data={data} />
    </div>
  );
}

export default App;
