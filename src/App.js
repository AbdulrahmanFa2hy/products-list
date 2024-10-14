import "./App.css";
import React, { Component } from "react";
import Items from "./components/item/items";
import AddItem from "./components/addItem/addItem";
import Total from "./components/total/total";

class App extends Component {
  state = {
    items: [
      { id: 1, product: "Pen", price: 2, quantity: 3 },
      { id: 2, product: "Book", price: 10, quantity: 2 },
    ],
  };

  deleteItem = (id) => {
    let items = this.state.items;
    let i = items.findIndex((item) => item.id === id);
    items.splice(i, 1);
    this.setState({ items: items });
  };

  addItem = (item) => {
    this.state.items.length > 0
      ? (item.id = this.state.items[this.state.items.length - 1].id + 1)
      : (item.id = 1);
    console.log(item.id);
    let items = this.state.items;
    items.push(item);
    this.setState({ items: items });
  };

  handleQuantity = ({ id, type }) => {
    let items = this.state.items.map((item) => {
      if (item.id === id) {
        if (type === "increment") {
          return { ...item, quantity: parseInt(item.quantity) + 1 };
        } else if (type === "decrement" && item.quantity > 0) {
          return { ...item, quantity: parseInt(item.quantity) - 1 };
        }
      }
      return item;
    });

    this.setState({ items });
  };

  render() {
    return (
      <div className="container">
        <h1>Product List React App</h1>
        <div className="table">
          <Items
            items={this.state.items}
            del={this.deleteItem}
            handleQuantity={this.handleQuantity}
          />
          <AddItem add={this.addItem} />
          <Total items={this.state.items} />
        </div>
      </div>
    );
  }
}

export default App;
