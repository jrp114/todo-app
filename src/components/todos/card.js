export default function Card(props) {
  const {
    item,
    i,
    dragging,
    index,
    setDragging,
    setIndex,
    items,
    remove,
    setCurrent,
  } = props;
  return (
    <div
      key={item.id}
      className={dragging && index === i ? 'text-green-500 font-bold' : ''}
      draggable
      onDragStart={() => {
        setDragging(true);
        setIndex(i);
        setCurrent(items[i]);
      }}
      onDragEnd={() => {
        setDragging(false);
        setIndex(undefined);
      }}
      onClick={() => remove(item.id)}
    >
      {item.name} ({item.description})
    </div>
  );
}
