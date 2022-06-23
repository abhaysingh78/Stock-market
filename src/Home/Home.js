import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";

import "./home.css";

const Home = () => {
  const [stock, setStock] = useState([]);

  const fetchData = async () => {
    try {
      let result = await fetch(
        "https://latest-stock-price.p.rapidapi.com/price?Indices=NIFTY%20500",
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
    } catch (error) {
      console.log(error);
    }
  };
  // console.log(stock);

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className='table'>
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
          <tbody key={i}>
            <tr>
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
  );
};

export default Home;

// 563492ad6f9170000100000155551d0105834700891a07423cb8118a

// nse data
// "https://www.nseindia.com/api/equity-stockIndices?index=NIFTY%2050",
