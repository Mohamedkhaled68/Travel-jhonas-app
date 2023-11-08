import React, { useState } from 'react';
import './index.css';
const arr = [];
for (let i = 1; i <= 20; i++) {
    arr.push(i);
}

const App = () => {
    const [items, setItems] = useState([]);
    const handelAddItem = (item) => {
        setItems([...items, item]);
    };
    return (
        <div className="app">
            <Logo />
            <Form setItems={setItems} items={items} onAddItem={handelAddItem} />
            <PackageList items={items} setItems={setItems} />
            <Footer items={items} />
        </div>
    );
};

const Logo = () => {
    return (
        <>
            <h1>💼 Travel App 😎</h1>
        </>
    );
};

const Form = ({ setItems, items, onAddItem }) => {
    const [description, setDescription] = useState('');
    const [quantity, setQuantity] = useState(1);
    const handleSubmit = (e) => {
        e.preventDefault();
        const item = {
            id: Date.now(),
            description,
            quantity,
            packed: false,
        };
        onAddItem(item);
        setDescription('');
        setQuantity(1);
    };
    return (
        <>
            <form onSubmit={handleSubmit} className="add-form">
                <h3>What do you for your 😍 trip ? </h3>
                <select
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                >
                    {arr.map((i) => {
                        return (
                            <option key={i} value={i}>
                                {i}
                            </option>
                        );
                    })}
                </select>
                <input
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="item..."
                    type="text"
                />
                <button>Add</button>
            </form>
        </>
    );
};

const PackageList = ({ items, setItems }) => {
    return (
        <>
            <div className="list">
                <ul>
                    {items.map((el, idx) => {
                        return (
                            <Item
                                key={idx}
                                el={el}
                                items={items}
                                setItems={setItems}
                            />
                        );
                    })}
                </ul>
            </div>
        </>
    );
};

const Item = ({ el, items, setItems }) => {
    const removeFromItems = (id) => {
        const newItems = items.filter((item) => item.id !== id);
        setItems(newItems);
    };

    const checkItem = (id) => {
        const newItems = items.map((item) =>
            item.id == id ? { ...item, packed: !item.packed } : item
        );
        setItems(newItems);
    };
    return (
        <li>
            <input
                type="checkbox"
                onChange={() => {
                    checkItem(el.id);
                }}
            />
            <span>{el.quantity}</span>
            <span className={el.packed ? 'checked' : ''}>{el.description}</span>
            <button onClick={() => removeFromItems(el.id)}>❌</button>
        </li>
    );
};

const Footer = ({ items }) => {
    const packedItems = items.filter((item) => item.packed === true);
    console.log(items.length);
    return (
        <>
            <footer className="stats">
                <p>
                    You have {items.length}{' '}
                    {items.length > 1 ? 'items' : 'item'} on your list, and you
                    already packed {packedItems.length} {''}(
                    {items.length === 0
                        ? '0'
                        : Math.round((packedItems.length / items.length) * 100)}
                    %)
                </p>
            </footer>
        </>
    );
};
export default App;
