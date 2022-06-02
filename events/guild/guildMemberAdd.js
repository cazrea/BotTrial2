const profileModel = require('../../models/profileSchema');

module.exports = async(client, discord, member) => {
    let profile = await profileModel.create({
        userID: member.id,
        serverID: member.guild.id,
        MBC: 500,
        BrainCells: 0,
        bank: 0,
        MBBank: 0,
        food: 0,
    });
    profile.save();
}