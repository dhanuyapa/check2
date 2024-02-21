const router = require("express").Router();
const Food = require("../models/food");

// Add a new food item
router.post("/addd", async (req, res) => {
  const { foodname, price, description } = req.body;
  try {
    // Create a new instance of the Food model with the provided data
    const newFood = new Food({
      foodname,
      price,
      description,
    });

    // Save the new food item to the database
    const savedFood = await newFood.save();

    // Send a success response
    res.status(200).json({ message: "Food added successfully", data: savedFood });
  } catch (error) {
    // Handle errors
    console.error("Error adding food:", error);
    res.status(500).json({ error: "An error occurred while adding food" });
  }
});

// Fetch all food items
router.get("/fetch", async (req, res) => {
  try {
    const foods = await Food.find();
    res.json(foods);
  } catch (error) {
    console.error("Error fetching foods:", error);
    res.status(500).json({ error: "An error occurred while fetching foods" });
  }
});
// Update a food item
router.put("/edit/:Id", async (req, res) => {
  const foodId = req.params.Id; // Corrected here
  const { foodname, price, description } = req.body;
  try {
    // Find the food item by its ID and update it
    const updatedFood = await Food.findByIdAndUpdate(
      foodId,
      { foodname, price, description },
      { new: true }
    );

    // If the food item doesn't exist, return an error
    if (!updatedFood) {
      return res.status(404).json({ error: "Food item not found" });
    }

    // Send a success response
    res.status(200).json({ message: "Food updated successfully", data: updatedFood });
  } catch (error) {
    // Handle errors
    console.error("Error updating food:", error);
    res.status(500).json({ error: "An error occurred while updating food" });
  }
});


router.delete('/deleteFood/:id', async (req, res) => {
  const idToDelete = req.params.id;

  try {
      const deletedFood = await Food.findByIdAndDelete(idToDelete);

      if (!deletedFood) {
          return res.status(404).json({ status: 'Food not found' });
      }

      res.status(200).json({ status: 'Food deleted successfully' });
  } catch (err) {
      console.error(err.message);
      res.status(500).json({ status: 'Error with deleting food', error: err.message });
  }
});






module.exports = router;
