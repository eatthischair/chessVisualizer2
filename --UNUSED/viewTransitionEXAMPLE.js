import { useState } from 'react';
export default function App() {
  const [count, setCount] = useState(0);

  const handleClick = () => {
    if (document.startViewTransition) {
      document.startViewTransition(() => {
        setCount(c => c + 1);
      });
    } else {
      setCount(c => c + 1);
    }
  };

  return (
    <div className=" ml-36 border">
      <p>{count}</p>
      <button onClick={handleClick}>Increment</button>
    </div>
  );
}
