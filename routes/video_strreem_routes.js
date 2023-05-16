const router = require('express').Router();
const {getVideoStreemToken} = require('../controller/video_call_streem_token_controller');

router.get('/video-token',getVideoStreemToken);

module.exports = router;