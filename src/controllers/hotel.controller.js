import HotelService from '../service/hotel.service';
import express from 'express';
const router = express.Router();

const hotelService = new HotelService();

/**
 * 根据id获取酒店
 * @route GET /hotels/:id
 * @param {String} id.params
 */
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  const hotel = await hotelService.getHotelById(id);

  res.json({
    code: 0,
    data: hotel,
  });
});

/**
 * 创建酒店
 * @route POST /hotel/create
 * @param {String} title.body
 * @param {String} address.body
 * @param {String} phone.body
 * @param {String} open_time.body
 * @param {String} end_time.body
 * @param {String} owners_id.body
 * @param {String} desc.body
 */
router.post('/create', async (req, res) => {
  const {
    title,
    address,
    phone,
    open_time,
    end_time,
    owners_id,
    desc,
  } = req.body;

  if (
    !title ||
    !address ||
    !phone ||
    !open_time ||
    !end_time ||
    !owners_id ||
    !desc
  ) {
    return res.json({
      code: 1,
      message: '请填写完整数据',
    });
  }

  try {
    await hotelService.create({
      title,
      address,
      phone,
      open_time,
      end_time,
      owners_id,
      desc,
    });
    res.json({
      code: 0,
      message: 'SUCCESS',
    });
  } catch (error) {
    res.json({
      code: 1,
      message: error,
    });
  }
});

/**
 * 修改酒店信息
 * @route PUT /hotel/update/:id
 * @param {String} id.params
 * @param {String} title.body
 * @param {String} address.body
 * @param {String} phone.body
 * @param {String} open_time.body
 * @param {String} end_time.body
 * @param {String} owners_id.body
 * @param {String} desc.body
 */
router.put('/update/:id', async (req, res) => {
  const { id } = req.params;
  const {
    title,
    address,
    phone,
    open_time,
    end_time,
    owners_id,
    desc,
  } = req.body;

  if (
    !title ||
    !address ||
    !phone ||
    !open_time ||
    !end_time ||
    !owners_id ||
    !desc
  ) {
    return res.json({
      code: 1,
      message: '请填写完整数据',
    });
  }
  try {
    await hotelService.update(id, {
      title,
      address,
      phone,
      open_time,
      end_time,
      owners_id,
      desc,
    });

    res.json({
      code: 0,
      message: 'SUCCESS',
    });
  } catch (error) {
    res.json({
      code: 1,
      message: error,
    });
  }
});

export default router;
