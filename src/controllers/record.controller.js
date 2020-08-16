import { RecordService } from '../service';
import express from 'express';
const router = express.Router();

const recordService = new RecordService();

/**
 * 根据ID获取记录
 * @route GET /records/getbyId?id
 */
router.get('/getbyId', async (req, res) => {
  const { id } = req.query;
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
 */
router.post('/create', async (req, res) => {
  const {
    hotel_id,
    room_id,
    guest_id,
    member_message,
    remarks,
    active_id,
    status,
    coupon,
    price,
  } = req.body;

  try {
    const record = await recordService.create({
      hotel_id,
      room_id,
      guest_id,
      member_message,
      remarks,
      active_id,
      status,
      coupon,
      price,
    });
    res.json({
      code: 0,
      message: 'SUCCESS',
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
 * 将某条记录设置为有效记录
 * @route PUT /records/setopen/:id
 * @param {String} id.params
 */
router.put('/setopen/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await recordService.setOpen(id);
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
 * @route PUT /records/update/:id
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
    status,
    coupon,
    price,
  } = req.body;

  try {
    await recordService.update(id, {
      hotel_id,
      room_id,
      guest_id,
      member_message,
      remarks,
      active_id,
      status,
      coupon,
      price,
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
 * 删除订单记录
 * @route DELETE /records/delete/:id
 */
router.delete('/delete/:id', async (req, res) => {
  const { id } = req.params;

  try {
    await recordService.removeById(id);
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
