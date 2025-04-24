const {Exercise}=require("../schemas/exerciseSchema");
// 🔍 Search: Retrieves exercises by the lesson ID
const getExercisesByLessonId = async (req, res) => {
    try {
        const exercises = await Exercise.find({ lessonId: req.params.lessonId });

        if (!exercises || exercises.length === 0) {
            return res.status(404).json({ error: "No exercises found for this lesson" });
        }

        res.status(200).json(exercises);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
// 🔍 Search: Retrieves an exercise by its unique ID
const getExerciseById = async (req, res) => {
    try {
        const exercise = await Exercise.findById(req.params.id);

        if (!exercise) {
            return res.status(404).json({ error: "Exercise not found" });
        }

        res.status(200).json(exercise);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
// 📜 Fetch: Retrieves all exercises from the database
const getAllExercises = async (req, res) => {
    try {
        const exercises = await Exercise.find();
        res.status(200).json(exercises);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
// ❌ Delete: Deletes an exercise by its unique ID
const deleteExercise = async (req, res) => {
    try {
        const exercise = await Exercise.findByIdAndDelete(req.params.id);

        if (!exercise) {
            return res.status(404).json({ error: "Exercise not found" });
        }

        res.status(200).json({ message: "Exercise deleted successfully" });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
// 🔄 Update: Updates an existing exercise with new data
const updateExercise = async (req, res) => {
    try {
        const { title, description, lessonId } = req.body;

        const exercise = await Exercise.findByIdAndUpdate(
            req.params.id,
            { title, description, lessonId },
            { new: true, runValidators: true }
        );

        if (!exercise) {
            return res.status(404).json({ error: "Exercise not found" });
        }

        res.status(200).json(exercise);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
module.exports={
    getExercisesByLessonId,
    getExerciseById,
    getAllExercises,
    deleteExercise,
    updateExercise
}