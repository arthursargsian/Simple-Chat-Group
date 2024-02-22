const express = require('express');
const router = express.Router();
const passport = require('passport');

const {Room} = require('../models/Room');

const {createErrorObject, checkCreateRoomFields} = require('../middleware/authenticate');

/**
 * @description GET /api/room
 */

router.get('/', passport.authenticate('jwt', {session: false}), async (req, res) => {
    const rooms = await Room.find({})
        .populate('user', ['handle'])
        .populate('users.lookup', ['handle'])
        .select('-password')
        .exec();

    if (rooms) {
        return res.status(200).json(rooms);
    } else {
        return res.status(404).json({error: 'No Rooms Found'});
    }
});

router.get('/status', passport.authenticate('jwt', {session: false}), async (req, res) => {
    const rooms = await Room.find({})
        .populate('user', ['handle'])
        .populate('users.lookup', ['handle'])
        .select('-password')
        .exec();

    if (rooms) {
        console.log(rooms)
        const access = rooms.access; // Assuming the user's access status is stored in req.user.access
        const publicRooms = rooms.filter(room => room.access === true);
        const privateRooms = rooms.filter(room => room.access === false);

        const response = {
            publicRoomsCount: publicRooms.length,
            privateRoomsCount: privateRooms.length,
            totalRooms: rooms.length
        };

        return res.status(200).json(response);
    } else {
        return res.status(404).json({error: 'No Rooms Found'});
    }
});


/**
 * @description GET /api/room/:room_id
 */
router.get('/room/:room_id', passport.authenticate('jwt', {session: false}), async (req, res) => {
    try {
        const room = await Room.findById(req.params.room_id)
            .populate('user', ['username', 'social', 'image', 'handle'])
            .populate('users.lookup', ['username', 'social', 'image', 'handle'])
            .exec();

        if (room) {
            return res.status(200).json(room);
        } else {
            return res.status(404).json({error: `No room with ID ${req.params.room_id} found`});
        }
    } catch (error) {
        return res.status(500).json({error: 'An error occurred while retrieving the room'});
    }
});

router.post('/search', passport.authenticate('jwt', {session: false}), async (req, res) => {
    const {room_name} = req.body;
    const room = await Room.findOne({name: room_name})
        .populate('user', ['username', 'social', 'image', 'handle'])
        .populate('users.lookup', ['username', 'social', 'image', 'handle'])
        .exec();

    if (room) {
        const result = [room];
        return res.status(200).json(result);
    } else {
        const result = []; // or result = null;
        return res.status(404).json({error: `No room with name ${room_name} found`});
    }
});

/**
 * @description POST /api/room
 */

router.post(
    '/',
    [passport.authenticate('jwt', {session: false}), checkCreateRoomFields],
    async (req, res) => {
        let errors = [];

        if (req.body.room_name.length > 18) {
            errors.push({param: 'room_name', msg: 'Room name should not exceed 18 characters'});
            return res.status(400).json({errors: createErrorObject(errors)});
        }

        const room = await Room.findOne({name: req.body.room_name}).exec();
        if (room) {
            if (room.name === req.body.room_name) {
                errors.push({param: 'room_taken', msg: 'Roomname already taken'});
            }
            return res.status(400).json({errors: createErrorObject(errors)});
        } else {
            const newRoom = new Room({
                name: req.body.room_name,
                user: req.user.id,
                access: req.body.password ? false : true,
                password: req.body.password,
            });

            newRoom.accessIds.push(req.user.id);
            newRoom
                .save()
                .then((room) => {
                    Room.populate(room, {path: 'user', select: 'username'}, (err, room) => {
                        if (err) {
                            console.log(err);
                        }
                        return res.status(200).json(room);
                    });
                })
                .catch((err) => {
                    return res.status(400).json(err);
                });
        }
    }
);

/**
 * @description POST /api/room/verify
 */
router.post('/verify', passport.authenticate('jwt', {session: false}), async (req, res) => {
    const room = await Room.findOne({name: req.body.room_name}).exec();
    if (room) {
        if (room.access) {
            // Room is public, no password required
            if (!room.accessIds.includes(req.user.id)) {
                room.accessIds.push(req.user.id);
                await room.save();
            }
            return res.status(200).json({success: true});
        } else {
            // Room is private, password verification required
            if (!req.body.password) {
                return res.status(400).json({
                    errors: createErrorObject([
                        {
                            param: 'password_required',
                            msg: 'Password is required',
                        },
                    ]),
                });
            }

            const verified = await room.isValidPassword(req.body.password);
            if (verified === true) {
                room.accessIds.push(req.user.id);
                await room.save();
                return res.status(200).json({success: true});
            } else {
                return res.json({
                    errors: createErrorObject([
                        {
                            param: 'invalid_password',
                            msg: 'Invalid Password',
                        },
                    ]),
                });
            }
        }
    } else {
        return res.status(404).json({errors: `No room with name ${req.body.room_name} found`});
    }
});

/**
 * @description DELETE /api/room/:room_name
 */
router.delete('/:room_name', passport.authenticate('jwt', {session: false}), async (req, res) => {
    try {
        const room = await Room.findOneAndDelete({name: req.params.room_name})
            .populate('user', ['username'])
            .select('-password')
            .lean();

        if (room) {
            return res.status(200).json(room);
        } else {
            return res.status(404).json({
                errors: `No room with name ${req.params.room_name} found, You will now be redirected`,
            });
        }
    } catch (err) {
        return res.status(404).json(err);
    }
});

/**
 * @description PUT /api/room/update/name
 */
router.post('/verify', passport.authenticate('jwt', {session: false}), async (req, res) => {
    const room = await Room.findOne({name: req.body.room_name}).exec();
    if (room) {
        if (room.access) {
            // Room is public, no password required
            if (!room.accessIds.includes(req.user.id)) {
                room.accessIds.push(req.user.id);
                await room.save();
            }
            return res.status(200).json({success: true});
        } else {
            // Room is private, password verification required
            if (!req.body.password) {
                return res.status(400).json({
                    errors: createErrorObject([
                        {
                            param: 'password_required',
                            msg: 'Password is required',
                        },
                    ]),
                });
            }

            // Allow access if user ID is already in accessIds
            if (room.accessIds.includes(req.user.id)) {
                return res.status(200).json({success: true});
            }

            const verified = await room.isValidPassword(req.body.password);
            if (verified === true) {
                room.accessIds.push(req.user.id);
                await room.save();
                return res.status(200).json({success: true});
            } else {
                return res.json({
                    errors: createErrorObject([
                        {
                            param: 'invalid_password',
                            msg: 'Invalid Password',
                        },
                    ]),
                });
            }
        }
    } else {
        return res.status(404).json({errors: `No room with name ${req.body.room_name} found`});
    }
});


module.exports = router;


