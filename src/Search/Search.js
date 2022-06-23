import React, { useState } from "react";
import { Table } from "react-bootstrap";

const Search = () => {
  const [search, setSearch] = useState("");
  const [stock, setStock] = useState([]);

  const searchStock = async e => {
    e.preventDefault();
    let result = await fetch(
      `https://latest-stock-price.p.rapidapi.com/price?Indices=NIFTY%20500&Identifier=${search}`,
      {
        method: "GET",
        headers: {
          "X-RapidAPI-Host": "latest-stock-price.p.rapidapi.com",
          "X-RapidAPI-Key":
            "7abac56d94msh05aba50ece65845p1d0c39jsn20b3d2e5d9e1",
        },
      }
    );
    result = await result.json();
    setStock(result);
  };
  // console.log(stock);

  return (
    <div>
      <form onSubmit={searchStock}>
        <input
          type='search'
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
      </form>

      <div>
        <Table responsive='sm' striped bordered hover size='sm'>
          <thead>
            <tr>
              <th>S No.</th>
              <th>Symbol</th>
              <th>Open</th>
              <th>dayHigh</th>
              <th>dayLow</th>
              <th>Prev Close</th>
            </tr>
          </thead>
          {stock.map((item, i) => (
            <tbody>
              <tr key={i}>
                <td>{i + 1}</td>
                <td>{item.symbol}</td>
                <td>{item.open}</td>
                <td>{item.dayHigh}</td>
                <td>{item.dayLow}</td>
                <td>{item.previousClose}</td>
              </tr>
            </tbody>
          ))}
        </Table>
      </div>
    </div>
  );
};

export default Search;
