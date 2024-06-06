// The input window will have a placeholder (such as date) and the user will be able
// to press tab to use the placeholder as actual input information

export default function autoFill() {
  const [inputValue, setInputValue] = useState("");

  const handleKeyDown = (event) => {
    const placeholder = event.target.placeholder;
    if (event.key === "Tab" && inputValue === "") {
      event.preventDefault();
      setInputValue(placeholder);
    }
  };

  return (
    <input
      type="text"
      value={inputValue}
      placeholder="Enter your city name"
      onChange={(e) => setInputValue(e.target.value)}
      onKeyDown={handleKeyDown}
    />
  );
}
