export function getRedirectPath({
    type,
    avatar
}) {
    console.log(type)
    // 根据用户注册信息 返回应该跳转的地址
    // user.type /boss /genius
    // user.avatar /bossinfo /geniusinfo
    let url = (type === 'boss') ? '/boss' : '/genius'
    if (!avatar) {
        url += 'info'
    }
    return url
}


export function getChatId(userid, targetid) {
    return [userid, targetid].sort().join('_')
}