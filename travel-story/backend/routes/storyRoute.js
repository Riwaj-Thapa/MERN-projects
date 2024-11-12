import express from 'express';
import Story from '../models/storyModel.js';
import { placePictureUpload } from '../config/multerConfig.js';

const router = express.Router();

// Route for Save a new Story
router.post('/', placePictureUpload.single('photo'), async (req, res) => {
    const { location, countryName, visitedYear, description } = req.body;
    try {
        if (!location || !countryName || !visitedYear || !description) {
            return res.status(400).send({
                message: 'Send all required fields: location, countryName, visited year and description',
            });
        }
        const photoPath = req.file ? req.file.path : null;
        if (!photoPath) {
            return res.status(400).send({
                message: 'Photo is required. Please upload an image.'
            });
        }
        const story = await Story.create({
            location,
            countryName,
            visitedYear,
            description,
            photo: photoPath,
        });
        return res.status(201).send(story);
    } catch (error) {
        console.log(error.message);
        return res.status(500).send({ message: error.message });
    }
});

// Route for Get All Stories from database
router.get('/', async (req, res) => {
    try {
        const stories = await Story.find({});
        return res.status(200).json({
            count: stories.length,
            data: stories,
        });
    } catch (error) {
        console.log(error.message);
        return res.status(500).send({ message: error.message });
    }
});

// Route for Get One Story from database by id
router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const story = await Story.findById(id);
        if (!story) {
            return res.status(404).json({ message: 'Story not found' });
        }
        return res.status(200).json(story);
    } catch (error) {
        console.log(error.message);
        return res.status(500).send({ message: error.message });
    }
});

// Route for Update a Story with photo
router.put('/:id', placePictureUpload.single('photo'), async (req, res) => {
    const { location, countryName, visitedYear, description } = req.body;
    try {
        if (!location || !countryName || !visitedYear || !description) {
            return res.status(400).json({
                message: 'All required fields (location, countryName, visitedYear, and description) must be provided.',
            });
        }

        const { id } = req.params;

        const story = await Story.findById(id);
        if (!story) {
            return res.status(404).json({ message: 'Story not found' });
        }

        story.location = location;
        story.countryName = countryName;
        story.visitedYear = visitedYear;
        story.description = description;

        if (req.file) {
            story.photo = req.file.path;
        }

        const updatedStory = await story.save();

        return res.status(200).json({
            message: 'Story updated successfully',
            story: updatedStory,
        });
    } catch (error) {
        console.error(error.message);
        return res.status(500).json({ message: error.message });
    }
});

// Route for Delete a Story
router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;

        const result = await Story.findByIdAndDelete(id);
        if (!result) {
            return res.status(404).json({ message: 'Story not found' });
        }

        return res.status(200).send({ message: 'Story deleted successfully' });
    } catch (error) {
        console.log(error.message);
        return res.status(500).send({ message: error.message });
    }
});

export default router;
