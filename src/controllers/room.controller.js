// TODO 许多功能

import { RoomService } from '../service';
import express from 'express';
const router = express.Router();

const roomService = new RoomService();

/**
 * 根据ID查找房间
 * @route GET /rooms/:id
 * @param {String} id.params
 */
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  const room = await roomService.getRoomById(id);
  if (room !== null) {
    return res.json({
      code: 0,
      data: room,
    });
  }
  res.json({
    code: 1,
    message: '未找到房间',
  });
});

/**
 * 创建房间
 * @route POST /rooms/create
 * @param {String} title.body
 * @param {number} room_num.body
 * @param {number} room_count.body
 * @param {number} max_count.body
 * @param {number} empty_count.body
 * @param {String} hotel_id.body
 * @param {number} new_price.body
 * @param {[String]} img_url.body
 * @param {String} desc.body
 * @param {String} room_info.body
 * @param {String} computer_info.body
 */
router.post('/create', async (req, res) => {
  const {
    title,
    room_num,
    room_count,
    max_count,
    empty_count,
    hotel_id,
    new_price,
    img_url,
    desc,
    room_info,
    computer_info,
  } = req.body;
  try {
    await roomService.create({
      title,
      room_num,
      room_count,
      max_count,
      empty_count,
      hotel_id,
      new_price,
      img_url,
      desc,
      room_info,
      computer_info,
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
 * 修改房间信息
 * @route POST /rooms/update/:id
 * @param {String} id.params
 * @param {String} title.body
 * @param {number} room_num.body
 * @param {number} room_count.body
 * @param {number} max_count.body
 * @param {number} empty_count.body
 * @param {String} hotel_id.body
 * @param {number} new_price.body
 * @param {[String]} img_url.body
 * @param {String} desc.body
 * @param {String} room_info.body
 * @param {String} computer_info.body
 */
router.put('/update/:id', async (req, res) => {
  const { id } = req.params;
  const {
    title,
    room_num,
    room_count,
    max_count,
    empty_count,
    hotel_id,
    new_price,
    img_url,
    desc,
    room_info,
    computer_info,
  } = req.body;

  try {
    await roomService.update(id, {
      title,
      room_num,
      room_count,
      max_count,
      empty_count,
      hotel_id,
      new_price,
      img_url,
      desc,
      room_info,
      computer_info,
    });

    res.json({
      code: 0,
      message: 'SUCESS',
    });
  } catch (error) {
    res.json({
      code: 1,
      message: error,
    });
  }
});

/**
 * 删除房间
 * @route DELETE /rooms/delete/:id
 * @param {String} id.params
 */
router.delete('/delete/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await roomService.remove(id);
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
