import React from 'react';
import styles from '../../../styles/JoinPlanting.module.scss';

interface ItemType {
    icon: any;
    name: string;
}
interface ListProps {
    category: string;
    list: ItemType[],
    selected: string[],
    onItemClick: (e: React.MouseEvent<HTMLLIElement>) => void;
}
interface ItemProps {
    category: ListProps['category'];
    item: ItemType;
    selected: ListProps['selected'];
    onClick: ListProps['onItemClick'];
}

const Item = ({ category, item, selected, onClick }: ItemProps) => {
    return (
        <li
            data-name={category}
            data-value={item.name}
            onClick={onClick}
            className={`${styles.s_list_item} ${selected.includes(item.name) && styles.active}`}
        >
            <div className={styles.content_item}>
                {item.icon}
                <span>{item.name}</span>
            </div>
        </li>
    );
};

const List = ({ category, list, selected, onItemClick }: ListProps) => {
    return (
        <ul className={styles.s_list}>
            {list.map((item, index) => (
                <Item key={index} category={category} item={item} selected={selected} onClick={onItemClick} />
            ))}
        </ul>
    );
};

export default List;
