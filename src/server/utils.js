module.exports = {
    getType
}

const mvExts = ['.mp4', '.m4a']
const audioExts = ['.mp3']

function getType(exts) {
    if (mvExts.includes(exts)) return 'mv'
    if (audioExts.includes(exts)) return 'audio'
    return 'unknown'
}