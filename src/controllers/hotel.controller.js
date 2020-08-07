import { HotelService, RoomService } from '../service';
import express from 'express';
const router = express.Router();

const hotelService = new HotelService();

/**
 * 根据id获取酒店
 * @route GET /hotels/:id
 * @param {String} id.params
 */
router.get('/clientget', async (req, res) => {
  const { id } = req.query;
  const hotel = await hotelService.getHotelById(id);

  res.json({
    code: 0,
    data: hotel,
  });
});

/**
 * 查询该酒店全部房间信息
 * @route GET /hotel/:id/rooms
 * @param {String} id hotel id
 */
router.get('/getrooms', async (req, res) => {
  const roomService = new RoomService();
  const { id } = req.query;
  const rooms = await roomService.getAllRoom(id);
  if (rooms.length < 1) {
    return res.json({
      code: 1,
      message: '暂无房间信息',
    });
  }
  res.json({
    code: 0,
    data: rooms,
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
    latitude,
    longitude,
  } = req.body;

  try {
    await hotelService.create({
      title,
      address,
      phone,
      open_time,
      end_time,
      owners_id,
      desc,
      latitude,
      longitude,
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
 * @route PUT /hotels/update/:id
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
    latitude,
    longitude,
  } = req.body;

  try {
    await hotelService.update(id, {
      title,
      address,
      phone,
      open_time,
      end_time,
      owners_id,
      desc,
      latitude,
      longitude,
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
 * 删除店面
 * @route DELETE /hotel/delete/:id
 * @param {String} id.params
 */
router.delete('/delete/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await hotelService.removeById(id);
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
