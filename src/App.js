import { useState } from "react";
import "./App.css";

const inititem = [
  { id: 1, description: "Passport", Quantity: 2, Packed: false },
  { id: 2, description: "Socks", Quantity: 12, Packed: false },
  { id: 3, description: "Charger", Quantity: 1, Packed: true },
];

export default function App() {
  const [items, setItems] = useState(inititem);

  function handleAddItem(item) {
    setItems((prev) => [...prev, item]);
  }

  function handleDeleteItem(id) {
    setItems((prev) => prev.filter((item) => item.id !== id));
  }

  function handleTogglePacked(id) {
    setItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, Packed: !item.Packed } : item
      )
    );
  }

  return (
    <div className="app">
      <Logo />
      <Form onAddItem={handleAddItem} />
      <PackingList
        items={items}
        onDeleteItem={handleDeleteItem}
        onTogglePacked={handleTogglePacked}
      />
      <Stats items={items} />
    </div>
  );
}

function Logo() {
  return <h1>Far Away</h1>;
}

function Form({ onAddItem }) {
  const [description, setDescription] = useState("");
  const [Quantity, setQuantity] = useState(1);

  function handleSubmit(e) {
    e.preventDefault();
    if (!description) return;

    const newItem = { id: Date.now(), description, Quantity, Packed: false };
    onAddItem(newItem);

    setDescription("");
    setQuantity(1);
  }

  return (
    <form className="addform" onSubmit={handleSubmit}>
      <h2>What do you need for your trip?</h2>
      <select
        value={Quantity}
        onChange={(e) => setQuantity(Number(e.target.value))}
      >
        {Array.from({ length: 20 }, (_, i) => i + 1).map((num) => (
          <option value={num} key={num}>
            {num}
          </option>
        ))}
      </select>
      <input
        type="text"
        placeholder="...item"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <button>Add</button>
    </form>
  );
}

function PackingList({ items, onDeleteItem, onTogglePacked }) {
  return (
    <div className="List">
      <ul>
        {items.map((item) => (
          <Item
            item={item}
            key={item.id}
            onDeleteItem={onDeleteItem}
            onTogglePacked={onTogglePacked}
          />
        ))}
      </ul>
    </div>
  );
}

function Item({ item, onDeleteItem, onTogglePacked }) {
  return (
    <li className={item.Packed ? "packed" : ""}>
      <label>
        <input
          type="checkbox"
          checked={item.Packed}
          onChange={() => onTogglePacked(item.id)}
        />
        {item.description} ({item.Quantity})
      </label>
      <button onClick={() => onDeleteItem(item.id)}>❌</button>
    </li>
  );
}

function Stats({ items }) {
  if (items.length === 0)
    return (
      <footer>
        <em>Start adding items to your packing list 🚀</em>
      </footer>
    );

  const numItems = items.length;
  const numPacked = items.filter((item) => item.Packed).length;
  const percentage = Math.round((numPacked / numItems) * 100);

  return (
    <footer>
      <em>
        You have {numItems} items on your list, and you already packed{" "}
        {numPacked} ({percentage}%)
      </em>
    </footer>
  );
}
