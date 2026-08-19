import Bug from "../models/bug.js";

export const createBug = async (req, res) => {
  try {
    const { title, description, status, priority, category, deadline } = req.body;

    if (!title || !description) {
      return res.status(400).json({
        success: false,
        message: "Title and description are required",
      });
    }

    const bug = await Bug.create({
      title,
      description,
      status,
      priority,
      category,
      deadline,
      createdBy: req.user._id,
    });

    return res.status(201).json({
      success: true,
      message: "Bug created successfully",
      bug,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


export const getBugs = async (req, res) => {
  try {
    const bugs = await Bug.find({ createdBy: req.user._id }).sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      count: bugs.length,
      bugs,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


export const getBugById = async (req, res) => {
  try {
    const bug = await Bug.findById(req.params.id);

    if (!bug) {
      return res.status(404).json({
        success: false,
        message: "Bug not found",
      });
    }

    return res.status(200).json({
      success: true,
      bug,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


export const updateBug = async (req, res) => {
  try {
    let bug = await Bug.findById(req.params.id);

    if (!bug) {
      return res.status(404).json({
        success: false,
        message: "Bug not found",
      });
    }

    bug = await Bug.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    return res.status(200).json({
      success: true,
      message: "Bug updated successfully",
      bug,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


export const deleteBug = async (req, res) => {
  try {
    const bug = await Bug.findById(req.params.id);

    if (!bug) {
      return res.status(404).json({
        success: false,
        message: "Bug not found",
      });
    }

    await bug.deleteOne();

    return res.status(200).json({
      success: true,
      message: "Bug deleted successfully",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};