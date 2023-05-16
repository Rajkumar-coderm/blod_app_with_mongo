const agora = require('agora-access-token');

module.exports.getVideoStreemToken = async (req, res) => {
    try {
        const appID = process.env.appID; // replace with your Agora app ID
        const appCertificate = process.env.appCertificate; // replace with your Agora app certificate
        const channelName = process.env.channelName; // replace with the name of your video call channel
        const uid = 0; // replace with the user ID of the caller
        const expirationTimeInSeconds = 259200; // token expiration time in seconds
        const currentTimestamp = Math.floor(Date.now() / 1000);
        const privilegeExpiredTs = currentTimestamp + expirationTimeInSeconds;
        const token = agora.RtcTokenBuilder.buildTokenWithUid(appID, appCertificate, channelName, uid, agora.RtcRole.PUBLISHER, privilegeExpiredTs,);
        res.status(200).json({
            message: "Request Complated successfully",
            videoStreemToken: token,
            errr_code: 200,
            status: "success",
            expaireAt:privilegeExpiredTs,
        });
    } catch (error) {
        res.status(403).json({
            message: error.message,
            data: [],
            errr_code: 403,
            status: "Request not completed successfuly",
        });
    }
} 