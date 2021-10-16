
const { 
    createCategory,
    updateCategory, 
    deleteCategory,
    getCategories
} = require('../controllers/category');
const { isSignedIn, isAuthorized, isAdmin } = require('../middleware/auth');

const router = require('express').Router();

router.post('/:userId',isSignedIn, isAuthorized, isAdmin, createCategory);

router.put('/:categoryId/:userId', isSignedIn, isAuthorized, isAdmin, updateCategory);

router.delete('/:categoryId/:userId', isSignedIn, isAuthorized, isAdmin, deleteCategory);

router.get('/:userId', isSignedIn, isAuthorized, getCategories);

module.exports = router;