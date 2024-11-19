const items = [
    { id: 1, name: 'Used Textbook', description: 'A textbook on calculus', price: 200 },
    { id: 2, name: 'Scientific Calculator', description: 'Calculator in good condition', price: 500 },
  ];
  exports.getAllItems = (req, res) => {
    res.status(200).json(items);};
  
  // Function to create a new item
  exports.createItem = (req, res) => {
    const { name, description, price } = req.body;
    const newItem = { id: items.length + 1, name, description, price };
    items.push(newItem);
    res.status(201).json(newItem);};
  exports.getItemById = (req, res) => {
    const { id } = req.params;
    const item = items.find(item => item.id == id);
    if (item) {
      res.status(200).json(item);
    } else {
      res.status(404).json({ error: 'Item not found' });
    }
  };
  
