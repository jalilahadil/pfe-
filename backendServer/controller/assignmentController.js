const Assignment = require('../schemas/assignmentSchema');
const Exercice = require('../schemas/exerciseSchema');
const Student = require('../schemas/studentSchema');
// Create a new assignment
const createAssignment = async (req, res) => {
  try {
    const assignment = new Assignment(req.body);
    await assignment.save();
    res.status(201).json(assignment);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
// Get all assignments
const getAllAssignments = async (req, res) => {
  try {
    const assignments = await Assignment.find();
    res.json(assignments);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
// Get assignment by ID
const getAssignmentById = async (req, res) => {
  try {
    const assignment = await Assignment.findById(req.params.id);
    if (!assignment) {
      return res.status(404).json({ error: 'Assignment not found' });
    }
    res.json(assignment);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
// Get assignments by userId
const getAssignmentsByUserId = async (req, res) => {
  try {
    const assignments = await Assignment.find({ userId: req.params.id }).lean();

    // Fetch all exerciceIds and studentIds
    const exerciceIds = assignments.map(a => a.exerciceId);
    const studentIds = assignments.map(a => a.userId);
    console.log(studentIds)
    // Fetch exercices
    const exercices = await Exercice.find({ _id: { $in: exerciceIds } }).lean();

    // Fetch students
    const students = await Student.find({ _id: { $in: studentIds } }).lean();
    console.log(students)
    // Create maps for quick access
    const exerciceMap = {};
    exercices.forEach(ex => {
      exerciceMap[ex._id.toString()] = ex;
    });

    const studentMap = {};
    students.forEach(st => {
      studentMap[st._id.toString()] = st;
    });

    // Attach exercice and student details to each assignment
    const assignmentsWithDetails = assignments.map(assignment => ({
      ...assignment,
      exercice: exerciceMap[assignment.exerciceId?.toString()] || null,
      student: studentMap[assignment.userId?.toString()] || null
    }));

    res.json(assignmentsWithDetails);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update an assignment by ID
const updateAssignment = async (req, res) => {
  try {
    const updated = await Assignment.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updated) {
      return res.status(404).json({ error: 'Assignment not found' });
    }
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
// Delete an assignment by ID
const deleteAssignment = async (req, res) => {
  try {
    const deleted = await Assignment.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ error: 'Assignment not found' });
    }
    res.json({ message: 'Assignment deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
module.exports={createAssignment,
    getAllAssignments,
    getAssignmentById,
    getAssignmentsByUserId,
    updateAssignment,
    deleteAssignment}