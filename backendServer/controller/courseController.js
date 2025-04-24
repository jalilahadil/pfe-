const Course=require("../schemas/courseSchema");
// 🔍 Search: Retrieves courses by the category ID
const getCoursesByCategoryId = async (req, res) => {
    try {
        const courses = await Course.find({ categoryId: req.params.categoryId });

        if (!courses || courses.length === 0) {
            return res.status(404).json({ error: "No courses found for this category" });
        }

        res.status(200).json(courses);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
// 🔍 Search: Retrieves courses by the creator ID
const getCoursesByCreatorId = async (req, res) => {
    try {
        const courses = await Course.find({ creatorId: req.params.creatorId });

        if (!courses || courses.length === 0) {
            return res.status(404).json({ error: "No courses found for this creator" });
        }

        res.status(200).json(courses);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
// 🔍 Search: Retrieves a course by its unique ID
const getCourseById = async (req, res) => {
    try {
        const course = await Course.findById(req.params.id);

        if (!course) {
            return res.status(404).json({ error: "Course not found" });
        }

        res.status(200).json(course);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
// 📜 Fetch: Retrieves all courses from the database
const getAllCourses = async (req, res) => {
    try {
        const courses = await Course.find();
        res.status(200).json(courses);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
// ❌ Delete: Deletes a course by its unique ID
const deleteCourse = async (req, res) => {
    try {
        const course = await Course.findByIdAndDelete(req.params.id);

        if (!course) {
            return res.status(404).json({ error: "Course not found" });
        }

        res.status(200).json({ message: "Course deleted successfully" });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
// 🔄 Update: Updates an existing course with new data
const updateCourse = async (req, res) => {
    try {
        const { title,
            description,
            categoryId,
            creatorId,
            duration,
            chapters,
            lessonsCount,
            price } = req.body;

        const course = await Course.findByIdAndUpdate(
            req.params.id,
            { title,
                description,
                categoryId,
                creatorId,
                duration,
                chapters,
                lessonsCount,
                price},
            { new: true, runValidators: true }
        );

        if (!course) {
            return res.status(404).json({ error: "Course not found" });
        }

        res.status(200).json(course);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
const addCourse = async (req, res) => {
    try {
        const { title, description, categoryId, creatorId, duration, chapters, lessonsCount, price } = req.body;

        // Create a new course instance with the provided data
        const course = new Course({
            title,
            description,
            categoryId,
            creatorId,
            duration,
            chapters,
            lessonsCount,
            price
        });

        // Save the course to the database
        await course.save();

        // Send the response with the newly created course
        res.status(201).json(course);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

module.exports={
    getCoursesByCategoryId,
    getCoursesByCreatorId,
    getCourseById,
    getAllCourses,
    deleteCourse,
    updateCourse,addCourse
}
