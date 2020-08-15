import { HotelService, RoomService } from '../service';
import express from 'express';
const router = express.Router();

const hotelService = new HotelService();

/**
 * 获取轮播图
 * @route GET /hotels/swiper
 * @param {String} id.query
 */
router.get('/swiper', async (req, res) => {
  const { id } = req.query;

  if (!id) {
    return res.json({
      code: 2,
      message: '请传入必要的参数',
    });
  }
  try {
    const swiper = await hotelService.getSwiperList(id);

    res.json({
      code: 0,
      data: swiper,
    });
  } catch (error) {
    res.json({
      code: 1,
      message: error,
    });
  }
});

/**
 * 根据id获取酒店
 * @route GET /hotels/clientget
 * @param {String} id.query
 */
router.get('/clientget', async (req, res) => {
  const { id } = req.query;

  if (!id) {
    return res.json({
      code: 2,
      message: '请传入必要的参数',
    });
  }

  const hotel = await hotelService.getHotelById(id);

  res.json({
    code: 0,
    data: hotel,
  });
});

/**
 * 查询该酒店全部房间信息
 * @route GET /hotels/getrooms
 * @param {String} id hotel id
 */
router.get('/getrooms', async (req, res) => {
  const roomService = new RoomService();
  const { id } = req.query;

  if (!id) {
    return res.json({
      code: 2,
      message: '请传入必要的参数',
    });
  }

  let rooms;
  try {
    rooms = await roomService.getAllRoom(id);
    return res.json({
      code: 0,
      data: rooms,
    });
  } catch (error) {
    res.json({
      code: 1,
      message: error,
    });
  }
});

/**
 * 创建酒店
 * @route POST /hotels/create
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
 * 上传轮播图
 * @route POST /hotels/upload/swiper?id=
 * @param {File} file - form-data
 */
router.post('/upload/swiper', (req, res) => {
  const { id } = req.query;
  let isFileLimit = false;

  req.busboy.on('file', function (
    fieldname,
    file,
    filename,
    encoding,
    minetype
  ) {
    file.on('limit', function () {
      isFileLimit = true;

      res.json({
        code: 3,
        message: '文件超出大小限制，最大为10M',
      });
    });

    hotelService.upload(filename, file, async (result) => {
      if (isFileLimit) {
        return;
      }

      await hotelService.addSwiper(id, result['url']);

      res.json({
        code: 0,
        url: result['url'],
      });
    });
  });

  req.pipe(req.busboy);
});

router.put('/swiper/update', async (req, res) => {
  const { id, swiperUrlList } = req.body;

  if (!id || !swiperUrlList) {
    return res.json({
      code: 2,
      message: '请传入必要的参数',
    });
  }

  try {
    await hotelService.updateSwiper(id, swiperUrlList);
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
