import { ActiveService } from '../service';
import express from 'express';
const router = express.Router();

const activeService = new ActiveService();

/**
 * get active info by id
 * @route GET /actives/:id
 * @param {string} id.params
 */
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const active = await activeService.getActiveById(id);
    res.json({ code: 0, data: active });
  } catch (error) {
    res.json({ code: 0, message: error });
  }
});

/**
 * get actives info by hotel id
 * @route GET /actives/getby?hotelId=
 * @param {String} hotelId.query
 */
router.get('/getby', async (req, res) => {
  const { hotelId } = req.query;
  try {
    const active = await activeService.getActiveByHotelId(hotelId);
    res.json({ code: 0, data: active });
  } catch (error) {
    res.json({ code: 1, message: error });
  }
});

/**
 * create a active
 * @route POST /actives/create
 * @param {string} topic.body
 * @param {Date} start_time.body
 * @param {Date} end_time.body
 * @param {string} detail.body
 * @param {string} desc.body
 * @param {string} hotel_id.body
 */
router.post('/create', async (req, res) => {
  const { topic, start_time, end_time, detail, desc, hotel_id } = req.body;
  try {
    await activeService.create({
      topic,
      start_time,
      end_time,
      detail,
      desc,
      hotel_id,
    });

    res.json({ code: 0, message: 'SUCCESS' });
  } catch (error) {
    res.json({ code: 1, message: error });
  }
});

/**
 * update active info by id
 * @route PUT /actives/update/:id
 * @param {string} id.params
 * @param {string} topic.body
 * @param {Date} start_time.body
 * @param {Date} end_time.body
 * @param {string} detail.body
 * @param {string} desc.body
 * @param {string} hotel_id.body
 */
router.post('/update/:id', async (req, res) => {
  const { id } = req.params;
  const { topic, start_time, end_time, detail, desc, hotel_id } = req.body;
  try {
    await activeService.update(id, {
      topic,
      start_time,
      end_time,
      detail,
      desc,
      hotel_id,
    });

    res.json({ code: 0, message: 'SUCCESS' });
  } catch (error) {
    res.json({ code: 1, message: error });
  }
});

/**
 * delete a active by id
 * @route DELETE /actives/delete/:id
 * @param {string} id.params
 */
router.delete('/delete/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await activeService.remove(id);
    res.json({ code: 0, message: 'SUCCESS' });
  } catch (error) {
    res.json({ code: 1, message: error });
  }
});

export default router;
