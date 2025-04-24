const Chapter = require("../schemas/chapterSchema");

// 🔍 Search: Retrieves a chapter by its title
const getChapterByTitle = async (req, res) => {
    try {
        const chapter = await Chapter.findOne({ title: req.params.title });

        if (!chapter) {
            return res.status(404).json({ error: "Chapter not found" });
        }

        res.status(200).json(chapter);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
// 🔍 Search: Retrieves chapters by the course ID
const getChaptersByCourseId = async (req, res) => {
    try {
        const chapters = await Chapter.find({ courseId: req.params.courseId });
        console.log(req.params.courseId)
        if (!chapters || chapters.length === 0) {
            return res.status(404).json({ error: "No chapters found for this course" });
        }

        res.status(200).json(chapters);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// 🔍 Search: Retrieves a chapter by its unique ID
const getChapterById = async (req, res) => {
    try {
        const chapter = await Chapter.findById(req.params.id);

        if (!chapter) {
            return res.status(404).json({ error: "Chapter not found" });
        }

        res.status(200).json(chapter);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
// 📜 Fetch: Retrieves all chapters from the database
const getAllChapters = async (req, res) => {
    try {
        const chapters = await Chapter.find();
        res.status(200).json(chapters);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
// ❌ Delete: Deletes a chapter by its unique ID
const deleteChapter = async (req, res) => {
    try {
        const chapter = await Chapter.findByIdAndDelete(req.params.id);

        if (!chapter) {
            return res.status(404).json({ error: "Chapter not found" });
        }

        res.status(200).json({ message: "Chapter deleted successfully" });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
// 🔄 Update: Updates an existing chapter with new data
const updateChapter = async (req, res) => {
    try {
        const { title, description, courseId } = req.body;

        const chapter = await Chapter.findByIdAndUpdate(
            req.params.id,
            { title, description, courseId },
            { new: true, runValidators: true }
        );

        if (!chapter) {
            return res.status(404).json({ error: "Chapter not found" });
        }

        res.status(200).json(chapter);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
const createChapter = async (req, res) => {
    try {
        const { title, description, image, courseId } = req.body;

        const newChapter = new Chapter({
            title,
            description,
            image,
            courseId
        });

        const savedChapter = await newChapter.save();
        res.status(201).json(savedChapter);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

module.exports=
{
    getChapterByTitle,
    getChaptersByCourseId,
    getChapterById,
    getAllChapters,
    deleteChapter,
    updateChapter,createChapter
}