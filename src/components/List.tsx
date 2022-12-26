import { useState } from "react";

interface IItems {
    initialItems: string[]
}

const List = ({ initialItems }: IItems) => {

    const [list, setList] = useState(initialItems);
    const [newItem, setNewItem] = useState('');

    const addItem = () => {
        const noBlankItem = newItem.replace(/\s/g, '');

        const isRepeatedItem = list.find(element => element == newItem);

        if (newItem != '' && noBlankItem.length != 0 && !isRepeatedItem) {
            // connection ms test
            setTimeout(() => {
                setList(state => [...state, newItem])
            }, 500);
        };
    };

    const removeItem = (itemName: string) => {
        setTimeout(() => {
            setList(state => state.filter(item => item != itemName))
        }, 500)
    }

    return (
        <div className="App">
            <input
                type="text"
                placeholder="Item Name"
                aria-label="text"
                value={newItem}
                onChange={e => setNewItem(e.target.value)}
            />
            <ul>
                {list.map((item) => {
                    return (
                        <li key={item}>
                            {item}
                            <button onClick={() => removeItem(item)}>
                                remove
                            </button>
                        </li>
                    )
                })}
            </ul>
            <button onClick={addItem}>add</button>
        </div>
    );
};

export default List;