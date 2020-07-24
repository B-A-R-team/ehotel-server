import IntergalLogService from '../service/intergal_log.service';
import express from 'express';
const router = express.Router();

const intergalLogService = new IntergalLogService();

/**
 * get log by id
 * @route GET /intergalLogs/:id
 * @param {String} id.params
 */
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const log = intergalLogService.getIntergalLogById(id);
    res.json({ code: 0, data: log });
  } catch (error) {
    res.json({ code: 1, message: error });
  }
});

/**
 * get log by user id
 * @route GET /intergalLogs/getby?userId=
 * @param {String} userId.query
 */
router.get('/getby', async (req, res) => {
  const { userId } = req.query;
  try {
    const logs = intergalLogService.getIntergalLogByUserId(userId);
    res.json({ code: 0, data: logs });
  } catch (error) {
    res.json({ code: 1, message: error });
  }
});

/**
 * create a new intergal log
 * @route POST /intergalLogs/create
 * @param {string} user_id.body
 * @param {boolean} is_out.body
 * @param {number} sell_count.body
 * @param {string} remarks.body
 */
router.post('/create', async (req, res) => {
  const { user_id, is_out, sell_count, remarks } = req.body;
  try {
    await intergalLogService.create({ user_id, is_out, sell_count, remarks });

    res.json({ code: 0, message: 'SUCCESS' });
  } catch (error) {
    res.json({ code: 1, message: error });
  }
});

/**
 * update intergal log
 * @route PUT /intergalLog/update/:id
 * @param {string} id.params
 * @param {string} user_id.body
 * @param {boolean} is_out.body
 * @param {number} sell_count.body
 * @param {string} remarks.body
 */
router.put('/update/:id', async (req, res) => {
  const { id } = req.params;
  const { user_id, is_out, sell_count, remarks } = req.body;
  try {
    await intergalLogService.update(id, {
      user_id,
      is_out,
      sell_count,
      remarks,
    });
    res.json({ code: 0, message: 'SUCCESS' });
  } catch (error) {
    res.json({ code: 1, message: error });
  }
});

/**
 * delete intergal log by id
 * @route DELETE /intergalLog/delete/:id
 * @param {string} id.params
 */
router.delete('/delete/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await intergalLogService.remove(id);
    res.json({ code: 0, message: 'SUCCESS' });
  } catch (error) {
    res.json({ code: 1, message: error });
  }
});

export default router;
