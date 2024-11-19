exports.register = (req, res) => {
    const { name, email, password } = req.body;
    // Logic for registering a user
    res.status(200).json({ message: 'User registered successfully', user: { name, email } });
  };
  
  exports.login = (req, res) => {
    const { email, password } = req.body;
    // Logic for user login (authentication)
    if (email && password) {
      res.status(200).json({ message: 'Login successful', token: 'mock-jwt-token' });
    } else {
      res.status(400).json({ error: 'Invalid email or password' });
    }
  };
  
