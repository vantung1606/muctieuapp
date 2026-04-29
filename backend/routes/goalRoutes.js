const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const { calculateSavingPlan } = require('../services/goalService');

const prisma = new PrismaClient();

// Get all goals
router.get('/', async (req, res) => {
  try {
    const goals = await prisma.goal.findMany({
      orderBy: { createdAt: 'desc' }
    });
    res.json(goals);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Create a goal
router.post('/', async (req, res) => {
  try {
    const { title, target_amount, current_amount, deadline } = req.body;
    
    const saving_plan = calculateSavingPlan(
      parseFloat(target_amount),
      parseFloat(current_amount || 0),
      deadline
    );

    const goal = await prisma.goal.create({
      data: {
        title,
        target_amount: parseFloat(target_amount),
        current_amount: parseFloat(current_amount || 0),
        deadline: new Date(deadline),
        saving_plan
      }
    });
    res.status(201).json(goal);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Update current amount
router.patch('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { current_amount } = req.body;

    const existingGoal = await prisma.goal.findUnique({ where: { id } });
    if (!existingGoal) return res.status(404).json({ error: 'Goal not found' });

    const newCurrentAmount = parseFloat(current_amount);
    const saving_plan = calculateSavingPlan(
      existingGoal.target_amount,
      newCurrentAmount,
      existingGoal.deadline
    );

    const updatedGoal = await prisma.goal.update({
      where: { id },
      data: {
        current_amount: newCurrentAmount,
        saving_plan
      }
    });
    res.json(updatedGoal);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Delete a goal
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.goal.delete({ where: { id } });
    res.status(204).send();
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
