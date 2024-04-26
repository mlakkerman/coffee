const uuid = require('uuid')
const path = require('path');
const { Events, EventInfo } = require('../models/models')
const ApiError = require('../error/ApiError');

class EventController {
    async create(req, res, next) {
        try {
            let { title, description, info, date, categoryId, addressId, sponsorId, speakerId } = req.body
            const { img } = req.files
            let fileName = uuid.v4() + ".jpg"
            img.mv(path.resolve(__dirname, '..', 'static', fileName))
            const event = await Events.create({ title, description, date, categoryId, addressId, sponsorId, speakerId, img: fileName });

            if (info) {
                info = JSON.parse(info)
                info.forEach(i =>
                    EventInfo.create({
                        title: i.title,
                        description: i.description,
                        eventId: event.id
                    })
                )
            }
            return res.json(event)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }

    }

    async getAll(req, res) {
        let { categoryId, addressId, sponsorId, speakerId, limit, page } = req.query
        page = page || 1
        limit = limit || 9
        let offset = page * limit - limit
        let whereClause = {};
        if (categoryId) whereClause.categoryId = categoryId;
        if (addressId) whereClause.addressId = addressId;
        if (sponsorId) whereClause.sponsorId = sponsorId;
        if (speakerId) whereClause.speakerId = speakerId;
    
        let events = await Events.findAndCountAll({
            where: whereClause,
            limit: limit,
            offset: offset
        })
        return res.json(events)
    }
    

    async getOne(req, res) {
        const { id } = req.params
        const event = await Events.findOne(
            {
                where: { id },
                include: [{ model: EventInfo, as: 'info' }]
            },
        )
        return res.json(event)
    }
}

module.exports = new EventController()
