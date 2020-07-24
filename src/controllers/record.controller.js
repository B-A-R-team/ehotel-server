import { RecordService } from '../service';
import express from 'express';
const router = express.Router();

const recordService = new RecordService();

/**
 * 根据ID获取记录
 * @route GET /records/:id
 * @param {string} id.params
 */
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const record = await recordService.getRecordById(id);
    res.json({
      code: 0,
      data: record,
    });
  } catch (error) {
    res.json({
      code: 1,
      message: error,
    });
  }
});

/**
 * 根据酒店ID/(房间ID/客户ID)获取
 * @route GET /records/getby?hotelId=
 * @route GET /records/getby?roomId=
 * @route GET /records/getby?guestId=
 * @param {String} hotelId.query
 */
router.get('/getby', async (req, res) => {
  const { hotelId, roomId, guestId } = req.query;
  try {
    let record;
    let pass_sign = true;
    // 如果传入多个参数，仅获取一次
    if (hotelId && pass_sign) {
      record = await recordService.getRecordByHotelId(hotelId);
      pass_sign = false;
    }
    if (roomId && pass_sign) {
      record = await recordService.getRecordByRoomId(roomId);
      pass_sign = false;
    }
    if (guestId && pass_sign) {
      record = await recordService.getRecordByGuestId(guestId);
      pass_sign = false;
    }
    res.json({
      code: 0,
      data: record,
    });
  } catch (error) {
    res.json({
      code: 1,
      message: error,
    });
  }
});

/**
 * 创建记录
 * @route POST /records/create
 * @param {String} hotel_id.body
 * @param {String} room_id.body
 * @param {String} guest_id.body
 * @param {String} member_message.body - json格式字符串
 * @param {String} remarks.body
 * @param {String} active_id.body
 */
router.post('/create', async (req, res) => {
  const {
    hotel_id,
    room_id,
    guest_id,
    member_message,
    remarks,
    active_id,
  } = req.body;

  try {
    await recordService.create({
      hotel_id,
      room_id,
      guest_id,
      member_message,
      remarks,
      active_id,
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
 * 将某条记录设置为无效记录
 * @route PUT /records/setclose/:id
 * @param {String} id.params
 */
router.put('/setclose/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await recordService.setClose(id);
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
 * 更新记录信息
 * @route PUT /records/update
 * @param {String} id.params
 * @param {String} hotel_id.body
 * @param {String} room_id.body
 * @param {String} guest_id.body
 * @param {String} member_message.body - json格式字符串
 * @param {String} remarks.body
 * @param {String} active_id.body
 */
router.put('/update/:id', async (req, res) => {
  const { id } = req.params;
  const {
    hotel_id,
    room_id,
    guest_id,
    member_message,
    remarks,
    active_id,
  } = req.body;

  try {
    await recordService.update(id, {
      hotel_id,
      room_id,
      guest_id,
      member_message,
      remarks,
      active_id,
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
